
from azanlocator.models import *

from rest_framework import serializers


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
    class Meta:
        model=ParsedTimes
        fields = '__all__'
        # fields = ('zone','subuh')
    # zone = serializers.CharField()
    # # zone = models.ForeignKey(ParsedZone)#, default=init_zone_code)#, on_delete=models.CASCADE)
    # subuh   = serializers.TimeField()
    # syuruk  = serializers.TimeField()
    # zuhur   = serializers.TimeField()
    # asar    = serializers.TimeField()
    # maghrib = serializers.TimeField()
    # isha    = serializers.TimeField()
