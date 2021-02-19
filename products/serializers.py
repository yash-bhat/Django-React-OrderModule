from rest_framework import serializers
from .models import Order, Item, Payment, Shipping

#to return objects in the API for products
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    items = ItemSerializer(read_only=True, many=True)
    class Meta:
        model = Order
        fields = '__all__'

class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    shipping_address = ShippingSerializer(read_only=True)
    class Meta:
        model = Payment
        fields = '__all__'

