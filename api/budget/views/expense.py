from shared.views.base import BaseViewSet

from ..models.expense import Expense
from ..serializers.expense import ExpenseSerializer

class ExpenseViewSet(BaseViewSet):
    '''Default viewsets for expenses'''
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
