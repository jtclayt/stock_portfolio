from rest_framework import viewsets

from ..models.income import Income
from ..serializers.income import IncomeSerializer

class IncomeViewSet(viewsets.ModelViewSet):
    '''Default viewsets for stocks'''
    serializer_class = IncomeSerializer

    def get_queryset(self):
        return Income.objects.all()
