from rest_framework import routers, urlpatterns
from django.urls import path, include
from .views import CategoryViewSet

router = routers.DefaultRouter()
router.register(r'', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls))
]