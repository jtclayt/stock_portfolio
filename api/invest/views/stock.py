from rest_framework import viewsets

from ..models.stock import Stock
from ..serializers.stock import StockSerializer

class StockViewSet(viewsets.ModelViewSet):
    '''Default viewsets for stocks'''
    serializer_class = StockSerializer

    def get_queryset(self):
        return Stock.objects.all()
