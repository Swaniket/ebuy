from django.urls import path, include
# For later authentication purposes 
from rest_framework.authtoken import views
from .views import home

urlpatterns = [
    # handling the home route for api
    path('', home, name = 'api.home'),
    # route the url through category's urls.py's 
    path('category/', include('api.category.urls')),
    # route the urls for products through products URL file
    path('product/', include('api.product.urls')),
    # route for user
    path('user/', include('api.user.urls')),
    # route for orders
    path('order/', include('api.order.urls')),
    # Route for payment
    path('payment/', include('api.payment.urls')),
    # We don't need this route, but if we use django's default token, then we need this
    path('api-token-auth/', views.obtain_auth_token, name = 'api-token-auth'),

]