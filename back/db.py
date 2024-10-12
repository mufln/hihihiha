import psycopg
from cfg import *
from psycopg.rows import dict_row


tokens = {}


conn_string = f"host={DB_HOST} dbname={DB_NAME} user={DB_USER} password={DB_PASS}"

def get_db():
    db = psycopg.connect(conn_string,row_factory=dict_row)
    return db
