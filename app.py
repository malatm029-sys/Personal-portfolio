from flask import Flask, render_template, request
import mysql.connector

import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

db = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)

@app.route("/")
def home():
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM projects")
    projects = cursor.fetchall()

    cursor.close()

    print(projects)

    return render_template("index.html", projects=projects)

@app.route("/contact", methods=["POST"])
def contact():
    name = request.form["name"]
    email = request.form["email"]
    message = request.form["message"]

    cursor = db.cursor()

    cursor.execute(
        "INSERT INTO contact_messages (name, email, message) VALUES (%s, %s, %s)",
        (name, email, message)
    )

    db.commit()
    cursor.close()

    return """
    <script>
        alert("Message sent successfully!");
        window.location.href = "/";
    </script>
    """


if __name__ == "__main__":
   app.run(host="0.0.0.0", port=5000, debug=True)