let universities = {};
let word_map = {};
let elements = [];

let removeOptions = (index) => {
	let el = elements[index];
	if (!el) return;
	while (el.children.length > 1) el.removeChild(el.lastChild);

	el.value = "";
};

let modifyOptions = (index, values) => {
	removeOptions(index);

	let el = elements[index];
	for (let value of values) {
		let option = document.createElement("option");
		option.value = value;
		option.innerText = word_map[value] || value;
		el.appendChild(option);
	}
};

let openDay = (event, name) => {
	let i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them.
	tabcontent = document.getElementsByClassName("tabcontent");

	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");

	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].classList.remove("active");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(name).style.display = "block";
	event.currentTarget.classList.add("active");
};

let getDay = () => {
	const d = new Date();
	// getDay returns 0 for Sunday, but we are russian, so we number weekdays starting from Monday.
	let r = d.getDay() - 1;

	if (r < 0) r += 7;

	return r;
};

let openSuitableDay = () => {
	const day = getDay();

	if (document.getElementById(day) === null) {
		document.getElementById(0).click();
	} else {
		document.getElementById(day).click();
	}
};

window.onload = () => {
	let uni_req = new Request("/universities");
	let map_req = new Request("/map");
	fetch(uni_req)
		.then((response) => response.json())
		.then((data) => {
			universities = data;
			if (word_map) modifyOptions(0, Object.keys(universities));
		});
	fetch(map_req)
		.then((response) => response.json())
		.then((data) => {
			word_map = data;

			if (universities) modifyOptions(0, Object.keys(universities));
		});

	elements = [
		document.getElementById("uni-select"),
		document.getElementById("faculty-select"),
		document.getElementById("course-select"),
		document.getElementById("group-select"),
		document.getElementById("search-button"),
	];

	for (let i = 0; i < elements.length; i++) {
		let el = elements[i];
		el.disabled = true;
		el.value = "";

		el.addEventListener("change", () => {
			if (el.value == "") {
				for (let j = i + 1; j < elements.length - 1; j++)
					removeOptions(j);
			} else {
				elements[i + 1].disabled = false;

				if (i + 1 < elements.length - 1) {
					let options = universities;
					for (let j = 0; j <= i; j++)
						options = options[elements[j].value];
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
};
