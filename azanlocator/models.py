from django.db import models
import datetime
import requests
import json
from django.utils import timezone
from datetime import time
from geoindex import GeoGridIndex, GeoPoint

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

class Question(models.Model):
    question_text = models.CharField(max_length=400)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

class EsolatZone(models.Model):
    state_name  = models.CharField(max_length=30, default="KUALA LUMPUR")
    zone_name   = models.CharField(max_length=30, default="Kuala Lumpur")
    code_name = models.CharField(max_length=20, default="SGR03")
    lat = models.FloatField(default=0.0)
    lng = models.FloatField(default=0.0)
    def get_closest_zone(self):
        pass

    def __str__(self):
        return self.zone_name

class ParsedZone(models.Model):
    state_name  = models.CharField(max_length=30, default="KUALA LUMPUR")
    zone_name   = models.CharField(max_length=30, default="Kuala Lumpur")
    code_name = models.CharField(max_length=20, default="SGR03")

    ip_address = models.CharField(max_length=20, default="202.75.5.204")
    ip_parse_str = models.CharField(max_length=400, default=json.dumps(SAMPLE_RESPONSE))
    ip_parse_dict = {}
    lat = models.FloatField(default=0.0)
    lng = models.FloatField(default=0.0)

    raw_solat_parse =  models.CharField(max_length=400, default="nothing")

    FREEGEOPIP_URL = 'http://freegeoip.net/json/'

    def update_latest(self):
        self.ip_parse_dict = self.get_geolocation_for_ip("")
        self.ip_parse_str=json.dumps(self.ip_parse_dict)
        self.ip_address = self.ip_parse_dict["ip"]
        self.lat = self.ip_parse_dict["latitude"]
        self.lng = self.ip_parse_dict["longitude"]

    def get_geolocation_for_ip(self,ip):
        url = '{}/{}'.format(self.FREEGEOPIP_URL, ip)
        response = requests.get(url)
        response.raise_for_status()
        return response.json()

    def get_closest_zone(self):
        pass

    def __str__(self):
        return self.zone_name

def init_zonecode():
    return ParsedZone.objects.get_or_create(id=1)

class DailyTimes(models.Model):

    zone = models.ForeignKey(ParsedZone, default=init_zonecode)#, on_delete=models.CASCADE)
    subuh   = models.TimeField(default=datetime.time(6, 0))
    zuhur   = models.TimeField(default=datetime.time(6, 0))
    asar    = models.TimeField(default=datetime.time(6, 0))
    maghrib = models.TimeField(default=datetime.time(6, 0))
    isha    = models.TimeField(default=datetime.time(6, 0))

    currentDate = models.DateField(default=timezone.now)

    def update_times(self):
        pass

    def __str__(self):
        return  self.currentDate.strftime(" %d %B %Y (%A)") + " @ "+ self.zone.zone_name
        #("%A, %d. %B %Y %I:%M%p")




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
