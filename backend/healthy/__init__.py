# 使用 PyMySQL 替代 mysqlclient（纯 Python 实现，兼容性更好）
import pymysql

# 将 PyMySQL 注册为 MySQLdb（Django 兼容）
pymysql.install_as_MySQLdb()
