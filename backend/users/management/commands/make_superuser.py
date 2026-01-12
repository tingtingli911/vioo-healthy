from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):
    help = '创建超级用户'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str, help='用户名')
        parser.add_argument('password', type=str, help='密码')

    def handle(self, *args, **options):
        username = options['username']
        password = options['password']

        # 检查用户是否已存在
        if User.objects.filter(username=username).exists():
            user = User.objects.get(username=username)
            user.is_superuser = True
            user.password = password
            user.save()
            self.stdout.write(
                self.style.SUCCESS(f'用户 "{username}" 已存在，已更新为超级用户')
            )
        else:
            # 创建新用户
            user = User.objects.create(
                username=username,
                password=password,
                is_superuser=True
            )
            self.stdout.write(
                self.style.SUCCESS(f'成功创建超级用户 "{username}"')
            )
