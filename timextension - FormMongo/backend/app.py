from flask import Flask, request, jsonify
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["joke"]  # Database name
collection = db["joking"]  # Collection name

@app.route("/save_user", methods=["POST"])
def save_user():
    data = request.json
    if not data.get("email") or not data.get("phone"):
        return jsonify({"error": "Email and phone are required"}), 400

    # Insert into MongoDB
    collection.insert_one({
        "email": data["email"],
        "phone": data["phone"]
    })
    return jsonify({"message": "User data saved successfully"}), 200

if __name__ == "__main__":
    app.run(debug=True)
