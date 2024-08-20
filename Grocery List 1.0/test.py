from cs50 import SQL
from flask import session

from helpers import get_current_date

db = SQL("sqlite:///database_test.db")

list_id = db.execute('''
                        SELECT id
                        FROM lists
                        WHERE user_id = ?
                        AND status = 'OPEN'
                        AND date = ?
                        ''', 1, get_current_date())

list_id = list_id[0]['id']

db.execute('''
            INSERT INTO list_items (list_id, item_id)
            VALUES (?, ?)
            ''', list_id, 7)

list_items = db.execute('''
                        SELECT *
                        FROM list_items
                        WHERE list_id = ?
                        ''', list_id)

print(list_items)