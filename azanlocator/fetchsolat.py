
import lxml.html
from lxml.etree import XPath
import sqlite3
import sys
import re
import datetime
from dateutil import parser

import lxml.html as LH
import requests
from tabulate import tabulate
import logging
from dateutil import parser
import time
#import pandas as pd
'''
kod="SGR04"
url = 'http://www.e-solat.gov.my/web/muatturun.php?zone={}&state=&jenis=week&lang=my&year=2016&bulan='.format(kod)

date = '2014-09-27'

rows_xpath = XPath("//table[2]/tr/td//text()")
#time_xpath = XPath("td[1]/span/span//text()[2]")
#team_xpath = XPath("td[2]/a/text()")

html = lxml.html.parse(url)
count=0
for row in rows_xpath(html):
    print(str(count)+": "+row)
    count+=1

'''


# Extract Table



def text(elt):
    return elt.text_content().replace(u'\xa0', u' ')

class WaktuFetch(object):
    column_keys = {}
    year = 2016

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

    bulan_bm = {
    "Januari":1,
"Februari":2,
"Mac":3,
"April":4,
"Mei":5,
"Jun":6,
"Julai":7,
"Ogos":8,
"September":9,
"Oktober":10,
"November":11,
"Disember":12,
    }

    def __init__(self,kod=codes[0],bulan=2,logger_name=__name__):
        self.logger = logging.getLogger(logger_name)
        self.con = sqlite3.connect('esolat.db', detect_types=sqlite3.PARSE_DECLTYPES)
        self.cur = self.con.cursor()
        self.kod = kod
        self.bulan = bulan
        self.url = 'http://www.e-solat.gov.my/web/muatturun.php?zone={}&jenis=year&lang=my&year=2016&bulan={}'.format(kod,bulan)
        #self.table_arr = self.fetch_table(self.kod,self.bulan)
        self.current_table = None
        self.table_arr = []

    def __str__(self):
        return "WaktuFetch"

    def update_table_arr(self,kod=codes[0],bulan=2):
        self.table_arr = self.fetch_table(self.kod,self.bulan)

    def fetch_table(self,kod=codes[0],bulan=2):
        self.url = 'http://www.e-solat.gov.my/web/muatturun.php?zone={}&jenis=year&lang=my&year=2016&bulan={}'.format(kod,bulan)
        self.logger.info('fetching table zon ' + kod + 'for month' + repr(bulan))
        r = requests.get(self.url)
        root = LH.fromstring(r.content)
        for table in root.xpath('//table'):
            #header = [text(th) for th in table.xpath('//th')]        # 1
            data = [[text(td) for td in tr.xpath('td')]  for tr in table.xpath('//tr')]
            for r in data:
                for s in r:
                    new_s = ''.join(s.split())
                    data[data.index(r)][r.index(s)]=new_s
        self.logger.info('fetching success')
        return data

    def create_zone_db(self,kod=codes[0],bulan=2):
        self.logger.info('creating db for zon ' + kod + 'for month' + repr(bulan))
        self.kod = kod
        self.bulan = bulan
        self.table_arr = self.fetch_table(kod,bulan)
        with self.con:
            self.cur = self.con.cursor()
            fields = self.table_arr[1] #Tarikh Hari Imasak,etc. #  if not existsJHR01
            self.cur.execute("""create table if not exists {}
                (id integer primary key, Tarikh text, Hari text,
                Imsak timestamp, Subuh timestamp, Syuruk timestamp,
                 Zohor timestamp, Asar timestamp,
                 Maghrib timestamp, Isyak timestamp);""".format(kod))
            for row in self.table_arr[2:-4]:
                row_elems=[]
                hb=0
                b=0
                for val in row:
                    newval = val
                    if (row.index(val)==0): # tarikh
                        #s = re.search(r'.*?\D' ,d).group(1)
                        #b = re.search(r'\d\d(.*)',d).group(0)
                        hb = int(val[0:2])
                        b = self.bulan_bm[val[2:]]
                        newval=datetime.date(self.year, b, hb)
                    elif(row.index(val)>=2): #times
                        y = repr(self.year)[2:] #str('2016')[2:]
                        val = val.replace('.',':')
                        val = val.replace(';',':')
                        date_str = "{}/{}/{} ".format(hb,b,y)+val
                        #newval = parser.parse(date_str)
                        newval=datetime.datetime.strptime(date_str,"%d/%m/%y %H:%M")
                        #newval = newval.time()
                    row_elems.append(newval)
                self.cur.execute("""
                    insert into {0}( Tarikh, Hari, Imsak, Subuh, Syuruk, Zohor, Asar, Maghrib , Isyak)
                    values
                    ('{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}');
                    """.format(kod, *row_elems))

    def create_zone_db_yearly(self,kod=codes[0]):
        self.logger.info('creating db zone yearly for zone '+ kod)
        for b in range (1,13): #offset 12+1
            self.create_zone_db(kod,b)

    def create_all_zones_db_yearly(self):
        self.logger.info('creating db all zones yearly...')
        for kod in self.codes:
            self.create_zone_db_yearly(kod)

    def clear_zone_db(self,kod):
        self.logger.warn('clearing db '+ kod)
        with self.con:
            self.cur = self.con.cursor()
            self.cur.execute("drop table {}".format(kod))

    def print_table_arr(self):
        print tabulate(self.table_arr[1:-4])
                # 2
    #datdata2 = [row for row in data]# if len(row)==len(header)]    # 3
    #data = pd.DataFrame(data, columns=header)                # 4

#print('\n'.join([''.join(['{}\t'.format(item) for item in row]) for row in data]))

start_time = time.time()
w = WaktuFetch(logger_name="WaktuFetch")
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO,
                    #filename='esolat_fetch.log', # log to this file
                    format='%(asctime)s %(message)s') # include timestamp
    #w.create_zone_db_yearly('PHG03')
    w.create_all_zones_db_yearly()
    #w.logger.info("--- %s seconds ---" % (time.time() - start_time))

#w.update_table_arr(kod=w.codes[0],bulan=2)

'''w
for row in data:
    for val in row:
        print '|{:3}\t|'.format(val),
    print
'''

'''
for table in root.xpath('//table'):
    #header = [text(th) for th in table.xpath('//th')]        # 1
    data = [[text(td) for td in tr.xpath('td')]  for tr in table.xpath('//tr')]

    for r in data:
        for s in r:
            new_s = ''.join(s.split())
            data[data.index(r)][r.index(s)]=new_s
'''


