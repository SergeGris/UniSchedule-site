from flask import Flask, render_template, send_from_directory
from dotenv import load_dotenv
from os import getenv
import json

load_dotenv()

app = Flask(__name__)



def fail(message):
	print("\033[91m" + message + "\033[0m")
	exit(0)

universities = None
try:
	with open("./universities.json", encoding="utf-8") as f:
		universities = json.load(f)
except Exception as e:
	fail(str(e))

@app.route("/")
def index():
	return render_template("index.html", universities=universities)



if __name__ == "__main__":
	app.run(port=getenv("PORT") or 8080, debug=True)
