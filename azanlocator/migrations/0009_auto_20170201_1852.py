# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-01 10:52
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('azanlocator', '0008_auto_20170201_1804'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='parsedzone',
            name='ip_parse_str',
        ),
        migrations.RemoveField(
            model_name='parsedzone',
            name='raw_solat_parse',
        ),
        migrations.RemoveField(
            model_name='parsedzone',
            name='state_name',
        ),
        migrations.RemoveField(
            model_name='parsedzone',
            name='zone_name',
        ),
        migrations.AlterField(
            model_name='parsedtimes',
            name='zone',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='azanlocator.ParsedZone'),
        ),
    ]
