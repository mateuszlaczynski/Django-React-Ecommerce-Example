from django.contrib import auth
from rest_framework import viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .serializers import OrderSerializer
from .models import Order
from django.views.decorators.csrf import csrf_exempt

def validate_user_session(id, token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False


@csrf_exempt
def add(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Please re-login', 'code': '1'})

    if request.method == "POST":
        transaction_id = request.POST['transaction_id']
        amount = request.POST['amount']
        products = request.POST['products']
        adress = request.POST['adress']
        postal_code = request.POST['postal_code']
        phone = request.POST['phone']
        name = request.POST['name']
        surname = request.POST['surname']

        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(pk=id)
        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'})

        ordr = Order(user=user.email, product_names=products, adress=adress, postal_code=postal_code, phone=phone,
                    name=name, surname=surname,
                    transaction_id=transaction_id, total_amount=amount)
        ordr.save()
        return JsonResponse({'success': True, 'error': False, 'msg': 'Order placed Successfully'})


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('created_at')
    serializer_class = OrderSerializer