from shared.views.base import BaseViewSet

from ..models.budget import Budget
from ..serializers.budget import BudgetSerializer

class BudgetViewSet(BaseViewSet):
    '''Default viewsets for budgets'''
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
