from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
# the model is to check weather the session variable is available or not
from django.contrib.auth import get_user_model
# we also need the csrf because someone will make the request from the react app
from django.views.decorators.csrf import csrf_exempt
import braintree

# brainway config, from the docs
gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id="fvgwhrpppz9b6dfw",
        public_key="5mggwv78xqvm3tpy",
        private_key="5074af017cacfdcf10c657fe4ad767d7"
    )
)

# to check weather the user is signed up or not
def validate_user_session(id, token):
    UserModel = get_user_model()

    # We need to check if the current user has a token and if that token is the same that we genarated or not
    try:
        user = UserModel.objects.get(pk = id)
        # if session token of user is = to the token that user is carrying via the url
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False


# now we need to sent an acknowledgement token to the frontend
@csrf_exempt
def generate_token(request, id, token):
    # the fronend will only get the token when the user is validated
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Invalid session, Please login again!'})
    
    # the token needs to be generated from the braintree servers
    return JsonResponse({
        'clientToken': gateway.client_token.generate(), 
        'success': True
        })

# Now we need to create a transaction
@csrf_exempt
def process_payment(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Invalid session, Please login again!'})
    
    # Informations from frontend
    nonce_from_the_client = request.POST["paymentMethodNonce"]
    amount_from_the_client = request.POST["amount"]

    # from the docs
    result = gateway.transaction.sale({
        "amount": amount_from_the_client,
        "payment_method_nonce": nonce_from_the_client,
        "options": {
        "submit_for_settlement": True
        }
    })

    # When the transaction is successful
    if result.is_success:
        return JsonResponse({"success": result.is_success, "transaction": {'id': result.transaction.id, 'amount': result.transaction.amount}})

    # when something goes wrong
    else:
        return JsonResponse({'error': True, 'success': False})


