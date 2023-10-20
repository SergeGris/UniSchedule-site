from flask import Flask, request, render_template
from dotenv import load_dotenv
from os import getenv
import json

load_dotenv()

app = Flask(__name__)



@app.route("/universities")
def jsons():
	data = None
	try:
		with open(f"jsons/main.json") as f:
			data = json.load(f)
	except Exception as e:
		print(e)
		return "internal error", 500
	
	for uni, faculties in data.items():
		if type(faculties) == str and ".json" in faculties:
			try:
				with open(f"jsons/{faculties}", "r") as f:
					data[uni] = json.load(f)
			except Exception as e:
				print(e)
				return "internal error", 500
		else:
			for faculty, courses in faculties.items():
				if type(courses) == str and ".json" in courses:
					try:
						with open(f"jsons/{courses}", "r") as f:
							faculties[faculty] = json.load(f)
					except Exception as e:
						print(e)
						return "internal error", 500
				else:
					for course, groups in courses.items():
						if type(groups) == str and ".json" in groups:
							try:
								with open(f"jsons/{groups}", "r") as f:
									courses[course] = json.load(f)
							except Exception as e:
								print(e)
								return "internal error", 500

	return data



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
