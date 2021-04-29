from django.db import models
from django.conf import settings

class Stock(models.Model):
    '''Model for Stocks holding investment data'''
    symbol = models.CharField(max_length=5)
    name = models.CharField(max_length=255)
    shares = models.DecimalField(default=0, max_digits=10, decimal_places=3)
    dividend_shares = models.DecimalField(default=0, max_digits=10, decimal_places=3)
    dividends_paid = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    avg_price = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    avg_years_held = models.DecimalField(default=0, max_digits=6, decimal_places=3)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
