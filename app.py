from flask import Flask, request, render_template
from dotenv import load_dotenv
from os import getenv, stat
import json

load_dotenv()



# json setup

universities = {}
last_updates = {"main.json": 0}

def update_json():
	for filename, last_update in last_updates.items():
		print(filename)
		curr_update = -1
		try:
			curr_update = stat(f"json/{filename}").st_mtime
		except:
			del last_updates[filename]
			break

		if curr_update != last_update:
			last_updates[filename] = curr_update
			break
	else:
		return
	
	print("JSON updated")

	def parse_nested_json(data):
		iterating = None
		if type(data) == list:
			iterating = enumerate(data)
		elif type(data) == dict:
			iterating = data.items()
		elif type(data) == str:
			print(data)
			if data.endswith(".json"):
				try:
					with open(f"json/{data}", "r") as f:
						last_updates[data] = stat(f"json/{data}").st_mtime
						data = json.load(f)
				except:
					last_updates[data] = -1
			return data
		else:
			return data

		for key, value in iterating:
			data[key] = parse_nested_json(value)
		return data

	with open("json/main.json") as f:
		global universities
		universities = parse_nested_json(json.load(f))



# flask setup
app = Flask(__name__)

@app.route("/universities")
def jsons():
	try:
		update_json()
	except Exception as e:
		print(e)
		return "internal error", 500
	return universities

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



# starting the app
if __name__ == "__main__":
	app.run(port=getenv("PORT") or 8080, debug=True)
