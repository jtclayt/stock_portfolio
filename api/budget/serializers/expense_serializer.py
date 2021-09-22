from rest_framework import serializers

from ..models.budget import Budget
from ..models.expense import Expense


class ExpenseSerializer(serializers.HyperlinkedModelSerializer):
    '''Serializer for list view of expenses'''
    url = serializers.HyperlinkedIdentityField(view_name='budget:expense-detail')
    budget = serializers.PrimaryKeyRelatedField(queryset=Budget.objects.all())

    class Meta:
        model = Expense
        fields = (
            'id', 'url', 'description', 'annual_amount', 'monthly_amount',
            'budget', 'user_id', 'created_at', 'updated_at'
        )
        read_only_fields = ('id',)
