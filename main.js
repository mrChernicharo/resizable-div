import './style.css';

const app = document.querySelector('#app');
const thumb = document.querySelector('.thumb');
const resizable = document.querySelector('.resizable');
let { left, top, width, height } = resizable.getBoundingClientRect();
let isResizing = false;
let isDragging = false;

thumb.addEventListener('pointerdown', e => {
	console.log('pointerdown', e);
	isResizing = true;
	// app.style.cursor = 'row-resize';
	document.body.style.cursor = 'row-resize';
});

thumb.addEventListener('pointerout', e => {
	if (!isResizing) document.body.style.cursor = 'default';
});

thumb.addEventListener('pointerover', e => {
	document.body.style.cursor = 'row-resize';
});

document.addEventListener('pointerup', e => {
	console.log('pointerup', e);

	isResizing = false;
	document.body.style.cursor = 'default';
});

document.addEventListener('pointermove', e => {
	if (isResizing) {
		let _h = getComputedStyle(document.documentElement).getPropertyValue(
			'--h'
		);
		let currentH = parseInt(_h);
		let diff = e.clientY - top - currentH;

		document.documentElement.style.setProperty(
			'--h',
			currentH + diff + 'px'
		);
	}
});
