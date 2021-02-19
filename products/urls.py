from django.contrib import admin
from django.urls import path

from .views import OrderViewSet, ItemViewSet, PaymentViewSet, ShippingViewSet, BulkCreate
from . import views




urlpatterns = [
    path('products', OrderViewSet.as_view({
        'get': 'list',
        'post': 'create',
    })),
    path('productsmail/<str:pk>', OrderViewSet.as_view({
        'get': 'retrievemail'
    })),
    path('productsupdate/<str:pk>', OrderViewSet.as_view({
        'put': 'productsupdate'
    })),
    path('products/<str:pk>', OrderViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    path('items', ItemViewSet.as_view({
        'get': 'list',
    })),
    path('items/<str:pk>', ItemViewSet.as_view({
        'post': 'create',
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    path('payments', PaymentViewSet.as_view({
        'get': 'list',
    })),
    path('paymentsonid/<str:pk>', PaymentViewSet.as_view({
        'get': 'retrieve_onid',
    })),
    path('payments/<str:pk>', PaymentViewSet.as_view({
        'post': 'create',
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    path('shippings', ShippingViewSet.as_view({
        'get': 'list',
    })),
    path('shippings/<str:pk>', ShippingViewSet.as_view({
        'post': 'create',
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    path('bulk', BulkCreate.as_view({
        'post': 'create',
    })),

]