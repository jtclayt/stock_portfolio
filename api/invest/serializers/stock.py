from rest_framework import serializers

from ..models.stock import Stock
from ..models.transaction import Transaction

class StockSerializer(serializers.HyperlinkedModelSerializer):
    '''Serializer for list view of stocks'''
    transactions = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Transaction.objects.all()
    )
    url = serializers.HyperlinkedIdentityField(view_name='invest:stock-detail')

    class Meta:
        model = Stock
        fields = (
            'id', 'url', 'symbol', 'name', 'shares', 'dividend_shares',
            'dividends_paid', 'avg_price', 'avg_years_held', 'created_at',
            'updated_at', 'transactions', 'user_id'
        )
        read_only_fields = ('id',)

    def create(self, validated_data):
        '''Custom create to uppercase stock symbol'''
        validated_data['symbol'] = validated_data['symbol'].upper()
        return super().create(validated_data)

    def validate(self, data):
        '''Custom validate to ensure a user can only have one of each valid symbol'''
        user = self.context['request'].user

        if len(Stock.objects.filter(user=user, symbol=data['symbol'].upper())) == 0:
            return super().validate(data)
        raise serializers.ValidationError('User can not have duplicate stocks')
