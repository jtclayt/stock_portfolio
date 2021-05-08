from shared.views.base import BaseViewSet
from ..models.stock import Stock
from ..serializers.stock import StockSerializer

class StockViewSet(BaseViewSet):
    '''Default viewsets for stocks'''
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

    def post(self, request):
        print(request)
        return super().post(request)