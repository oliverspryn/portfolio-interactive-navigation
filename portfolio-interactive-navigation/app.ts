/// <reference path="Types/Navigation.ts" />

window.onload = () => {
// calculate the number of circles, based on screen size
	var pixels: number = window.innerHeight * window.innerWidth;
	var pixelsPerCircle: number = 30000;

// draw the circles
	var n: Navigation = new Navigation("navigation", Math.round(pixels / pixelsPerCircle));
	n.go();
};