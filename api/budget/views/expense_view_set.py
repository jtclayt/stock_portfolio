from shared.views.base_view_set import BaseViewSet

from ..models.expense import Expense
from ..serializers.expense_serializer import ExpenseSerializer

class ExpenseViewSet(BaseViewSet):
    '''Default viewsets for expenses'''
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
