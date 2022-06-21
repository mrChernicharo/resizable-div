import './style.css';

const app = document.querySelector('#app');
const thumb = document.querySelector('.thumb');
const resizable = document.querySelector('.resizable');
let { left, top, width, height } = resizable.getBoundingClientRect();
let isResizing = false;
let isDragging = false;

let dragPos = null;

resizable.addEventListener('pointerdown', e => {
	console.log('resizable:pointerdown', e);

	isDragging = true;
	dragPos = e.clientY;
});

thumb.addEventListener('pointerdown', e => {
	e.stopPropagation();
	console.log('thumb:pointerdown', e);

	isResizing = true;

	document.body.style.cursor = 'row-resize';
});

thumb.addEventListener('pointerout', e => {
	if (!isResizing) {
		document.body.style.cursor = 'default';
	}
});

thumb.addEventListener('pointerover', e => {
	if (!isResizing) {
		document.body.style.cursor = 'grab';
	}
});

document.addEventListener('pointerup', e => {
	console.log('document:pointerup', e);

	isResizing = false;
	isDragging = false;
	dragPos = null;
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

	if (isDragging) {
		let _top = parseInt(
			getComputedStyle(document.documentElement).getPropertyValue(
				'--top-offset'
			)
		);

		// let offset = e.clientY - _top;
		let dragDiff = e.clientY - _top;

		top += dragDiff;

		console.log({ dragPos, _top, dragDiff });

		document.documentElement.style.setProperty('--top-offset', top + 'px');
	}
});

// function onResize(entries) {
// 	console.log(entries[0].contentRect);

// 	// const { } = entries[0].contentRect
// }

// const resizeObserver = new ResizeObserver(onResize);

// resizeObserver.observe(resizable);
