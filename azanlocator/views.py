from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views import generic

from django.template import loader
from django.shortcuts import *
from .models import *
#from ipware.ip import get_ip

from django.contrib.gis.geos import Point
from django.shortcuts import render_to_response
from django.template import RequestContext




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

    #ip = get_ip(request)
    #if ip == "127.0.0.1" or ip is None: ip = ""
    #print ip
    if request.GET.get('lat') and request.GET.get('lon'):
        new_parse = ParsedTimes()
        new_parse.save()
        #origin = Point(float(request.GET.get('lon')), float(request.GET.get('lat')))
        lat = float(request.GET.get('lat'))
        lng = float(request.GET.get('lon'))
        print (lat,lng)
        new_parse.update_times_by_db(lat,lng)
        return render(request, template_name, {'new_parse':new_parse})
        #camps = Campground.objects.all().distance(origin).order_by('distance')
    else:
        return render(request, template_name)
        #camps = Campground.objects.all().order_by('name')

    #return render(request, template_name, {'new_parse':new_parse})
        #print self.new_parse.zone.ip_address

def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)