# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-15 14:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_movies_tmdbid'),
    ]

    operations = [
        migrations.AddField(
            model_name='movies',
            name='seen',
            field=models.BooleanField(default=0),
        ),
    ]
