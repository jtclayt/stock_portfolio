from rest_framework import viewsets

from ..models.expense import Expense
from ..serializers.expense import ExpenseSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    '''Default viewsets for expenses'''
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return Expense.objects.all()
