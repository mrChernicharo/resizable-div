import './style.css';

const app = document.querySelector('#app');
const section = document.querySelector('#section');
const bottomThumb = document.querySelector('.bottom-thumb');
const topThumb = document.querySelector('.top-thumb');
const resizable = document.querySelector('.resizable');
let { top, height } = resizable.getBoundingClientRect();
let { height: sectionHeight } = section.getBoundingClientRect();
let isResizingTop = false;
let isResizingBottom = false;
let isDragging = false;

resizable.addEventListener('pointerdown', e => {
	console.log('resizable:pointerdown', e);

	isDragging = true;
	document.body.style.cursor = 'move';
});

resizable.addEventListener('pointerover', e => {
	if (!isResizingBottom && !isResizingTop && !isDragging) {
		document.body.style.cursor = 'grab';
	}
});

resizable.addEventListener('pointerout', e => {
	if (!isResizingBottom && !isResizingTop && !isDragging) {
		document.body.style.cursor = 'default';
	}
});

topThumb.addEventListener('pointerdown', e => {
	e.stopPropagation();
	console.log('topThumb:pointerdown', e);

	isResizingTop = true;

	document.body.style.cursor = 'row-resize';
});

bottomThumb.addEventListener('pointerdown', e => {
	e.stopPropagation();
	console.log('bottomThumb:pointerdown', e);

	isResizingBottom = true;

	document.body.style.cursor = 'row-resize';
});

document.addEventListener('pointerup', e => {
	console.log('document:pointerup', e);

	isResizingTop = false;
	isResizingBottom = false;
	isDragging = false;
	document.body.style.cursor = 'default';
});

document.addEventListener('pointermove', e => {
	// resizing top
	if (isResizingTop && top + e.movementY >= 0 && height - e.movementY >= 56) {
		height -= e.movementY;
		top += e.movementY;

		document.documentElement.style.setProperty('--h', height + 'px');
		document.documentElement.style.setProperty('--top-offset', top + 'px');
	}

	// resizing bottom
	if (
		isResizingBottom &&
		height + e.movementY > 40 &&
		top + height + e.movementY < sectionHeight
	) {
		height += e.movementY;

		document.documentElement.style.setProperty('--h', height + 'px');
	}

	// dragging
	if (
		isDragging &&
		top + e.movementY >= 0 &&
		top + e.movementY <= sectionHeight - height
	) {
		top += e.movementY;

		document.documentElement.style.setProperty('--top-offset', top + 'px');
	}
});
