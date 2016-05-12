# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0006_require_contenttypes_0002'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, verbose_name='last login', null=True)),
                ('is_superuser', models.BooleanField(help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status', default=False)),
                ('email', models.EmailField(unique=True, max_length=254, verbose_name='email address')),
                ('name', models.CharField(max_length=255)),
                ('is_staff', models.BooleanField(verbose_name='staff status', default=False)),
                ('is_active', models.BooleanField(verbose_name='active', default=True)),
                ('date_joined', models.DateTimeField(verbose_name='date joined', default=django.utils.timezone.now)),
                ('groups', models.ManyToManyField(help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', to='auth.Group', related_name='user_set', blank=True, verbose_name='groups', related_query_name='user')),
                ('user_permissions', models.ManyToManyField(help_text='Specific permissions for this user.', to='auth.Permission', related_name='user_set', blank=True, verbose_name='user permissions', related_query_name='user')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
