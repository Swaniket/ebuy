# here, we will use rest framework router
from rest_framework import routers
from django.urls import path, include
# we will also need the views
from . import views

router = routers.DefaultRouter()
# the path is empty because it is already handled api's url
router.register(r'', views.UserViewSet)

urlpatterns = [
    path('login/', views.signin, name = 'signin'),
    # in the signout function an ID is required.
    path('logout/<int:id>/', views.signout, name = 'signout'),
    path('', include(router.urls)),
]