# Generated by Django 5.0.1 on 2025-01-26 09:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Yatraapp', '0002_userprofile_password'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='booking',
            table='booking',
        ),
        migrations.AlterModelTable(
            name='tourpackage',
            table='tourpackage',
        ),
        migrations.AlterModelTable(
            name='userprofile',
            table='userprofile',
        ),
    ]
