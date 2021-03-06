from rest_framework import serializers

from api.Users.models import Users


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('pk', 'username', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True},
            'pk': {'read_only': True}
        }

    def create(self, validated_data):
        print('OK')
        return Users.objects.create_user(**validated_data)