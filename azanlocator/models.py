from django.db import models
import requests
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

class DailyTimes(models.Model):
    stateName  = models.CharField(max_length=20)
    zoneName   = models.CharField(max_length=20)

    subuh   = models.TimeField()
    zuhur   = models.TimeField()
    asar    = models.TimeField()
    maghrib = models.TimeField()
    isha    = models.TimeField()

    currentDate = models.DateField()

    FREEGEOPIP_URL = 'http://freegeoip.net/json/'

    def get_geolocation_for_ip(ip):
        url = '{}/{}'.format(FREEGEOPIP_URL, ip)
        response = requests.get(url)
        response.raise_for_status()
        return response.json()





