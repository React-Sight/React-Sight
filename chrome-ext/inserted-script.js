// This is included and executed in the inspected page
function inserted() {
	console.log('External script attached');
	var event = new Event('attached');
	window.dispatchEvent(event);
}
inserted();
