from rest_framework import serializers
from ..models.income import Income

class IncomeSerializer(serializers.HyperlinkedModelSerializer):
    '''Serializer for list view of income'''
    url = serializers.HyperlinkedIdentityField(view_name='budget:income-detail')

    class Meta:
        model = Income
        fields = (
            'id', 'url', 'description', 'annual_amount', 'monthly_amount',
            'hourly_amount', 'average_hours_week', 'is_taxable', 'created_at',
            'updated_at'
        )
        read_only_fields = ('id',)
