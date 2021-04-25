from django.db import models
from django.conf import settings

from .budget import Budget

class Income(models.Model):
    description = models.CharField(max_length=255)
    annual_amount = models.DecimalField(default=0, max_digits=9, decimal_places=2)
    monthly_amount = models.DecimalField(default=0, max_digits=9, decimal_places=2)
    hourly_amount = models.DecimalField(default=0, max_digits=6, decimal_places=2)
    average_hours_week = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    is_taxable = models.BooleanField()
    budget = models.ForeignKey(
        Budget,
        on_delete=models.CASCADE,
        related_name='incomes'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
