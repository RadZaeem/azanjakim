from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views import generic

from django.template import loader
from django.shortcuts import *
from .models import *
#from ipware.ip import get_ip

#from django.contrib.gis.geos import Point
from django.shortcuts import render_to_response
from django.template import RequestContext

from django.contrib.humanize.templatetags.humanize import intcomma




'''
class IndexView(generic.TemplateView):
    template_name = 'azanlocator/index.html'
    context_object_name = 'new_parse'

    def get(self,request, *args, **kwargs):
        self.new_parse = ParsedTimes()
        self.new_parse.save()
        ip = get_ip(request)
        if ip is "127.0.0.1" or ip is None: ip = ""
        self.new_parse.update_times_by_db(ip)
        #print self.new_parse.zone.ip_address
        return render(request, self.template_name)

    def get_queryset(self):
        return self.new_parse
'''
def index(request):
    template_name = 'azanlocator/index.html'

    if request.GET.get('lat') and request.GET.get('lon'):
        new_parse = ParsedTimes()
        new_parse.save()
        #origin = Point(float(request.GET.get('lon')), float(request.GET.get('lat')))
        lat = float(request.GET.get('lat'))
        lng = float(request.GET.get('lon'))
        print (lat,lng)
        new_parse.update_times_by_db(lat,lng)
        #new_parse.update_times_by_xml(lat,lng) #deprecated
        return render(request, template_name, {'new_parse':new_parse})
    else:
        return render(request, template_name)
