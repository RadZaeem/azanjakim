# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-08-08 10:41
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('azanlocator', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='parsedtimes',
            name='date_time_requested',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='parsedtimes',
            name='zone',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='parsed_times', to='azanlocator.ParsedZone'),
        ),
    ]
