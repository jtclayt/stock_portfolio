from django.db import models
from .stock import Stock

class Transaction(models.Model):
    shares_traded = models.FloatField()
    trade_price = models.FloatField()
    is_buy = models.BooleanField()
    trade_date = models.DateTimeField()
    stock = models.ForeignKey(
        Stock,
        on_delete=models.CASCADE,
        related_name='transactions')
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
