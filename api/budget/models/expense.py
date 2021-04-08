from django.db import models

class Expense(models.Model):
    description = models.CharField(max_length=255)
    annual_amount = models.DecimalField(default=0, max_digits=9, decimal_places=2)
    monthly_amount = models.DecimalField(default=0, max_digits=9, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
