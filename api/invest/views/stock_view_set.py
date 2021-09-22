from shared.views.base_view_set import BaseViewSet
from ..models.stock import Stock
from ..serializers.stock_serializer import StockSerializer

class StockViewSet(BaseViewSet):
    '''Default viewsets for stocks'''
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
