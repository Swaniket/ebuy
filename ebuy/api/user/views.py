from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import get_user_model, login, logout
from django.views.decorators.csrf import csrf_exempt
import random
import re

# Create your views here.
# this method will be responsible for generating session token
def generate_session_token(length = 10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97, 123)] + [str(i) for i in range(10)]) for _ in range(length))

# Custom signin- we are making the request from another origin, to make this work we will need to user csrf_exempt
@csrf_exempt
def signin(request):
    # if the method is not post, then we are saying that only post request is acceped in this route
    if not request.method == 'POST':
        return JsonResponse({'error': 'Send a post request with valid parameters only'})

    email = request.POST['email']
    password = request.POST['password']

    # Validation part
    # .match() matches not by word by word, but rather a patteren
    if not re.match('([\w\.\-_]+)?\w+@[\w-]+(\.\w+){1,}', email):
        return JsonResponse({'error': 'Enter a valid email'})

    if len(password) < 3:
        return JsonResponse({'error': 'You password needs to be atleast 3 characters long'})

    # - at least 8 characters
    # - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
    # - Can contain special characters
    # if not re.match('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$', password):
    #     return JsonResponse({'error': 'Enter password according to the policy'})


    # grab the user from database & match it's credentials
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email = email)

        # it will only enter if the password will be matching
        if user.check_password(password):
            usr_dict = UserModel.objects.filter(email = email).values().first()
            # we are poping off the password because we don't want this to travel further in the front end
            usr_dict.pop('password')

            # When the user is already loggedin- means previous session is running
            if user.session_token != '0':
                # the next time, he should be logged in
                user.session_token = 0
                user.save()
                return JsonResponse({'error': 'Previous session exist'})

            # genarating the token
            token = generate_session_token()
            user.session_token = token
            user.save()
            # logging in via default login method
            login(request, user)
            # If you are not throwing the token back, then things are not gonna be working
            return JsonResponse({'token': token, 'user': usr_dict})
        else:
            return JsonResponse({'error': 'Invalid Password'})

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid Email'})


# the id is required for the session token. the id will be responisble for flushing out the session token from the db
def signout(request, id):
    UserModel = get_user_model()

    # in the try we will access the data & delete some things from there
    try:
        user = UserModel.objects.get(pk = id)
        user.session_token = '0'
        user.save()
        logout(request)

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid user ID'})

    return JsonResponse({'success': 'Logout Success'})


class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create': [AllowAny]}

    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]