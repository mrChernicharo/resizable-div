import './style.css';

const app = document.querySelector('#app');
const section = document.querySelector('#section');
const thumb = document.querySelector('.thumb');
const resizable = document.querySelector('.resizable');
let { top, height } = resizable.getBoundingClientRect();
let { height: sectionHeight } = section.getBoundingClientRect();
let isResizing = false;
let isDragging = false;

resizable.addEventListener('pointerdown', e => {
	console.log('resizable:pointerdown', e);

	isDragging = true;
	document.body.style.cursor = 'move';
});

resizable.addEventListener('pointerover', e => {
	if (!isResizing && !isDragging) {
		document.body.style.cursor = 'grab';
	}
});

resizable.addEventListener('pointerout', e => {
	if (!isResizing && !isDragging) {
		document.body.style.cursor = 'default';
	}
});

thumb.addEventListener('pointerdown', e => {
	e.stopPropagation();
	console.log('thumb:pointerdown', e);

	isResizing = true;

	document.body.style.cursor = 'row-resize';
});

document.addEventListener('pointerup', e => {
	console.log('document:pointerup', e);

	isResizing = false;
	isDragging = false;
	document.body.style.cursor = 'default';
});

document.addEventListener('pointermove', e => {
	// resizing
	if (
		isResizing &&
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
