from django.shortcuts import render

# Create your views here.
# create 5 methods for rest API
# here we will use view set
from django.views.generic.base import View

from rest_framework import viewsets, status
from rest_framework.response import Response
import csv
import os

from django.contrib import messages
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Sum

from .models import Order, Item, Payment, Shipping
from .serializers import OrderSerializer, ItemSerializer,\
    PaymentSerializer, ShippingSerializer

# from celery import shared_task
from .tasks import bcreate


class OrderViewSet(viewsets.ViewSet):
    def list(self,request): #/api/products
        products = Order.objects.all()
        serializer = OrderSerializer(products, many=True)
        return Response(serializer.data)

    def create(self,request): #/api/products
        serializer = OrderSerializer(data = request.data)
        print(type(request.data),request.data)
        serializer.is_valid(raise_exception=True)
        #if valid data, save it
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None): #/app/products/<str:id>
        product = Order.objects.filter(order_id=pk)
        serializer = OrderSerializer(product, many=True)
        return Response(serializer.data)

    def retrievemail(self, request, pk=None): #/app/products/<str:id>
        product = Order.objects.filter(customer_id=pk)
        # print(product)
        serializer = OrderSerializer(product, many=True)
        return Response(serializer.data)

    def update(self, request, pk=None): #/app/products/<str:id>
        product = Order.objects.get(order_id=pk)
        serializer = OrderSerializer(instance=product, data=request.data)
        serializer.is_valid(raise_exception=True)
        # if valid data, save it
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def productsupdate(self, request, pk=None): #/app/products/<str:id>
        product = Order.objects.filter(order_id=pk).first()
        serializer = OrderSerializer(instance=product, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        # if valid data, save it
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def destroy(self, request, pk=None): #/app/products/<str:id>
        product = Order.objects.get(order_id=pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ItemViewSet(viewsets.ViewSet):
    def list(self,request): #/api/products
        products = Item.objects.all()
        serializer = ItemSerializer(products, many=True)
        return Response(serializer.data)

    def create(self,request, pk=None): #/api/products
        # product = Order.objects.get(order_id=pk)
        request.data['item_order'] = pk
        print(request.data)
        serializer = ItemSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        #if valid data, save it
        serializer.save()
        print('saving')
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None): #/app/products/<str:id>
        product = Item.objects.filter(item_order=pk)
        res = Item.objects.filter(item_order=pk).aggregate(Sum('price'))
        print(res)
        serializer = ItemSerializer(product, many=True)
        return Response(serializer.data)

    def update(self, request, pk=None): #/app/products/<str:id>
        product = Order.objects.get(order_id=pk)
        serializer = ItemSerializer(instance=product, data=request.data)
        serializer.is_valid(raise_exception=True)
        # if valid data, save it
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def updatepartial(self, request, pk=None): #/app/products/<str:id>
        product = Order.objects.filter(order_id=pk)
        serializer = ItemSerializer(instance=product, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        # if valid data, save it
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def destroy(self, request, pk=None): #/app/products/<str:id>
        product = Order.objects.get(order_id=pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PaymentViewSet(viewsets.ViewSet):
    def list(self,request): #/api/products
        products = Payment.objects.all()
        serializer = PaymentSerializer(products, many=True)
        return Response(serializer.data)

    def create(self,request, pk=None): #/api/products
        # product = Order.objects.get(order_id=pk)
        request.data['payment_order'] = pk
        serializer = PaymentSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        #if valid data, save it
        serializer.save()
        print('saving')
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None): #/app/products/<str:id>
        product = Payment.objects.filter(payment_order=pk)
        serializer = PaymentSerializer(product, many=True)
        return Response(serializer.data)

    def retrieve_onid(self, request, pk=None): #/app/products/<str:id>
        product = Payment.objects.filter(id=pk)
        serializer = PaymentSerializer(product, many=True)
        return Response(serializer.data)

    def update(self, request, pk=None): #/app/products/<str:id>
        product = Order.objects.get(order_id=pk)
        serializer = OrderSerializer(instance=product, data=request.data)
        serializer.is_valid(raise_exception=True)
        # if valid data, save it
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def destroy(self, request, pk=None): #/app/products/<str:id>
        product = Order.objects.get(order_id=pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ShippingViewSet(viewsets.ViewSet):
    def list(self,request): #/api/products
        products = Shipping.objects.all()
        serializer = ShippingSerializer(products, many=True)
        return Response(serializer.data)

    def create(self,request, pk=None): #/api/products
        # product = Payment.objects.get(id=pk)
        request.data['ship_payment'] = pk
        serializer = ShippingSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        #if valid data, save it
        serializer.save()
        print('saving')
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None): #/app/products/<str:id>
        product = Shipping.objects.filter(ship_payment=pk)
        serializer = ShippingSerializer(product, many=True)
        return Response(serializer.data)

    def update(self, request, pk=None): #/app/products/<str:id>
        product = Order.objects.get(payment_order=pk)
        serializer = ShippingSerializer(instance=product, data=request.data)
        serializer.is_valid(raise_exception=True)
        # if valid data, save it
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def destroy(self, request, pk=None): #/app/products/<str:id>
        product = Order.objects.get(order_id=pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BulkCreate(viewsets.ViewSet):
    def create(self, request, pk=None):

        bcreate.s().delay()
        messages.success(request,'We are generating your random users! Wait a moment and refresh this page.')
        return redirect('/orders/products')


class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return Response(file.read(), content_type='application/javascript')
        else:
            return Response()

