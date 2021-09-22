from shared.views.base_view_set import BaseViewSet

from ..models.income import Income
from ..serializers.income_serializer import IncomeSerializer

class IncomeViewSet(BaseViewSet):
    '''Default viewsets for stocks'''
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer
