# Intro to WebGL, GLSL and Three.js

Playing around with web graphics to see what it has to offer. Got inspired by a [Google IO talk from May 9, 2019](https://www.youtube.com/watch?v=K2JzIUIHIhc&t=555s). I know it's 2020 but better late than never. Anyways, so I ended up on Frontend masters again for help and found a great course by [Matt DesLauriers](https://frontendmasters.com/courses/webgl-shaders/) and this is pretty much that course work.

## IDEA

In my second year of undergrad, I worked on a group project that was part of a course (Computer Graphics) where we created a 2D representation of our Solar System in C++. Audacious? yes, but were we young and dumb back then, we didn't know better. At least I didn't. What we ended up creating was a pretty linear code that went through this menu and then let you land on a infinitely looping animation, without any attention to memory usage or any optimizations in general. Looking back at it now, it was a terrible project, but I did ended up learning some neat little tricks within C++ realm to achieve something that could have been done very easily with any other framework at the time.

It's 2020 now and I'm not good at 3D or 2D animations, but what i now know is little bit of JS. Perfect time for me to give a massive throw back to those golden days of carefree programming and to that horrifyingly out of scale solar system rendered in C++. This repo will look at re-creating that childhood project of mine in `canvas-sketch`.

## But First, ...

### Setup

- Installing `canvas-sketch-cli` globally `npm i canvas-sketch-cli --global`
- Now, create a `three.js` template and call it `sketch.js` like so `canvas-sketch sketch.js --new --template=three`

### Implementation

Alright, now, what and how am I gonna animate this whole thing ?
Tbh, I have no idea, I plan to change things as I go along and learn how things work.
But for now, what I'm thinking is

- create earth and moon
- add textures using some flat image of the two
- find rotation and distance, both normalized

Once I'm done with this, I'll try creating the rest of the planets/moons
Scratch that, baby steps first. I'd rather create a very basic representation close to real life in distance/rotation and then go in and add details like textures.

### Data References

- [Planetary information](https://www.windows2universe.org/our_solar_system/planets_table.html)

## Problems

- facing some issues with distance and size
- irl sizes will create problems, sun is wayyyyy big compared to most planets and distances
- gotta reach some sizing compromise

## Bibliography

- [Front End Masters Course by Matt DesLauriers](https://frontendmasters.com/courses/webgl-shaders/)
