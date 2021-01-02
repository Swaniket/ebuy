from django.contrib import admin
from .models import Product

# Register your models here.
admin.site.register(Product) # we also need to introduce it to the installed apps of settings.py
