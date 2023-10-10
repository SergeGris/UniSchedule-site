from flask import Flask, render_template, send_from_directory
from dotenv import load_dotenv
from os import getenv
import json

load_dotenv()

app = Flask(__name__)



@app.route("/")
def index():
	return render_template("index.html")



if __name__ == "__main__":
	app.run(port=getenv("PORT") or 8080, debug=True)
