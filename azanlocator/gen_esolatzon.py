from lxml import html
import requests
#from HTMLParser import HTMLParser # Python 2.7

from html.parser import HTMLParser
import re
import json

import django
from django.apps import apps
from django.conf import settings

import csv

from django.apps import AppConfig

#settings.configure()#default_settings=azanlocator_defaults, DEBUG=True)
#django.setup()

from azanlocator.models import *

'''
# CARA NAK GUNA SCRIPT NI
$ python mange.py shell
from azanlocator.gen_esolatzon import *
#kalau takde lagi kodzon.csv
return_csv()
#kalau dah ada kodzon.csv
from azanlocator.models import *
generate_models()

SEKIANgen

'''

states=  ['JOHOR' ,'KEDAH', 'KELANTAN',
'KUALA LUMPUR', 'LABUAN', 'MELAKA', 'NEGERI_SEMBILAN', 'PAHANG',
'PERAK', 'PERLIS', 'PULAU_PINANG', 'PUTRAJAYA', 'SABAH','SARAWAK',
'SELANGOR', 'TERENGGANU']

'''

'''


# create a subclass and override the handler methods
class MyHTMLParser(HTMLParser):


    def __init__(self, *args, **kwargs):
        self.idcount=1
        self.out = ""
        self.startSelect = False
        self.startOption = False
        self.currenTag = None
        self.currentAttrs = None
        self.negeri = ""
        self.kod = ""
        self.zons = []
        HTMLParser.__init__(self, *args, **kwargs)

    def handle_starttag(self, tag, attrs):
        #print "Encountered a start tag:", tag,
        #print "\nWith attrs:", attrs
        self.currentTag = tag
        self.currentAttrs = attrs
        if (tag == "select") and (attrs[0][1]=='zone'):
            self.startSelect = True
        if (tag == "option") and  (self.startSelect==True):
            self.startOption = True
            #print attrs[0][1]
            self.kod = attrs[0][1]
    def handle_endtag(self, tag):
        #print "Encountered an end tag :", tag
        if tag == "select":
            self.startSelect = False

        if tag == "option":
            self.startOption = False
            for z in self.zons:
                self.writeRow(self.negeri,z,self.kod)


    def handle_data(self, data):

        if (self.startSelect and self.startOption):
            if (data=="Pilih Zon"): return

            if "," in data or 'dan' in data:
                self.zons = re.split(',|, |dan ',data)

            else:
                self.zons = [data]

            for z in self.zons:
                i = self.zons.index(z)
                if "Zon" in z:
                    self.zons[i] = self.zons[i][7:]
                if " " in self.zons[i][:3]:
                    self.zons[i] = self.zons[i].strip()




    def writeRow(self,negeri,zon,kod):
        gmaps = "https://maps.googleapis.com/maps/api/geocode/json?address={}".format(zon+"+"+negeri)
        jsonDict = json.loads(requests.get(gmaps).content.decode('utf-8'))
        print ("\n\n\n")
        print (jsonDict)
        while jsonDict['status'] == 'OVER_QUERY_LIMIT':
            print ("Over limit")
            jsonDict = json.loads(requests.get(gmaps).content.decode('utf-8'))

        if jsonDict['status'] ==  'ZERO_RESULTS':
            lat = 0.0
            lng = 0.0
        else:
            lat = jsonDict['results'][0]['geometry']['location']['lat']
            lng = jsonDict['results'][0]['geometry']['location']['lng']


        row = ",".join([str(self.idcount),negeri, kod, zon, str(lat), str(lng)])
        #row += "{},{}".format(str(lat), str(lng))
        self.out += row + "\n"
        self.idcount+=1




def return_str():
    all = "id,State,Code,Zone,Latitude,Longitude\n"
    contid = 1
    for s in states:
        url = "http://www.e-solat.gov.my/web/waktusolat.php?\
negeri={}&zone=00&state={}&submit=Cari".format(s,s)
        parser = MyHTMLParser()
        page = requests.get(url)
        parser.negeri = s
        parser.idcount=contid
        parser.feed(page.text)
        all += parser.out
        contid=parser.idcount

    return all

def return_csv():
    all = return_str()
    f=open("kodzon.csv", 'w+')
    f.write(all)
    f.close()

def generate_models(path="kodzon.csv"):
    with open(path) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            #AppConfig.get_model
            print(row)
            zone = EsolatZone(
            state_name = row['State'],
            code_name = row['Code'],
            zone_name = row['Zone'],
            lat = row['Latitude'],
            lng  = row['Longitude'],
            )
            zone.save()


#if __name__ == "__main__":
#    generate_models()

'''

#copy paste di manage.py shell
from azanlocator.gen_esolatzon import *


generate_models()

return_csv()

'''