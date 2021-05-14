const addAttr = document.querySelector('.addAttr');
const removeAttr = document.querySelector('.removeAttr');

function addAttrFunc() {
	let newAttr = document.querySelector('#newAttr #new');
	let oldAttr = document.querySelector('#oldAttr');
	let clonedAttr = newAttr.cloneNode(true);
	oldAttr.appendChild(clonedAttr);
}

function removeAttrFunc(attr) {
	attr.parentElement.remove();
}
