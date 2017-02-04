from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views import generic

from django.template import loader
from django.shortcuts import *
from .models import *
from .serializers import *
#from ipware.ip import get_ip

#from django.contrib.gis.geos import Point
from django.shortcuts import render_to_response
from django.template import RequestContext

from django.contrib.humanize.templatetags.humanize import intcomma


# from rest_framework import status
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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

from django.contrib.auth.models import User
from .serializers import UserSerializer

from rest_framework import permissions

from rest_framework import generics

from .permissions import *

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class DailyTimesList(APIView):
    def get(self, request, format=None):
        # daily_times = DailyTimes.objects.get(pk=1)
        # serializer = DailyTimesSerializer(daily_times)#, many=True)
        daily_times = DailyTimes.objects.all()
        serializer = DailyTimesSerializer(daily_times, many=True)
        return Response(serializer.data)

class RequestParsedTimes(APIView):
    permission_classes = (IsOwnerOrAnon,)#Only,)#,IsOwnerOrReadOnly)
    # def get(self, request, format=None):
    #     pass
    #     # daily_times = DailyTimes.objects.get(pk=1)
    #     # serializer = DailyTimesSerializer(daily_times)#, many=True)
    #     old_parses = ParsedTimes.objects.all()
    #     serializer = ParsedTimesSerializer(old_parses, many=True)
    #     return Response(serializer.data)

    def post(self, request, format=None):
        new_parse = ParsedTimes()
        # if type(self.request.user)==
        # new_parse.owner=self.request.user
        print(type(self.request.user))
        if (type(self.request.user)==User):
            new_parse.owner=self.request.user
        else:
            new_parse.owner=User.objects.get(pk=1)
        new_parse.save()
        new_parse.update_ip_address(request)
        print(request.data) # Gotcha -- dont use QueryDict like POST and GET
        if 'lat' in request.data and 'lon' in request.data:
            
            lat = float(request.data['lat'])
            lng = float(request.data['lon'])
            new_parse.update_times_by_orm(lat,lng)
        else:
            new_parse.update_times_by_orm(0.0,0.0)
        
        serializer = ParsedTimesSerializer(new_parse)
        # if serializer.is_valid():
        #     serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)

def index(request):
    template_name = 'azanlocator/index.html'

    if request.GET.get('lat') and request.GET.get('lon'):

        new_parse = ParsedTimes()
        
        #origin = Point(float(request.GET.get('lon')), float(request.GET.get('lat')))
        lat = float(request.GET.get('lat'))
        lng = float(request.GET.get('lon'))
        
        print("GET is: " + repr(request.GET))
        print ("LatLong is:", lat,lng)
        new_parse.update_times_by_orm(lat,lng)
        new_parse.update_ip_address(request)
        #new_parse.zone.get_client_ip(request)
        #new_parse.update_times_by_db(lat,lng)
        new_parse.save()
        #new_parse.update_times_by_xml(lat,lng) #deprecated
        return render(request, template_name, {'new_parse':new_parse})
    else:
        return render(request, template_name)

'''
The plan:
1. user give POST must include params (lat,lng,account)
2. view parse the params -- create a parsedtimes and update it
3. serialize return parsedtimes

1. user give POST including zone code
2. access masterschedule query the zone
3. serialize and return parsedtimes (maybe need flag auto-detect or manual select)

1. use viewsets for masterschedule
1. use oauth2 and django-admin to access parsedtimes
'''