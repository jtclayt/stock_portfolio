from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views.budget_view_set import BudgetViewSet
from .views.income_view_set import IncomeViewSet
from .views.expense_view_set import ExpenseViewSet

router = DefaultRouter()
router.register('budgets', BudgetViewSet, basename='budget')
router.register('incomes', IncomeViewSet, basename='income')
router.register('expenses', ExpenseViewSet, basename='expense')

app_name = 'budget'
urlpatterns = [
    path('', include(router.urls))
]
