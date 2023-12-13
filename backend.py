from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import date, datetime

app = Flask(__name__)
CORS(app)

user_data = []

@app.route('/register', methods=['POST'])
def register_user():
    try:
        new_user = request.get_json()
        new_user["role"] = "M"

        # Convert birthdate string to datetime object
        birthdate_str = new_user['birthdate']
        birthdate_dt = datetime.strptime(birthdate_str, "%Y-%m-%d")
        birthDatenew = birthdate_dt.strftime("%d %B %Y")

        new_user['birthDate'] = birthDatenew
        new_user.pop('birthdate',None) 
        today_date = date.today()
        formatted_date = today_date.strftime("%d %B %Y")
        new_user["DOJ"] = formatted_date
        new_user["membership"] = "-"
        with open('src/assets/JSON/user-data.json', 'r') as f:
            data = json.load(f)
            data['data'].append(new_user)
        with open('src/assets/JSON/user-data.json', 'w') as f:
            json.dump(data, f, indent=2)
        return jsonify({"message": "User added successfully"}), 200
    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 500
    
@app.route('/addEmergency', methods=['POST'])
def add_emergency():
    try:
        new_user = request.get_json()

        with open('src/assets/JSON/user-emergency-contact.json', 'r') as f:
            data = json.load(f)
            data['data'].append(new_user)
        with open('src/assets/JSON/user-emergency-contact.json', 'w') as f:
            json.dump(data, f, indent=2)
        return jsonify({"message": "User added successfully"}), 200
    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 500

@app.route('/updateMembership', methods=['POST'])
def update_membership():
    try:
        new_data = request.get_json()
        with open('src/assets/JSON/user-data.json', 'r') as f:
            data = json.load(f)
        
        email_to_update = new_data.get('email')
        new_membership_value = new_data.get('value')
        today_date = date.today()
        formatted_date = today_date.strftime("%d %B %Y")
        
        new_membershipJoin = formatted_date
        # Check if email exists in the data
        user_found = False
        for user in data.get('data', []):
            if user.get('email') == email_to_update:
                user['membership'] = new_membership_value
                user['membershipJoin'] = new_membershipJoin
                user_found = True
                break

        # If user with the provided email is not found
        if not user_found:
            return jsonify({"error": f"User with email {email_to_update} not found"}), 404

        # Write the updated data back to the file
        with open('src/assets/JSON/user-data.json', 'w') as f:
            json.dump(data, f, indent=2)

        return jsonify({"message": "Membership updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/profileUpdate', methods=['POST'])
def update_profile():
    try:
        new_data = request.get_json()
        with open('src/assets/JSON/user-data.json', 'r') as f:
            data = json.load(f)
        
        email_to_update = new_data.get('email')
        new_value = new_data.get('formData')
        birth_date_str = new_value['birthDate']
        birth_date_dt = datetime.strptime(birth_date_str, "%d %B %Y")
        birthDatenew = birth_date_dt.strftime("%d %B %Y")
                
        # Check if email exists in the data
        user_found = False
        for user in data.get('data', []):
            if user.get('email') == email_to_update:
                user['name'] = new_value['name']
                user['birthDate'] = birthDatenew
                user['gender'] = new_value['gender']
                user['address'] = new_value['address']
                user['telephone'] = new_value['telephone']
                user_found = True
                break

        # If user with the provided email is not found
        if not user_found:
            return jsonify({"error": f"User with email {email_to_update} not found"}), 404

        # Write the updated data back to the file
        with open('src/assets/JSON/user-data.json', 'w') as f:
            json.dump(data, f, indent=2)

        return jsonify({"message": "Profile updated successfully"}), 200
    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 500
    
@app.route('/familyUpdate', methods=['POST'])
def update_family():
    try:
        new_data = request.get_json()
        with open('src/assets/JSON/user-emergency-contact.json', 'r') as f:
            data = json.load(f)
        
        email_to_update = new_data.get('email')
        new_value = new_data.get('formData')

        # Check if email exists in the data
        user_found = False
        for user in data.get('data', []):
            if user.get('email') == email_to_update:
                user['familyName'] = new_value['familyName']
                user['familyRelationship'] = new_value['familyRelationship']
                user['familyPhone'] = new_value['familyPhone'] 
                user_found = True
                break

        # If user with the provided email is not found
        if not user_found:
            return jsonify({"error": f"User with email {email_to_update} not found"}), 404

        # Write the updated data back to the file
        with open('src/assets/JSON/user-emergency-contact.json', 'w') as f:
            json.dump(data, f, indent=2)

        return jsonify({"message": "Family updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/emergencyUpdate', methods=['POST'])
def update_emergency():
    try:
        new_data = request.get_json()
        print(new_data)
        with open('src/assets/JSON/user-emergency-contact.json', 'r') as f:
            data = json.load(f)
        
        email_to_update = new_data.get('email')
        new_value = new_data.get('formData')
        print(new_value)
        # Check if email exists in the data
        user_found = False
        for user in data.get('data', []):
            if user.get('email') == email_to_update:
                user['primaryName'] = new_value['primaryName']
                user['primaryRelationship'] = new_value['primaryRelationship']
                user['primaryPhone'] = new_value['primaryPhone']
                user['secondaryName'] = new_value['secondaryName']
                user['secondaryRelationship'] = new_value['secondaryRelationship']
                user['secondaryPhone'] = new_value['secondaryPhone']
                user_found = True
                break

        # If user with the provided email is not found
        if not user_found:
            return jsonify({"error": f"User with email {email_to_update} not found"}), 404

        # Write the updated data back to the file
        with open('src/assets/JSON/user-emergency-contact.json', 'w') as f:
            json.dump(data, f, indent=2)

        return jsonify({"message": "Emergency Contact updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5399)

