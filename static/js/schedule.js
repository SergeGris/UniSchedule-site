let selectedDay = null;

let showTab = (show) => {
	if (show) openSuitableDay();
	else showAllDays();
};

let showAllDays = () => {
	document.getElementById("days-tab").style.display = "none";

	for (let i = 0; i < 7; i++) {
		let day = document.getElementById(`day-${i}-container`);
		if (day) day.style.display = "block";
	}
};

let openDay = (event) => {
	document.getElementById("days-tab").style.display = "flex";

	// Get all elements with class="day" and hide them.
	let days = document.getElementsByClassName("day");

	for (let i = 0; i < days.length; i++) {
		days[i].style.display = "none";
	}

	// Get all elements with class="tab-button" and remove the class "active"
	let tabButtons = document.getElementsByClassName("tab-button");

	for (let i = 0; i < tabButtons.length; i++)
		tabButtons[i].classList.remove("active");

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(
		`${event.currentTarget.id}-container`
	).style.display = "block";
	event.currentTarget.classList.add("active");

	selectedDay = event.currentTarget.dataset.day;
};

let getDay = () => {
	const d = new Date();
	// getDay returns 0 for Sunday, but we are russian, so we number weekdays starting from Monday.
	let r = d.getDay() - 1;

	if (r < 0) r += 7;

	return r;
};

let openSuitableDay = () => {
	const day = selectedDay || getDay();

	let dayButton =
		document.getElementById(`day-${day}`) ??
		document.getElementById("day-0");
	dayButton.click();
};

window.onload = window.onresize = () => {
	showTab(window.innerWidth < 800);
};
