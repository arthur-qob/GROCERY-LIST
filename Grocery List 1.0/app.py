from cs50 import SQL
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, render_template, request, redirect, flash, session
from flask_session import Session
from helpers import *
import time
import json

db = SQL('sqlite:///database_test.db')

# ----------------------------------------------------------------------------------------------------------------------------------------

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True

session_permanent_state = False
app.config['SESSION_PERMANENT'] = session_permanent_state
app.config['SESSION_TYPE'] = 'filesystem'
app.config['MESSAGE_FLASHING_OPTIONS'] = {'duration': 5}
Session(app)

# ----------------------------------------------------------------------------------------------------------------------------------------

app.jinja_env.filters['brl'] = brl
app.jinja_env.filters['upper'] = upper

# ----------------------------------------------------------------------------------------------------------------------------------------

@app.after_request
def after_request(response):
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Expires'] = 0
    response.headers['Pragma'] = 'no-cache'
    return response

# ----------------------------------------------------------------------------------------------------------------------------------------

# @app.route('/dom-loaded', methods = ['POST'])
# def dom_loaded():
#     print('DOM content is loaded.')
#     return {'status': 'received'}

# ----------------------------------------------------------------------------------------------------------------------------------------

@app.route('/menu', methods = ['GET'])
def menu():
    if request.method == 'GET':
        
        # if dom_loaded():
            # return render_template('menu.html', status = 'received')
        
        return render_template('menu.html')
    
# ----------------------------------------------------------------------------------------------------------------------------------------

@app.route('/login', methods = ['POST'])
def login():
    if request.method == 'POST':
        user_credentials = request.form.get('user_credentials').rstrip()
        password = request.form.get('password').rstrip()
        remember_me = request.form.get('remember_me')

        if (not user_credentials or not password) or (not user_credentials and not password):
            flash('Please enter your username and password.', 'error')
            return redirect('/menu')
        
        if '@' in user_credentials:
            user_confirmation = db.execute('''
                                           SELECT id, name, email, hashed_password
                                           FROM users
                                           WHERE email = ?
                                           ''', user_credentials)
            
        elif ' ' in user_credentials:
            user_confirmation = db.execute('''
                                           SELECT id, name, last_name, hashed_password
                                           FROM users
                                           WHERE name = ?
                                           AND last_name = ?
                                           ''', user_credentials.split(' ')[0], user_credentials.split(' ')[1])
            
        else:
            user_confirmation = db.execute('''
                                           SELECT id, name, hashed_password
                                           FROM users
                                           WHERE name = ?
                                           ''', user_credentials)
        
        if not user_confirmation:
            flash('User non-existent or password incorrect.\nPlease try again or create an account.', 'error')
            return redirect('/menu')
        
        if not check_password_hash(user_confirmation[0]['hashed_password'], password):
            flash('User non-existent or password incorrect.\nPlease try again or create an account.', 'error')
            return redirect('/menu')
        
        if remember_me == 'checked':
            global session_permanent_state
            session_permanent_state = True
        
        session['user_id'] = user_confirmation[0]['id']
        print(f'{session["user_id"]} logged in.')

        flash(f"You have been successfuly logged in.\nWelcome {user_confirmation[0]['name']}!", 'success')
        return redirect('/')
    
    else:
        return redirect('/menu')
    
# ----------------------------------------------------------------------------------------------------------------------------------------

@app.route('/signin', methods = ['POST'])
def signin():
    if request.method == 'POST':
        name = request.form.get('name').strip()
        last_name = request.form.get('last_name').strip()
        email = request.form.get('email').strip()
        password = request.form.get('password').strip()
        confirmation = request.form.get('confirmation').strip()
        day = request.form.get('day')
        month = request.form.get('month')
        year = request.form.get('year')
        birth_date = dateForm(year, month, day)
        terms_cond_agreed = request.form.get('terms_cond_agreed')

        if (not name or not last_name or not email or not password or not confirmation or not birth_date) or (not name and not last_name and not email and not password and not confirmation and not birth_date):
            flash('Please fill out all fields.', 'error')
            return redirect('/menu')
        
        user_check = db.execute('''
                                SELECT email
                                FROM users
                                WHERE email = ?
                                ''', email)
        
        if user_check:
            flash('Email already in use.\nPlease try again.', 'error')
            return redirect('/menu')
        
        if password != confirmation:
            flash('Passwords do not match.\nPlease try again.', 'error')
            return redirect('/menu')
        
        if (time.localtime().tm_year - int(year)) < 8:
            flash('You must be at least 8 years old to create an account.', 'error')
            return redirect('/menu')
        
        if terms_cond_agreed != 'agreed':
            flash('You must agree to the terms and conditions to create an account.', 'error')
            return redirect('/menu')
        
        db.execute('''
                   INSERT INTO users (name, last_name, email, hashed_password, birth_date)
                   VALUES (?, ?, ?, ?, ?)
                   ''', name, last_name, email, generate_password_hash(password), birth_date)
        
        new_user_id = db.execute('''
                                 SELECT id
                                 FROM users
                                 WHERE email = ?
                                 ''', email)
        
        session['user_id'] = new_user_id[0]['id']
        print(session['user_id'])

        flash(f'You have been successfully registered.\nWelcome {name}!', 'success')
        return redirect('/')

    else:
        return redirect('/menu')
    
# ----------------------------------------------------------------------------------------------------------------------------------------

@app.route('/forgot_password', methods = ['GET','POST'])
def forgot_password():
    if request.method == 'GET':
        return render_template('forgot_password.html')
    
    else:
        return redirect('/menu')
    
# ----------------------------------------------------------------------------------------------------------------------------------------

@app.route('/logout')
def logout():
    
    session.clear()

    return redirect('/')

# ----------------------------------------------------------------------------------------------------------------------------------------

@app.route('/', methods = ['GET', 'POST'])
@login_required
def index():
    if request.method == 'GET':
        items = db.execute('''
                           SELECT *
                           FROM items
                           ''')
        
        return render_template('index.html', items = items)
    
    else:
        return apology('IN DEVELOPMENT', 400, 'Home')

# ----------------------------------------------------------------------------------------------------------------------------------------

@app.route('/lists', methods = ['GET', 'POST'])
@login_required
def lists():
    if request.method == 'GET':
        lists = db.execute('''
                           SELECT *
                           FROM lists
                           WHERE user_id = ?
                           ''', session['user_id'])
        
        return render_template('lists.html', lists = lists)
    
    else:
        def deleteItem(item_id):
            db.execute('''
                    DELETE FROM list_items
                    WHERE item_id = ?
                    ''', item_id)
            
            flash('Item successfully deleted.', 'success')
            return render_template('lists.html')
            

        def insertItem(item_id):
            try:
                latest_list_id = db.execute('''
                                        SELECT id
                                        FROM lists
                                        WHERE user_id = ?
                                        ORDER BY opening_date DESC
                                        LIMIT 1
                                        ''', session['user_id'])
                
                list_id = latest_list_id[0]['id']

                db.execute('''
                        INSERT INTO list_items (list_id, item_id)
                        VALUES (?, ?)
                        ''', list_id, item_id)
                
                items = db.execute('''
                                SELECT i.title
                                FROM items i
                                INNER JOIN list_items li ON i.id = li.item_id
                                WHERE li.list_id = ?
                                ''', list_id)
                
                return render_template('lists.html', items = items)
            
            except Exception as e:
                print(f'An error has ocourred\n{e}')
                return apology('An error has ocourred', 400, 'Lists')
        

# ---------------------------------------------------------------------------------------------------------------------------------------

@app.route('/profile', methods = ['GET', 'POST'])
@login_required
def profile():
    if request.method == 'GET':
        return apology('IN DEVELOPMENT', 400, 'Profile')
        # TODO
        # user_info = db.execute('''
        #                        SELECT *
        #                        FROM users
        #                        WHERE id = ?
        #                        ''', session['user_id'])
        
        # return render_template('profile.html', user_info = user_info, active_tab = 'profile')
    
    else:
        return apology('IN DEVELOPMENT', 400, 'Profile')
        # TODO

# ----------------------------------------------------------------------------------------------------------------------------------------

@app.route('/edit_profile', methods = ['GET', 'POST'])
@login_required
def edit_profile():
    # TODO
    return redirect('/profile')

# ----------------------------------------------------------------------------------------------------------------------------------------

@app.route('/closed_lists', methods = ['GET', 'POST'])
@login_required
def closed_lists():
    if request.method == 'GET':
        closed_lists = db.execute('''
                                  SELECT *
                                  FROM lists
                                  WHERE status = 'closed'
                                  ''')
        
        return render_template('closedLists.html', closed_lists = closed_lists, active_tab = 'closed_lists')
    
# ----------------------------------------------------------------------------------------------------------------------------------------

@app.route('/items', methods = ['GET', 'POST'])
@login_required
def items():
    if request.method == 'GET':
        items = db.execute('''
                           SELECT *
                           FROM items
                           ''')
        return render_template('items.html', items = items, active_tab = 'items')
    
    elif request.method == 'POST':
        if 'delete-item' in request.form:
            item_id = request.form['delete-item']
            db.execute('''
                       DELETE FROM items
                       WHERE id = ?
                       ''', item_id)
            flash('Item successfully deleted.', 'success')
            return redirect('/items')

        elif 'edit-item' in request.form:
            item_id = request.form['edit-item']
            item = db.execute('''
                             SELECT *
                             FROM items
                             WHERE id = ?
                             ''', item_id)
            return render_template('editItems.html', item = item)
        
        else:
            flash('Action could not be completed.', 'error')
            return redirect('/items')



# ----------------------------------------------------------------------------------------------------------------------------------------
    
@app.route('/addItems', methods = ['POST', 'GET'])
@login_required
def addItems():
    if request.method == 'GET':
        return render_template('addItems.html')
    
    else:
        title = request.form.get('title')
        
        db.execute('''
                   INSERT INTO items (title)
                   VALUES (?)
                   ''', title)
            
        flash('Item successfully added.', 'success')
        return redirect('/items')
            
# ----------------------------------------------------------------------------------------------------------------------------------------
    
@app.route('/editItems', methods = ['GET', 'POST'])
@login_required
def editItems(edit_item):
    if request.method == 'GET':
        return render_template('editItems.html', item = edit_item)
    
    else:
        title = request.form.get('title')
        
        db.execute('''
                   UPDATE items
                   SET title = ?
                   WHERE id = ?
                   ''', title, edit_item)
            
        flash('Item successfully edited.', 'success')
        return redirect('/items')


# ----------------------------------------------------------------------------------------------------------------------------------------

@app.route('/dashboard')
def dashboard():
    user_cookie = request.cookies.get('user')
    if user_cookie:
        user = json.loads(user_cookie)
        flash(f'Welcome back, {user["name"]}!', 'success')
        return redirect('/')
    else:
        return redirect('/')


if __name__ == '__main__':
    app.run(debug = True)