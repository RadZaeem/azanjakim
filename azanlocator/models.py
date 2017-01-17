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

SAMPLE_RESPONSE = {
    "ip":"108.46.131.77",
    "country_code":"US",
    "country_name":"United States",
    "region_code":"NY",
    "region_name":"New York",
    "city":"Brooklyn",
    "zip_code":"11249",
    "time_zone":"America/New_York",
    "latitude":40.645,
    "longitude":-73.945,
    "metro_code":501
}

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
    state_name  = models.CharField(max_length=30, default="KUALA LUMPUR")
    zone_name   = models.CharField(max_length=30, default="Kuala Lumpur")

    ip_address = models.CharField(max_length=20, default="202.75.5.204")
    ip_parse_str = models.CharField(max_length=400, default=json.dumps(SAMPLE_RESPONSE))
    ip_parse_dict = {}
    lat = models.FloatField(default=0.0)
    lng = models.FloatField(default=0.0)

    raw_solat_parse =  models.CharField(max_length=400, default="nothing")

    esolat_zone = models.ForeignKey(EsolatZone,default=1)


    FREEGEOPIP_URL = 'http://freegeoip.net/json/'


    def update_latest2(self,lat=0.0,lng=0.0):
        self.lat = lat
        self.lng = lng
        try:
            self.get_closest_zone() #update here

        except Exception as e:
            print(str(e))

    def get_geolocation_for_ip(self,ip):
        url = '{}/{}'.format(self.FREEGEOPIP_URL, ip)
        response = requests.get(url)
        response.raise_for_status()
        return response.json()

    def get_geolocation_html5(self,lat=0.0,lng=0.0):
        pass

    def get_closest_zone(self):
        #if self.state_name not in STATES:
        #    print "State unknown from IP, default to Kuala Lumpur"
        #    self.esolat_zone = EsolatZone.objects.filter(state_name="KUALA_LUMPUR")[0]
        #    return

        zones_in_state = EsolatZone.objects.all()#.filter(state_name=self.state_name)
        print ("\nZones:", zones_in_state)
        zone_points = {}
        for z in  zones_in_state:
            zone_points[z] = (z.lat, z.lng)
        #print ("\nZones -- Points:", zone_points)

        now_point = (self.lat, self.lng)
        zone_dists = {}
        for z in zone_points:
            zone_dists[z] = vincenty(now_point, zone_points[z])

       # print ("\nZones -- Vincenty:", zone_dists)

        nearest_point = min(zone_dists, key=zone_dists.get)
        print ("Nearest is ", nearest_point)
        #print nearest_point
        self.esolat_zone = nearest_point



    def __str__(self):
        return self.zone_name +", " + self.state_name

def init_zone_code():
    return ParsedZone.objects.get_or_create(id=1)[0]

class ParsedTimes(models.Model):
    zone = models.ForeignKey(ParsedZone, default=init_zone_code)#, on_delete=models.CASCADE)
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
    def update_times_by_db(self,lat=0.0,lng=0.0): #ip=""):
        #self.zone.update_latest(ip)
        self.zone.update_latest2(lat,lng)

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




    def update_times_by_xml(self,lat,lng):
        #DEPRECATED
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

    def __str__(self):
        return  self.date_time_parsed.strftime(" %d %B %Y (%A)") + " @ "+ self.zone.zone_name
        #("%A, %d. %B %Y %I:%M%p")

class DailyTimes(models.Model):
    today = models.DateField(default=timezone.now)
    subuh   = models.TimeField(default=datetime.time(6, 0))
    syuruk   = models.TimeField(default=datetime.time(6, 0))
    zuhur   = models.TimeField(default=datetime.time(6, 0))
    asar    = models.TimeField(default=datetime.time(6, 0))
    maghrib = models.TimeField(default=datetime.time(6, 0))
    isha    = models.TimeField(default=datetime.time(6, 0))

    def __str__(self):
        return  self.currentDate.strftime(" %d %B %Y (%A)") + " @ "+ self.zone.zone_name
        #("%A, %d. %B %Y %I:%M%p")

class ZoneTimes(models.Model):
    daily_times = models.ForeignKey(DailyTimes, default=1)
    esolat_zone = models.ForeignKey(EsolatZone, default=1)

class MasterSchedules(models.Model):
    zones_times = models.ForeignKey(ZoneTimes, default=1)



"""
from django.db import models
from django.db.models.signals import post_init

class MyModel(models.Model):
  # normal model definition...

def extraInitForMyModel(**kwargs):
   instance = kwargs.get('instance')
   do_whatever_you_need_with(instance)

post_init.connect(extraInitForMyModel, MyModel)
"""

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




'''