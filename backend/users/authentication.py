from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.utils import timezone
from .models import Token, User


class TokenAuthentication(BaseAuthentication):
    """自定义 Token 认证"""
    
    def authenticate(self, request):
        """从请求头中获取 token 并验证"""
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        
        if not auth_header:
            return None
        
        # 支持 "Bearer <token>" 或直接 "<token>" 格式
        if auth_header.startswith('Bearer '):
            token = auth_header.replace('Bearer ', '')
        else:
            token = auth_header
        
        if not token:
            return None
        
        try:
            token_obj = Token.objects.select_related('user').get(token=token)
            
            # 检查 token 是否过期
            if token_obj.is_expired():
                raise AuthenticationFailed('Token 已过期')
            
            return (token_obj.user, token_obj)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Token 无效')
    
    def authenticate_header(self, request):
        """返回认证失败时的响应头"""
        return 'Bearer'
