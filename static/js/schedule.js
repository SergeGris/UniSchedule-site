let selectedWeekDay = null;

let showTabs = (show) => {
	if (show) openSuitableWeekDay();
	else showAllWeekDays();
};

let showAllWeekDays = () => {
	document.getElementById("days-tab").style.display = "none";

	for (let day of document.getElementsByClassName("day"))
		day.style.display = "block";
};

let openWeekDay = (event) => {
	document.getElementById("days-tab").style.display = "flex";

	// Get all elements with class="day" and hide them.
	let days = document.getElementsByClassName("day");

	for (let i = 0; i < days.length; i++) {
		days[i].style.display = "none";
	}

	// Get all elements with class="tab-button" and remove the class "active"
	for (let tabButton of document.getElementsByClassName("tab-button"))
		tabButton.classList.remove("active");

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(
		`${event.currentTarget.id}-container`
	).style.display = "block";
	event.currentTarget.classList.add("active");
	selectedDay = event.currentTarget.dataset.day;
};

// Returns 0..6 for Monday..Sunday.
let getWeekDay = () => {
	const d = new Date();
	// Date.getDay returns 0 for Sunday, but we are russian,
	// so we number weekdays starting from Monday.
	let r = d.getDay() - 1;

	if (r < 0) r += 7;

	return r;
};

let openSuitableWeekDay = () => {
	const day = selectedWeekDay || getWeekDay();

	let dayButton =
		document.getElementById(`day-${day}`) ??
		document.getElementById("day-0");
	dayButton.click();
};

window.onload = window.onresize = () => {
	showTabs(window.innerWidth < 800);
};
