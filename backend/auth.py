# global library
import jsonify
import json
from flask import Flask, jsonify, request
from flask_cors import CORS

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
            "database": db_name
        }

        # Establish a database connection
        connection = mysql.connector.connect(**db_config)
        return connection
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

# # Example usage
connection = connect_to_mysql()
# if connection is not None:
#     cursor = connection.cursor()
#     # Perform database operations here
#     cursor.close()
#     connection.close()
# else:
#     print("Failed to connect to the database")

# Main Code
app = Flask(__name__)
CORS(app)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']
    teleNum = data['teleNum']
    address = data['address']

    query = "INSERT INTO users (name, email, password, phoneNumber, address) VALUES (%s, %s, %s, %s, %s)"
    values = (name, email, password, teleNum, address)

    try:
        cursor = connection.cursor()
        cursor.execute(query, values)
        connection.commit()
        cursor.close()
        return jsonify({'message': 'Signup success', 'status': True})
    except Exception as e:
        print(f"Error during signup: {e}")
        return jsonify({'message': 'Signup failed', 'status': False})

@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    email = data['email']
    password = data['password']

    query = "SELECT * FROM users WHERE email = %s AND password = %s"
    values = (email, password)

    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query, values)
        user = cursor.fetchone()
        cursor.close()

        if user:
            # Construct the response with user details
            response_data = {
                'message': 'Signin success',
                'status': True,
                'accessToken': 'your_access_token',
                'user': {
                    'Name': user['name'],
                    'Email': user['email'],
                    'Address': user['address'],
                    'Phone': user['teleNum']
                }
            }
            return jsonify(response_data)
        else:
            return jsonify({'message': 'Invalid credentials', 'status': False})
    except Exception as e:
        print(f"Error during signin: {e}")
        return jsonify({'message': 'Signin failed', 'status': False})

@app.route('/test', methods=['POST', 'GET'])
def test():
    return jsonify({'message': 'Message Submitted'})

if __name__ == '__main__':
    app.run()
