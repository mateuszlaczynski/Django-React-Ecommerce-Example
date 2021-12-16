# Generated by Django 3.2.9 on 2021-11-30 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_customuser_shipment_info'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='home_number',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='street',
            field=models.CharField(blank=True, max_length=60, null=True),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='phone',
            field=models.CharField(blank=True, max_length=9, null=True),
        ),
    ]