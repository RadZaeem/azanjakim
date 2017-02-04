
from azanlocator.models import *

from rest_framework import serializers

from django.contrib.auth.models import User

class EsolatZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model=EsolatZone
        fields = '__all__'

class ParsedZoneSerializer(serializers.ModelSerializer):
   esolat_zone = EsolatZoneSerializer(read_only=True)
   class Meta:
        model=ParsedZone
        fields = '__all__'
        # fields = ('esolat_zone','lat')


class ParsedTimesSerializer(serializers.ModelSerializer):
    zone = ParsedZoneSerializer(read_only=True)
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model=ParsedTimes
        fields = '__all__'

class MasterScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model=MasterSchedule
        fields = '__all__'

class ZoneTimesSerializer(serializers.ModelSerializer):
    master_schedule = MasterScheduleSerializer(read_only=True)
    class Meta:
        model=ZoneTimes
        fields = '__all__'

class DailyTimesSerializer(serializers.ModelSerializer):
    zone_times = ZoneTimesSerializer(read_only=True)
    class Meta:
        model=DailyTimes
        fields = '__all__'



class UserSerializer(serializers.ModelSerializer):
    parsed_times = serializers.PrimaryKeyRelatedField(many=True, queryset=ParsedTimes.objects.all())

    class Meta:
        model = User
        fields =  ('id', 'username', 'parsed_times')
        

        # fields = ('zone','subuh')
    # zone = serializers.CharField()
    # # zone = models.ForeignKey(ParsedZone)#, default=init_zone_code)#, on_delete=models.CASCADE)
    # subuh   = serializers.TimeField()
    # syuruk  = serializers.TimeField()
    # zuhur   = serializers.TimeField()
    # asar    = serializers.TimeField()
    # maghrib = serializers.TimeField()
    # isha    = serializers.TimeField()
