let universities = {};
let elements = [];

let removeOptions = (index) => {

	let el = elements[index];
	while (el.children.length > 1)
		el.removeChild(el.lastChild);

	el.value = "";

}

let modifyOptions = (index, values) => {
	
	removeOptions(index);
	
	let el = elements[index];
	for (let value of values) {
		let option = document.createElement("option");
		option.innerText = value;
		option.value = value;
		el.appendChild(option);
	}

}

window.onload = () => {

	let uni_req = new Request("/static/universities.json")
	fetch(uni_req)
		.then((response) => response.json())
		.then((data) => {

			universities = data;
			modifyOptions(0, Object.keys(universities));
			
		});
	
	elements = [
		document.getElementById("uni-select"),
		document.getElementById("faculty-select"),
		document.getElementById("course-select"),
		document.getElementById("group-select"),
		document.getElementById("search-button")
	];

	for(let i = 0; i < elements.length; i++) {
		
		let el = elements[i];
		el.disabled = true;
		el.value = "";

		el.addEventListener("change", () => {

			if (el.value == "") {
				for (let j = i + 1; j < elements.length - 1; j++) removeOptions(j);
			} else {
				elements[i + 1].disabled = false;

				if (i + 1 < elements.length - 1) {

					let options = universities;
					for(let j = 0; j <= i; j++) options = options[elements[j].value];
					if (!Array.isArray(options)) options = Object.keys(options);

					modifyOptions(i + 1, options);

				}

				for (let j = i + 2; j < elements.length; j++) {
					elements[j].disabled = true;
					if (j < elements.length - 1) removeOptions(j);
				}
			}

		});

	}
	elements[0].disabled = false;

}