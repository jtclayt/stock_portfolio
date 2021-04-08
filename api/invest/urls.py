from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views.stock import StockViewSet
from .views.transaction import TransactionViewSet

router = DefaultRouter()
router.register('stocks', StockViewSet, basename='stock')
router.register('transaction', TransactionViewSet, basename='transaction')

app_name = 'invest'
urlpatterns = [
    path('', include(router.urls))
]
