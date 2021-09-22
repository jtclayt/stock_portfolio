from rest_framework import serializers

from ..models.stock import Stock
from ..models.transaction import Transaction

class TransactionSerializer(serializers.Serializer):
    stock = serializers.PrimaryKeyRelatedField(
        queryset=Stock.objects.all())
    url = serializers.HyperlinkedIdentityField(
        view_name='invest:transaction-detail')

    class Meta:
        model = Transaction
        fields = (
            'id', 'stock', 'shares_traded', 'trade_price', 'is_buy',
            'is_dividend', 'trade_date', 'created_at', 'updated_at', 'user_id',
            'stock'
        )
        read_only_fields = ('id',)
