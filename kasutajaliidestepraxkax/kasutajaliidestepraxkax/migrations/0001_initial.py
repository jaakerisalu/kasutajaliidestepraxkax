# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Grade',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('value', models.PositiveSmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='GradeCategory',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='HomeWork',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('matricule', models.PositiveIntegerField()),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='gradecategory',
            name='homework',
            field=models.ForeignKey(to='kasutajaliidestepraxkax.HomeWork', related_name='subgrades'),
        ),
        migrations.AddField(
            model_name='grade',
            name='category',
            field=models.ForeignKey(to='kasutajaliidestepraxkax.GradeCategory', related_name='grades'),
        ),
        migrations.AddField(
            model_name='grade',
            name='student',
            field=models.ForeignKey(to='kasutajaliidestepraxkax.Student', related_name='grades'),
        ),
        migrations.AlterUniqueTogether(
            name='grade',
            unique_together=set([('student', 'category')]),
        ),
    ]
