# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-01 03:12
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('azanlocator', '0003_auto_20170201_1112'),
    ]

    operations = [
        migrations.AlterField(
            model_name='parsedzone',
            name='ip_parse_str',
            field=models.CharField(default='{"time_zone": "America/New_York", "country_code": "US", "zip_code": "11249", "country_name": "United States", "ip": "108.46.131.77", "longitude": -73.945, "city": "Brooklyn", "region_code": "NY", "latitude": 40.645, "region_name": "New York", "metro_code": 501}', max_length=400),
        ),
    ]