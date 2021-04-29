from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from ..models.budget import Budget

BUDGET_URL = reverse('budget:budget-list')


def budget_detail_url(id: int) -> str:
    '''Helper function for getting the detail url for a budget'''
    return f'{BUDGET_URL}{id}/'


def sample_budget(user: get_user_model(), **params) -> Budget:
    '''Helper function for creating a budget'''
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
        self.user = get_user_model().objects.create_user('testuser', 'test')
        self.client.force_authenticate(self.user)

    def test_get_budget(self):
        '''Test that an auth user can get their budgets'''
        sample_budget(user=self.user)

        res = self.client.get(BUDGET_URL)
        budget = Budget.objects.first()

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['results'][0]['title'], budget.title)

    def test_get_budget_limited_to_user(self):
        '''Budgets should only be retrieved by auth user'''
        other_user = get_user_model().objects.create_user('otheruser', 'test')
        sample_budget(user=other_user, title='Other budget')
        sample_budget(user=self.user, title='User budget 1')
        sample_budget(user=self.user, title='User budget 2')

        res = self.client.get(BUDGET_URL)
        budgets = Budget.objects.filter(user=self.user)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['results']), len(budgets))

        for budget in res.data['results']:
            self.assertEqual(budget['user_id'], self.user.id)

    def test_create_budget(self):
        '''Test creating a new budget'''
        payload = {'title': 'Create test'}

        res = self.client.post(BUDGET_URL, payload)
        new_budget = Budget.objects.get(id=res.data['id'])

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertIsNotNone(new_budget)
        self.assertEqual(new_budget.title, payload['title'])
        self.assertEqual(new_budget.user, self.user)

    def test_rename_budget(self):
        '''Test that a budget can be renamed'''
        budget = sample_budget(user=self.user, title='Old name')
        payload = {'title': 'Update test'}
        url =  budget_detail_url(budget.id)

        self.client.patch(url, payload)
        budget.refresh_from_db()

        self.assertEqual(budget.title, payload['title'])
