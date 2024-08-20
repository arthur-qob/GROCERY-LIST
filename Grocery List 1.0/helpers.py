from flask import redirect, render_template, session
from functools import wraps
from datetime import datetime


def apology(message, code = 400, title = 'Apology'):
    def escape(s):
        for old, new in [("-", "--"), (" ", "-"), ("_", "__"), ("?", "~q"),
                         ("%", "~p"), ("#", "~h"), ("/", "~s"), ("\"", "''")]:
            s = s.replace(old, new)
        return s
    return render_template("apology.html", top = code, bottom = escape(message), title = title), code

# -------------------------------------------------------------------------------------------------

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/menu")
        return f(*args, **kwargs)
    return decorated_function

# -------------------------------------------------------------------------------------------------

def dateForm(year, month, day):
    if year.isdigit() and month.isdigit() and day.isdigit():
        result = f"{year}-{month.zfill(2)}-{day.zfill(2)}"
    else:
        result = None
    
    return result

# -------------------------------------------------------------------------------------------------

def get_current_year():
    return datetime.now().year

# -------------------------------------------------------------------------------------------------

def get_current_month():
    return datetime.now().month

# -------------------------------------------------------------------------------------------------

def get_current_day():
    return datetime.now().day

# -------------------------------------------------------------------------------------------------

def get_current_date():
    return datetime.now().strftime("%Y-%m-%d")

# -------------------------------------------------------------------------------------------------

def brl(value):
    if isinstance(value, str):
        return f"${float(value.replace('R$', '')):,.2f}"

    else:
        return f"R${value:,.2f}"
    
# -------------------------------------------------------------------------------------------------

def upper(value):
    return value.upper()

# -------------------------------------------------------------------------------------------------