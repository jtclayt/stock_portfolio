from shared.views.base_view_set import BaseViewSet
from ..models.transaction import Transaction
from ..serializers.transaction_serializer import TransactionSerializer

class TransactionViewSet(BaseViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
