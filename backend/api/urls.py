from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('categories/', include('api.category.urls')),
    path('products/', include('api.product.urls')),
    path('users/', include('api.user.urls')),
    path('order/', include('api.order.urls')),
    path('payment/', include('api.payment.urls'))
]