from flask import Flask, request, render_template, send_from_directory
from dotenv import load_dotenv
from os import getenv
import json

load_dotenv()

app = Flask(__name__)



@app.route("/")
def index():
	return render_template("index.html")

@app.route("/schedule")
def schedule():
	university = request.args.get("university")
	faculty = request.args.get("faculty")
	course = request.args.get("course")
	group = request.args.get("group")

	if university is None:
		return "University not specified", 400
	if faculty is None:
		return "Faculty not specified", 400
	if course is None:
		return "Course not specified", 400
	if group is None:
		return "Group not specified", 400

	return render_template(
		"schedule.html",
		university=university,
		faculty=faculty,
		course=course,
		group=group
	)



if __name__ == "__main__":
	app.run(port=getenv("PORT") or 8080, debug=True)
