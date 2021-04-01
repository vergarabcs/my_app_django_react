# Generated by Django 2.2.17 on 2021-03-27 00:57

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('joinCode', models.CharField(max_length=10)),
                ('status', models.CharField(choices=[('P', 'Pending'), ('IP', 'In Progress'), ('F', 'Finished')], default='P', max_length=2)),
                ('maxSize', models.PositiveIntegerField(default=5)),
                ('players', django.contrib.postgres.fields.jsonb.JSONField()),
                ('createAt', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]