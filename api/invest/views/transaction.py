from shared.views.base import BaseViewSet
from ..models.transaction import Transaction
from ..serializers.transaction import TransactionSerializer

class TransactionViewSet(BaseViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
