from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from .models import User, Token
from .serializers import RegisterSerializer, LoginSerializer, TokenSerializer
from .permissions import IsSuperUser


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """用户注册"""
    serializer = RegisterSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        # 注册成功后自动创建 token
        token_obj = Token.create_token(user)
        token_serializer = TokenSerializer({
            'token': token_obj.token,
            'expires_at': token_obj.expires_at
        })
        
        return Response({
            'code': 0,
            'message': '注册成功',
            'data': {
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'is_superuser': user.is_superuser
                },
                **token_serializer.data
            }
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'code': 1,
        'message': '注册失败',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """用户登录"""
    serializer = LoginSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response({
            'code': 1,
            'message': '登录失败',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    username = serializer.validated_data['username']
    password = serializer.validated_data['password']
    
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({
            'code': 1,
            'message': '用户名或密码错误'
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    # 验证密码（明文比较）
    if user.password != password:
        return Response({
            'code': 1,
            'message': '用户名或密码错误'
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    # 创建或更新 token
    token_obj = Token.create_token(user)
    token_serializer = TokenSerializer({
        'token': token_obj.token,
        'expires_at': token_obj.expires_at
    })
    
    return Response({
        'code': 0,
        'message': '登录成功',
        'data': {
            'user': {
                'id': user.id,
                'username': user.username,
                'is_superuser': user.is_superuser
            },
            **token_serializer.data
        }
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    """获取当前用户信息（需要 token 认证）"""
    # request.user 由 TokenAuthentication 自动设置
    user = request.user
    
    return Response({
        'code': 0,
        'message': '获取成功',
        'data': {
            'user': {
                'id': user.id,
                'username': user.username,
                'is_superuser': user.is_superuser,
                'created_at': user.created_at
            }
        }
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsSuperUser])
def admin_dashboard(request):
    """平台管理接口示例（仅超级用户可访问）"""
    return Response({
        'code': 0,
        'message': '欢迎使用管理后台',
        'data': {
            'admin_info': {
                'username': request.user.username,
                'total_users': User.objects.count(),
                'super_users': User.objects.filter(is_superuser=True).count(),
            }
        }
    })
