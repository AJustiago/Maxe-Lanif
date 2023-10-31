# global library
import jsonify
import json
from flask import Flask, jsonify, request

# environment access
def load_env(file_path="./Maxe-Lanif/backend/.env"):
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

# Example usage
connection = connect_to_mysql()
if connection is not None:
    cursor = connection.cursor()
    # Perform database operations here
    cursor.close()
    connection.close()
else:
    print("Failed to connect to the database")
    
# Main Code    
app = Flask(__name__)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']
    password = data['password']

    return jsonify({'message': 'Sign up successful'})

@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    email = data['email']
    password = data['password']

    return jsonify({'message': 'Invalid email or password'})

if __name__ == '__main__':
    app.run()
