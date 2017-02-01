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

codes=('JHR01', 'JHR02', 'JHR03', 'JHR04',
    'KDH01', 'KDH02', 'KDH03', 'KDH04', 'KDH05', 'KDH06', 'KDH07',
    'KTN01', 'KTN03', 'SGR03', 'WLY02', 'MLK01', 'NGS01', 'NGS02',
    'PHG01', 'PHG02', 'PHG03', 'PHG04', 'PHG05', 'PHG06',
    'PRK01', 'PRK02', 'PRK03', 'PRK04', 'PRK05', 'PRK06', 'PRK07',
    'PLS01',
    'PNG01',
    'SGR04',
    'SBH01', 'SBH02', 'SBH03', 'SBH04', 'SBH05', 'SBH06', 'SBH07', 'SBH08', 'SBH09',
    'SWK01', 'SWK02', 'SWK03', 'SWK04', 'SWK05', 'SWK06', 'SWK07', 'SWK08', 'SWK09',
    'SGR01', 'SGR02',
    'TRG01', 'TRG02', 'TRG03', 'TRG04')

db_path = os.path.join(settings.BASE_DIR,'azanlocator','esolat.db')
def generate_models(path="kodzon.csv"):
    con = sqlite3.connect(db_path, detect_types=sqlite3.PARSE_DECLTYPES)
    cur = None

    m = MasterSchedule()

    for c in codes:
        z = ZoneTimes()
        z.zone_code = c
        cur = con.cursor()
        query_str =  "select * from {}"
        year_table = cur.execute(query_str.format(c)).fetchall()

        for row in year_table:
            d=DailyTimes()
            #t=datetime.date(d.year,d.month,d.day)
            d.today=datetime.date(row[3].year,row[3].month,row[3].day)
            d.subuh=row[3]
            d.syuruk=row[4]
            d.zuhur=row[5]
            d.asar=row[6]
            d.maghrib=row[7]
            d.isha=row[8]
            d.save()
            z.daily_times.append(d)
        z.save()
        m.zones_times.append(z)
    m.save()
#from azanlocator.masterschedule import *
#from azanlocator.gen_masterschedule import *
