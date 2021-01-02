from django.shortcuts import render
# to sent a json response
from django.http import JsonResponse


# Create your views here.
def home(request):
    return JsonResponse({
        'info': 'Django-React',
        'Name': 'Swaniket'
    })
