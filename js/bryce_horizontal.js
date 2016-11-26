//bryce_horizontal.js
// Converts a <section> delliminated javascript file into a horizontally navigatable file.

var screen_x = 0;
var dest_x = 0;
var min_x = 0;
var max_x = 0;

function horizontalize_sections()
{
	if(Math.abs(dest_x - screen_x) > .01)
	{
		requestAnimationFrame(horizontalize_sections);
	}
	
	screen_x = .9*screen_x + .1*dest_x;

	
	var header = document.querySelectorAll("header");
	header = header[0];

	var y = header.offsetHeight;
	var w = window.innerWidth;

	/*
	var y = sections[0].style.top;
	var x = sections[0].style.left;
	var x_step = window.innerWidth;
	*/

	
	var x = -screen_x;
	var x_step = w;
	var button_h = 64;

	position_buttons(0, y, w, button_h);
	y += button_h;

	var sections = document.querySelectorAll("section");
	var max_height = 0;
	for(var i = 0; i < sections.length; i++)
	{
		var s = sections[i];
		s.style.top  = y + 'px';
		s.style.left = x + 'px';
		s.style.width  = w + 'px';
		s.style.position = "absolute";
		x += x_step;

		max_height = Math.max(max_height, s.offsetHeight);
	}

	var footer = document.querySelectorAll("footer");
	footer = footer[0];

	y += max_height;
	footer.style.top = y + 'px';
	footer.style.left = 0 + 'px';
	footer.style.position = "absolute";
	footer.style.width = w + 'px';

	//$(window).trigger('resize');
}

function position_buttons(x, y, w, h)
{

	var b_left  = document.getElementById("button_left");
	var b_right = document.getElementById("button_right");
	var b_w = 128;

	var s = b_left.style;
	s.top  = y + 'px';
	s.left = x + 'px';
	s.width  = b_w + 'px';
	s.height = h + 'px';
	s.position = "absolute";
	s.zIndex="5";

	s = b_right.style;
	s.top  = y + 'px';
	s.left = x + w - b_w + 'px';
	s.width  = b_w + 'px';
	s.height = h + 'px';
	s.position = "absolute";
	s.zIndex="5";
}

function page_left()
{
	dest_x -= window.innerWidth;

	// Lower bound.
	dest_x = Math.max(min_x, dest_x);
	console.log(dest_x);

	horizontalize_sections();
}

function page_right()
{
	dest_x += window.innerWidth;

	// FIXME: Add Upper Bound.

	horizontalize_sections();
}

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
       page_left();
    }
    else if (e.keyCode == '39') {
       // right arrow
       page_right();
    }

}
document.onkeydown = checkKey;

// Do the rearranging once the page has loaded.
$(window).bind("load", function() {
	horizontalize_sections();	
});

// Perform the horizontalization after every window resize.
window.addEventListener("resize", horizontalize_sections);

//requestAnimationFrame(horizontalize_sections);