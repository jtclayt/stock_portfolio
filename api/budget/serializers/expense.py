from rest_framework import serializers
from ..models.expense import Expense

class ExpenseSerializer(serializers.HyperlinkedModelSerializer):
    '''Serializer for list view of expenses'''
    url = serializers.HyperlinkedIdentityField(view_name='budget:expense-detail')

    class Meta:
        model = Expense
        fields = (
            'id', 'url', 'description', 'annual_amount', 'monthly_amount',
            'created_at', 'updated_at'
        )
        read_only_fields = ('id',)
