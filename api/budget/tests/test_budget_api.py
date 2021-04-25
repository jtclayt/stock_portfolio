from budget.serializers.budget import BudgetSerializer
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from ..models.budget import Budget
from ..serializers.budget import BudgetSerializer

BUDGET_URL = reverse('budget:budget-list')

def sample_budget(user, **params):
    defaults = {'title': 'Sample budget'}
    defaults.update(params)
    return Budget.objects.create(user=user, **defaults)

class PublicBudgetApiTests(TestCase):
    '''Test unauthenticated budget API'''
    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        res = self.client.get(BUDGET_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateBudgetTests(TestCase):
    '''Test authenticated budget API'''
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            {'username': 'test', 'password': 'test'}
        )
        self.client.force_authenticate(self.user)

    def test_retrieve_budget(self):
        sample_budget(user=self.user)

        res = self.client.get(BUDGET_URL)

        budget = Budget.objects.first()

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['results'][0]['title'], budget.title)
