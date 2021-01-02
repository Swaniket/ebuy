from rest_framework import viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .serializers import OrderSerializers
from .models import Order
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
# We are only going to place order for signed in user

# In the url, we need to provide the id & token as well
def validate_user_session(id, token): 
    UserModel = get_user_model()
    try:
        # Getting the user via id
        user = UserModel.objects.get(pk = id)

        # The user is authenticated if the session token is the same as the urls token
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False

# When the user hits the route, we need to collect the data & pusing the data in the admin
@csrf_exempt
def add(request, id, token):
    # 1st we need to check if the user is authenticated or not
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Please login to add', 'code': '500'})

    # We will procede in this condition only
    if request.method == 'POST':
        user_id = id
        transaction_id = request.POST['transaction_id']
        # amount will be coming up from the frontend
        amount = request.POST['amount']
        products = request.POST['products']

        total_pro = len(products.split(',')[:-1])

        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(pk = user_id)
        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'})

        # Placing the order
        ordr = Order(
            user = user, 
            product_names = products, 
            total_products = total_pro, 
            transaction_id = transaction_id, 
            total_amount = amount)

        ordr.save()
        return JsonResponse({'success': True, 'error': False, 'msg': 'Order Placed Successfully'})


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('id') 
    serializer_class = OrderSerializers


