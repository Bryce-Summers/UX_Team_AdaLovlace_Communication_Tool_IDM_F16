//bryce_horizontal.js
// Converts a <section> delliminated javascript file into a horizontally navigatable file.

var screen_x = 0;

// These are indices.
var dest_x = 0;
var min_x = 0;
var max_x = 4;

var increment_width = 1;


// Find Mouse Position.
var cursorX;
var cursorY;
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}

function horizontalize_sections()
{
	if(Math.abs(dest_x - screen_x) > .01)
	{
		requestAnimationFrame(horizontalize_sections);
	}
	
	/*
	var header = document.querySelectorAll("header");
	header = header[0];

	var y = header.offsetHeight;
	var w = window.innerWidth;
	*/

	var nav_bar = document.querySelectorAll("nav");
	nav_bar = nav_bar[0];

	var y = nav_bar.offsetHeight;
	var w = window.innerWidth;

	screen_x = .9*screen_x + .1*(dest_x*w);


	// Position Slider.
	position_slider(w/2, y, 649, 150);
	y += 150;

	/*
	var y = sections[0].style.top;
	var x = sections[0].style.left;
	var x_step = window.innerWidth;
	*/

	
	var x = -screen_x;
	var x_step = w;
	var button_h = 30;

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


	position_buttons(0, window.innerHeight/2, w, button_h);


	// Now Position the footer.
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

	// Hide the button if we are at the left most section.
	if(dest_x === min_x)
	{
		s.visibility = "hidden";
	}
	else
	{
		s.visibility="visible"
	}

	s = b_right.style;
	s.top  = y + 'px';
	s.left = x + w - b_w + 'px';
	s.width  = b_w + 'px';
	s.height = h + 'px';
	s.position = "absolute";
	s.zIndex="5";

	// Hide the button if we are at the right most section.
	if(dest_x === max_x)
	{
		s.visibility = "hidden";
	}
	else
	{
		s.visibility="visible"
	}
}

function position_slider(x_middle, y_top, width, height)
{
	var s_low  = document.getElementById("slider_low");
	var s_high = document.getElementById("slider_high");
	var s_w = 649;
	var s_h = height;

	// Show the low light if the screen is at rest.
	// Show the high light if the screen is transitioning.
	if(Math.abs((screen_x*1.0 / window.innerWidth) - dest_x) < .01)
	{
		s_low.style.visibility  = "visible";
		s_high.style.visibility = "hidden";
	}
	else
	{
		s_low.style.visibility  = "hidden";
		s_high.style.visibility = "visible";
	}


	var arr = [s_low, s_high];

	for(var i = 0; i < arr.length; i++)
	{
		s = arr[i].style;
		s.top  = y_top + 'px';
		s.left = x_middle - s_w/2 + 'px';
		s.width  = s_w + 'px';
		s.height = s_h + 'px';
		s.position = "absolute";
		s.zIndex="1";
	}

	// Position the Slider Knob.
	var slider_knob = document.getElementById("slider_knob");
	s = slider_knob.style;

	// They length of each slider increment on screen.
	increment_width = width/5;

	var knob_h = slider_knob.offsetHeight;
	s.top = y_top + height/2 - knob_h/2 + 'px';
	s.left = x_middle - increment_width*2 + increment_width*screen_x/window.innerWidth - knob_h/3 + 'px';
	s.position = "absolute";
	s.zIndex="2";
}

function slider_click()
{
	console.log("slider click");

 	var slider = document.getElementById("slider_low");

 	var x = slider.style.left;
 	var y = slider.style.top;

 	x = parseInt(x, 10);// Parse a base 10 integer from a pixel string.
 	y = parseInt(y, 10);// Parse a base 10 integer from a pixel string.
 	
 	var target_index = Math.floor((cursorX - x)/increment_width);

 	dest_x = target_index;
 	console.log(dest_x);
 	bound_dest();

	horizontalize_sections(); 	
}

// Naviagate the to previous page.
function page_left()
{
	dest_x -= 1;
	bound_dest();

	horizontalize_sections();
}

function page_right()
{
	dest_x += 1;
	bound_dest();

	horizontalize_sections();
}

function bound_dest()
{
	// Lower bound.
	dest_x = Math.max(min_x, dest_x);
	// Upper bound.
	dest_x = Math.min(max_x, dest_x);
}

// Go to Specific Pages.

var INDEX_PROTOTYPE  = 0;
var INDEX_COMPONENTS = 1;
var INDEX_RESEARCH   = 2;
var INDEX_ABOUT      = 3;
var INDEX_CONTACT    = 4;

function page_prototype()
{
	dest_x = INDEX_PROTOTYPE;
	horizontalize_sections();
}

function page_components()
{
	dest_x = INDEX_COMPONENTS;
	horizontalize_sections();
}

function page_research()
{
	dest_x = INDEX_RESEARCH;
	horizontalize_sections();
}

function page_about()
{
	dest_x = INDEX_ABOUT;
	horizontalize_sections();
}

function page_contact()
{
	dest_x = INDEX_CONTACT;
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