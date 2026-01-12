from django.db import models
from django.utils import timezone
from datetime import timedelta
import secrets
import string

# 生成 token 的辅助函数
def generate_token():
    """生成一个随机的 token（40 个字符）"""
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(40))

class User(models.Model):
    """用户模型 - 密码明文存储"""
    username = models.CharField(max_length=150, unique=True, verbose_name='用户名')
    password = models.CharField(max_length=255, verbose_name='密码（明文）')
    is_superuser = models.BooleanField(default=False, verbose_name='是否超级用户')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'users'
        verbose_name = '用户'
        verbose_name_plural = '用户'

    def __str__(self):
        return self.username
    
    def is_super(self):
        """判断是否是超级用户"""
        return self.is_superuser
    
    @property
    def is_authenticated(self):
        """用于 DRF 权限检查"""
        return True


class Token(models.Model):
    """Token 模型 - 用于用户认证"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tokens', verbose_name='用户')
    token = models.CharField(max_length=40, unique=True, db_index=True, verbose_name='Token')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    expires_at = models.DateTimeField(verbose_name='过期时间')

    class Meta:
        db_table = 'tokens'
        verbose_name = 'Token'
        verbose_name_plural = 'Tokens'
        indexes = [
            models.Index(fields=['token']),
            models.Index(fields=['user', 'expires_at']),
        ]

    def __str__(self):
        return f'{self.user.username} - {self.token[:10]}...'

    def is_expired(self):
        """检查 token 是否过期"""
        return timezone.now() > self.expires_at

    @classmethod
    def create_token(cls, user):
        """为用户创建新的 token（有效期 7 天）"""
        # 删除该用户的所有过期 token
        cls.objects.filter(user=user, expires_at__lt=timezone.now()).delete()
        
        # 创建新 token
        token = generate_token()
        expires_at = timezone.now() + timedelta(days=7)
        
        return cls.objects.create(
            user=user,
            token=token,
            expires_at=expires_at
        )
