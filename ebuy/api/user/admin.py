from django.contrib import admin
from .models import CustomUser

# Register your models here.

# As this model is based on a existing app, it will create error when we are going to register it to the settings
admin.site.register(CustomUser)
