from django.shortcuts import render # We don't need it as we are not working on the default django template
from rest_framework import viewsets
# For the views to be JSONified
from .serializers import CategorySerializer
from .models import Category

# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    # get the data from database
    queryset = Category.objects.all().order_by('name') 
    # Class responsible for serializing my data
    serializer_class = CategorySerializer # the data is now in JSON format
