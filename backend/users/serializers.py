from rest_framework import serializers
from .models import User, Token

class RegisterSerializer(serializers.Serializer):
    """注册序列化器"""
    username = serializers.CharField(max_length=150, required=True)
    password = serializers.CharField(max_length=255, required=True, write_only=True)

    def validate_username(self, value):
        """验证用户名是否已存在"""
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('用户名已存在')
        return value

    def create(self, validated_data):
        """创建用户（第一个用户自动设为超级用户，后续为普通用户）"""
        # 检查是否是第一个用户
        is_first_user = User.objects.count() == 0
        
        user = User.objects.create(
            username=validated_data['username'],
            password=validated_data['password'],  # 明文存储
            is_superuser=is_first_user  # 第一个用户自动设为超级用户
        )
        return user


class LoginSerializer(serializers.Serializer):
    """登录序列化器"""
    username = serializers.CharField(max_length=150, required=True)
    password = serializers.CharField(max_length=255, required=True, write_only=True)


class TokenSerializer(serializers.Serializer):
    """Token 序列化器"""
    token = serializers.CharField()
    expires_at = serializers.DateTimeField()
