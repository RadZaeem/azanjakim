from lxml import html
import requests
from HTMLParser import HTMLParser

states=  ['JOHOR' ,'KEDAH', 'KELANTAN',
'KUALA LUMPUR', 'LABUAN', 'MELAKA', 'NEGERI_SEMBILAN', 'PAHANG',
'PERAK', 'PERLIS', 'PULAU_PINANG', 'PUTRAJAYA', 'SABAH','SARAWAK',
'SELANGOR', 'TERENGGANU']

'''

'''


# create a subclass and override the handler methods
class MyHTMLParser(HTMLParser):


    def __init__(self, *args, **kwargs):
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
            if
            if "," in data:
                self.zons = data.split(",")
            elif " dan " in data:
                self.zons = data.split(" dan ")
            else:
                self.zons = [data]




    def writeRow(self,negeri,zon,kod):
        row = ",".join([negeri, kod, zon])
        self.out += row + "\n"



states=  ['JOHOR' ,'KEDAH', 'KELANTAN',
'KUALA LUMPUR', 'LABUAN', 'MELAKA', 'NEGERI_SEMBILAN', 'PAHANG',
'PERAK', 'PERLIS', 'PULAU_PINANG', 'PUTRAJAYA', 'SABAH','SARAWAK',
'SELANGOR', 'TERENGGANU']


def returnStr():
    all = ""
    for s in states:
        url = "http://www.e-solat.gov.my/web/waktusolat.php?\
negeri={}&zone=00&state={}&submit=Cari".format(s,s)
        parser = MyHTMLParser()
        page = requests.get(url)
        parser.negeri = s
        parser.feed(page.text)
        all += parser.out

    return all

    #tree = html.fromstring(page.content)