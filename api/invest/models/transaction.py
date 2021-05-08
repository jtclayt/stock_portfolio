from django.db import models
from django.conf import settings

from .stock import Stock

class Transaction(models.Model):
    shares_traded = models.DecimalField(max_digits=10, decimal_places=3)
    trade_price = models.DecimalField(max_digits=10, decimal_places=2)
    is_buy = models.BooleanField()
    is_dividend = models.BooleanField()
    trade_date = models.DateTimeField()
    stock = models.ForeignKey(
        Stock,
        on_delete=models.CASCADE,
        related_name='transactions')
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
