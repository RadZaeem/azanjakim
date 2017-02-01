from django.db import models
import datetime
import time
import requests
import json
from django.utils import timezone

import os

#from datetime import time
from geoindex import GeoGridIndex, GeoPoint
#from geopy.distance import vincenty #Python3 has bug cannot sort dict with this
from vincenty import vincenty

import lxml.html as LH
import requests
import xml.etree.ElementTree as ET
from django.conf import settings


import sqlite3

#import LatLon

#pip install requests json django geoindex geopy lxml LatLon


def text(elt):
    return elt.text_content().replace(u'\xa0', u' ')

STATES =  ['JOHOR' ,'KEDAH', 'KELANTAN',
'KUALA_LUMPUR', 'LABUAN', 'MELAKA', 'NEGERI_SEMBILAN', 'PAHANG',
'PERAK', 'PERLIS', 'PULAU_PINANG', 'PUTRAJAYA', 'SABAH','SARAWAK',
'SELANGOR', 'TERENGGANU']

class EsolatZone(models.Model):
    state_name  = models.CharField(max_length=30, default="KUALA LUMPUR")
    zone_name   = models.CharField(max_length=30, default="Kuala Lumpur")
    code_name = models.CharField(max_length=20, default="SGR03")
    lat = models.FloatField(default=0.0)
    lng = models.FloatField(default=0.0)

    def __str__(self):
        return self.zone_name

class ParsedZone(models.Model):
    ip_address = models.CharField(max_length=20, default="202.75.5.204")
    #ip_parse_str = models.CharField(max_length=400, default=json.dumps(SAMPLE_RESPONSE))
    #ip_parse_dict = {}
    lat = models.FloatField(default=0.0)
    lng = models.FloatField(default=0.0)

    #raw_solat_parse =  models.CharField(max_length=400, default="nothing")

    esolat_zone = models.ForeignKey(EsolatZone,default=1)


    FREEGEOPIP_URL = 'http://freegeoip.net/json/'

    def get_client_ip(self,request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        self.ip_address = ip
        print(self.ip_address)
        self.save()

    def update_latest(self,lat=0.0,lng=0.0):
        self.lat = lat
        self.lng = lng
        if (self.lat==0.0 and self.lng==0.0):
            print("zero lat lng given, defaulting to KL")
            self.esolat_zone = EsolatZone.objects.filter(code_name="SGR03")[0]
            return
        try:
            self.get_closest_zone() #update here

        except Exception as e:
            print(str(e))

    
    def get_closest_zone(self):
        zones_in_state = EsolatZone.objects.all()#.filter(state_name=self.state_name)
        #print ("\nZones:", zones_in_state)
        zone_points = {}
        for z in  zones_in_state:
            zone_points[z] = (z.lat, z.lng)
        #print ("\nZones -- Points:", zone_points)

        now_point = (self.lat, self.lng)
        zone_dists = {}
        for z in zone_points:
            zone_dists[z] = vincenty(now_point, zone_points[z])

       # print ("\nZones Distance -- Vincenty:", zone_dists)

        nearest_point = min(zone_dists, key=zone_dists.get)
        print ("Nearest is ", nearest_point)
        self.esolat_zone = nearest_point

    def get_geolocation_for_ip(self,ip):
        #DEPRECATED - now we use HTML5 geolocation
        url = '{}/{}'.format(self.FREEGEOPIP_URL, ip)
        response = requests.get(url)
        response.raise_for_status()
        return response.json()

    def __str__(self):
        return self.esolat_zone.zone_name

def init_zone_code():
    return ParsedZone.objects.get_or_create(id=1)[0].id

class ParsedTimes(models.Model):
    zone = models.ForeignKey(ParsedZone)#, default=init_zone_code)#, on_delete=models.CASCADE)
    subuh   = models.TimeField(default=datetime.time(6, 0))
    syuruk   = models.TimeField(default=datetime.time(6, 0))
    zuhur   = models.TimeField(default=datetime.time(6, 0))
    asar    = models.TimeField(default=datetime.time(6, 0))
    maghrib = models.TimeField(default=datetime.time(6, 0))
    isha    = models.TimeField(default=datetime.time(6, 0))

    date_time_parsed = models.DateTimeField(default=timezone.now)

    con = None
    cur = None

    db_path = os.path.join(settings.BASE_DIR,'azanlocator','esolat.db')

    def update_ip_address(self,request):
        self.zone.get_client_ip(request)
    def update_times_by_db(self,lat=0.0,lng=0.0): #ip=""):
        # DEPRECATED, use orm now
        self.zone.update_latest(lat,lng)

        self.con = sqlite3.connect(self.db_path, detect_types=sqlite3.PARSE_DECLTYPES)
        self.cur = self.con.cursor()
        date_str = str(self.date_time_parsed.date())
        time_str =  "select {} from {} where Tarikh = '{}'"
        code_str = self.zone.esolat_zone.code_name

        print (date_str, time_str, code_str)

        self.subuh = self.cur.execute(time_str.format("Subuh", code_str, date_str)).fetchall()[0][0].time()
        self.syuruk = self.cur.execute(time_str.format("Syuruk", code_str, date_str)).fetchall()[0][0].time()
        self.zuhur = self.cur.execute(time_str.format("Zohor", code_str,date_str)).fetchall()[0][0].time()
        self.zuhur = self.zuhur.replace(hour=self.zuhur.hour) #+12

        self.asar = self.cur.execute(time_str.format("Asar", code_str, date_str)).fetchall()[0][0].time()
        self.asar = self.asar.replace(hour=self.asar.hour)

        self.maghrib = self.cur.execute(time_str.format("Maghrib", code_str, date_str)).fetchall()[0][0].time()
        self.maghrib = self.maghrib.replace(hour=self.maghrib.hour)

        self.isha = self.cur.execute(time_str.format("Isyak", code_str, date_str)).fetchall()[0][0].time()
        self.isha = self.isha.replace(hour=self.isha.hour)

    def update_times_by_orm(self,lat=0.0,lng=0.0):
        self.zone = ParsedZone.objects.create()
        self.zone.update_latest(lat,lng)
        self.zone.save()
        code_str = self.zone.esolat_zone.code_name
        date_obj = self.date_time_parsed.date()

        zone_times=ZoneTimes.objects.filter(zone_code=code_str)
        today_times=DailyTimes.objects.filter(zone_times=zone_times,today=date_obj)[0]

        self.subuh    = today_times.subuh
        self.syuruk   = today_times.syuruk 
        self.zuhur    = today_times.zuhur  
        self.asar     = today_times.asar   
        self.maghrib  = today_times.maghrib
        self.isha     = today_times.isha   

    def update_times_by_xml(self,lat,lng):
        # DEPRECATED, may be used for unit test
        self.zone.update_latest2(lat,lng)
        kod=self.zone.esolat_zone.code_name
        url="http://www2.e-solat.gov.my/xml/today/?zon={}".format(kod)
        r = requests.get(url)
        root = ET.fromstring(r.content)

        items = {}
        for item in root.iter('item'):
            name = ""
            t = ""
            for child in item:
                if child.tag=="title":
                    name=child.text
                elif child.tag=="description":
                    #print("Time is ", child.text)
                    t=time.strptime(child.text,"%H:%M")
            items[name]=t

        self.subuh    = datetime.time(items["Subuh"].tm_hour,items["Subuh"].tm_min)
        self.syuruk   = datetime.time(items["Syuruk"].tm_hour,items["Syuruk"].tm_min)
        self.zuhur    = datetime.time(items["Zohor"].tm_hour,items["Zohor"].tm_min)
        self.asar     = datetime.time(items["Asar"].tm_hour,items["Asar"].tm_min)
        self.maghrib  = datetime.time(items["Maghrib"].tm_hour,items["Maghrib"].tm_min)
        self.isha     = datetime.time(items["Isyak"].tm_hour,items["Isyak"].tm_min)
    def __str__(self):
        return  self.date_time_parsed.strftime(" %d %B %Y (%A)") + " @ "+ self.zone.esolat_zone.zone_name
    
        '''
#test at shell
from azanlocator.models import *
pt = ParsedTimes()
pt.update_times()
        '''


        '''
        #old way by table parse

        root = LH.fromstring(r.content)
        for table in root.xpath('//table'):
            #header = [text(th) for th in table.xpath('//th')]        # 1
            data = [[text(td) for td in tr.xpath('td')]  for tr in table.xpath('//tr')]
            for r in data:
                for s in r:
                    new_s = ''.join(s.split())
                    data[data.index(r)][r.index(s)]=new_s

        self.subuh    = datetime.time(time.strptime(data[2][3],"%I:%M").tm_hour,
                                        time.strptime(data[2][3],"%I:%M").tm_min)
        self.syuruk   = datetime.time(time.strptime(data[2][4],"%I:%M").tm_hour,
                                        time.strptime(data[2][4],"%I:%M").tm_min)
        self.zuhur    = datetime.time(time.strptime(data[2][5],"%I:%M").tm_hour,
                                        time.strptime(data[2][5],"%I:%M").tm_min)
        self.asar     = datetime.time(time.strptime(data[2][6],"%I:%M").tm_hour,
                                        time.strptime(data[2][6],"%I:%M").tm_min)
        self.maghrib  = datetime.time(time.strptime(data[2][7],"%I:%M").tm_hour,
                                        time.strptime(data[2][7],"%I:%M").tm_min)
        self.isha     = datetime.time(time.strptime(data[2][8],"%I:%M").tm_hour,
                                        time.strptime(data[2][8],"%I:%M").tm_min)
        '''

        #("%A, %d. %B %Y %I:%M%p")

class MasterSchedule(models.Model):
    date_created=models.DateField(default=timezone.now)
    def __str__(self):
        return  self.date_created.strftime(" %d %B %Y (%A)")

class ZoneTimes(models.Model):
    zone_code = models.CharField(max_length=10)
    master_schedule = models.ForeignKey(MasterSchedule, default=1)
    #daily_times = models.ForeignKey(DailyTimes,default=1)
    def __str__(self):
        return  self.zone_code

class DailyTimes(models.Model):
    '''
    #to retrieve:
    skudai=ZoneTimes.objects.filter(zone_code="JHR02")
    waktu_skudai=DailyTimes.objects.filter(zone_times=skudai)
    hari_ini=waktu_skudai.filter(today=datetime.date(2017, 12, 1))
    #<QuerySet [<DailyTimes:  01 December 2017 (Friday)>]>
    '''
    zone_times = models.ForeignKey(ZoneTimes,default=1)
    today = models.DateField(default=timezone.now)
    subuh   = models.TimeField(default=datetime.time(6, 0))
    syuruk   = models.TimeField(default=datetime.time(6, 0))
    zuhur   = models.TimeField(default=datetime.time(6, 0))
    asar    = models.TimeField(default=datetime.time(6, 0))
    maghrib = models.TimeField(default=datetime.time(6, 0))
    isha    = models.TimeField(default=datetime.time(6, 0))

    def __str__(self):
        return  self.today.strftime(" %d %B %Y (%A)")
        #("%A, %d. %B %Y %I:%M%p")



'''
#test at shell
.

#test for given ip

from azanlocator.models import *
a=ParsedZone.objects.all()[0]
a.update_latest("103.56.124.65")
a.get_closest_zone()

from azanlocator.models import *
d=ParsedTimes()
d.save()
d.update_times_by_db()
d.maghrib

from azanlocator.models import *
d=ParsedTimes.objects.get_all()[0]
d.update_times_by_db()
d.maghrib

skudai=ZoneTimes.objects.filter(zone_code="JHR02")
    waktu_skudai=DailyTimes.objects.filter(zone_times=skudai)
    hari_ini=waktu_skudai.filter(today=datetime.date(2017, 12, 1))
    #<QuerySet [<DailyTimes:  01 December 2017 (Friday)>]>



'''
