# global libraries
import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import jwt
import datetime

# environment access
def load_env(file_path="./backend/.env"):
    env_vars = {}
    try:
        with open(file_path, "r") as file:
            for line in file:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                key, value = line.split("=", 1)
                env_vars[key] = value
    except FileNotFoundError:
        print(f"Failed to load environment variables from {file_path}")

    return env_vars

# Load environment variables from the .env file
env_vars = load_env()

# Access the database configuration
db_host = env_vars.get("DB_HOST")
db_user = env_vars.get("DB_USER")
db_password = env_vars.get("DB_PASSWORD")
db_name = env_vars.get("DB_NAME")

if db_host and db_user and db_password and db_name:
    # Use these configuration values to create a database connection
    # Add the code to connect to your database here
    print(f"DB_HOST: {db_host}")
    print(f"DB_USER: {db_user}")
    print(f"DB_PASSWORD: {db_password}")
    print(f"DB_NAME: {db_name}")
else:
    print("Failed to access environment variables from .env file.")

# db connection
import mysql.connector

def connect_to_mysql():
    try:
        # Configure your database connection here
        db_config = {
            "host": db_host,
            "user": db_user,
            "password": db_password,
            "database": db_name,
            "auth_plugin":'mysql_native_password'
        }

        # Establish a database connection
        connection = mysql.connector.connect(**db_config)
        return connection
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

# Main Code
app = Flask(__name__)
CORS(app)

# Secret key for JWT encoding/decoding
app.config['SECRET_KEY'] = 'Maxe_Lanif'

# Routes
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']
    teleNum = data['teleNum']
    address = data['address']

    query = "INSERT INTO users (userName, userEmail, userPassword, userTeleNum, userAddress) VALUES (%s, %s, %s, %s, %s)"
    values = (name, email, password, teleNum, address)

    try:
        connection = connect_to_mysql()
        if connection is not None:
            cursor = connection.cursor()
            cursor.execute(query, values)
            connection.commit()
            cursor.close()
            connection.close()
            return jsonify({'message': 'Signup success', 'status': True})
        else:
            return jsonify({'message': 'Signup failed', 'status': False})
    except Exception as e:
        print(f"Error during signup: {e}")
        return jsonify({'message': 'Signup failed', 'status': False})

@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    email = data['email']
    password = data['password']

    query = "SELECT * FROM users WHERE userEmail = %s AND userPassword = %s"
    values = (email, password)

    try:
        connection = connect_to_mysql()
        if connection is not None:
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, values)
            user = cursor.fetchone()
            cursor.close()
            connection.close()

            if user:
                # Generate JWT token
                token = jwt.encode({'user': user['userEmail'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])

                # Construct the response with user details and token
                response_data = {
                    'message': 'Signin success',
                    'status': True,
                    'accessToken': token,
                    'user': {
                        'Name': user['userName'],
                        'Email': user['userEmail'],
                        'Address': user['userAddress'],
                        'Phone': user['userTeleNum']
                    }
                }
                return jsonify(response_data)
            else:
                return jsonify({'message': 'Invalid credentials', 'status': False})
        else:
            return jsonify({'message': 'Signin failed', 'status': False})
    except Exception as e:
        print(f"Error during signin: {e}")
        return jsonify({'message': 'Signin failed', 'status': False})

@app.route('/test', methods=['POST', 'GET'])
def test():
    return jsonify({'message': 'Message Submitted'})

if __name__ == '__main__':
    app.run()
