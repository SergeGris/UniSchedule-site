let universities = {};

let uni_req = new Request("/static/universities.json")
fetch(uni_req)
	.then((response) => response.json())
	.then((data) => {
		universities = data;
	});
