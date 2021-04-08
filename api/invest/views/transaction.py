from rest_framework import viewsets

from ..models.stock import Stock
from ..models.transaction import Transaction
from ..serializers.transaction import TransactionSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.all()
