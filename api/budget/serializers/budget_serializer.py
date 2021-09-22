from rest_framework import serializers

from ..models.budget import Budget
from ..models.income import Income
from ..models.expense import Expense


class BudgetSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='budget:budget-detail'
    )
    incomes = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Income.objects.all()
    )
    expenses = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Expense.objects.all()
    )

    class Meta:
        model = Budget
        fields = (
            'id', 'title', 'url', 'incomes', 'expenses', 'user_id',
            'created_at', 'updated_at'
        )
        read_only_fields = ('id',)
