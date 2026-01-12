from rest_framework import permissions


class IsSuperUser(permissions.BasePermission):
    """权限类：只允许超级用户访问"""
    
    def has_permission(self, request, view):
        """检查用户是否有权限"""
        # 必须已认证
        if not request.user or not request.user.is_authenticated:
            return False
        
        # 检查是否是超级用户
        return request.user.is_superuser
