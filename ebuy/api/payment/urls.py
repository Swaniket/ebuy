from django.urls import path, include
from . import views

urlpatterns = [
    # with the gettoken url we need the id of the user & the token
    path('gettoken/<str:id>/<str:token>/', views.generate_token, name = 'token.generate'),
    path('process/<str:id>/<str:token>/', views.process_payment, name = 'payment.process'),
]