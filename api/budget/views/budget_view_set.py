from shared.views.base_view_set import BaseViewSet

from ..models.budget import Budget
from ..serializers.budget_serializer import BudgetSerializer

class BudgetViewSet(BaseViewSet):
    '''Default viewsets for budgets'''
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
