# Generated by Django 3.2.9 on 2021-11-30 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_auto_20211130_1315'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='shipment_info',
            field=models.BooleanField(default=False),
        ),
    ]