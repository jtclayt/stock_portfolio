from rest_framework import serializers
from ..models.stock import Stock
from ..models.transaction import Transaction

class StockSerializer(serializers.HyperlinkedModelSerializer):
    '''Serializer for list view of stocks'''
    transactions = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Transaction.objects.all()
    )
    url = serializers.HyperlinkedIdentityField(view_name='app:stock-detail')

    class Meta:
        model = Stock
        fields = (
            'id', 'url', 'symbol', 'company', 'created_at',
            'updated_at', 'transactions'
        )
        read_only_fields = ('id',)
