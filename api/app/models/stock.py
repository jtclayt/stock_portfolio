from django.db import models

class Stock(models.Model):
    symbol = models.CharField(max_length=5)
    company = models.CharField(max_length=255)
    shares = models.FloatField(default=0)
    dividend_shares = models.FloatField(default=0)
    avg_price = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
