from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views.budget import BudgetViewSet
from .views.income import IncomeViewSet
from .views.expense import ExpenseViewSet

router = DefaultRouter()
router.register('budgets', BudgetViewSet, basename='budget')
router.register('incomes', IncomeViewSet, basename='income')
router.register('expenses', ExpenseViewSet, basename='expense')

app_name = 'budget'
urlpatterns = [
    path('', include(router.urls))
]
