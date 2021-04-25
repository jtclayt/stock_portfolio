from shared.views.base import BaseViewSet

from ..models.income import Income
from ..serializers.income import IncomeSerializer

class IncomeViewSet(BaseViewSet):
    '''Default viewsets for stocks'''
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer
