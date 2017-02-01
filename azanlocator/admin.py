

from .models import *
from django.contrib import admin

# Register your models here.
admin.site.register(DailyTimes)
admin.site.register(ZoneTimes)
admin.site.register(ParsedTimes)
admin.site.register(ParsedZone)
admin.site.register(EsolatZone)
admin.site.register(MasterSchedule)