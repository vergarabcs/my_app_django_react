# Generated by Django 2.2.17 on 2021-04-17 02:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0004_auto_20210417_0839'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='activity_type',
            field=models.CharField(choices=[('Word Factory', 'Word Factory')], default='Word Factory', max_length=20),
        ),
    ]