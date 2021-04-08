from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views.income import IncomeViewSet
from .views.expense import ExpenseViewSet

router = DefaultRouter()
router.register('incomes', IncomeViewSet, basename='income')
router.register('expenses', ExpenseViewSet, basename='expense')

app_name = 'budget'
urlpatterns = [
    path('', include(router.urls))
]
