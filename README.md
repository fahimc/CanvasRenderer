CanvasRenderer
==============
#About
This is a library which enables canvas to have object which you can manipulate like DOM elements. The syntax is familiar as it acts like DOM elements. You set style attribute like this:

```
circle.style.width(100);
circle.styler.x(20);
```

Don't worry the library is not trying to reinvent the wheel but it creates wrappers for canvas to allow it to behave like DOM elements. The is one canvas renderer/ticker which only runs if a change has been made to a style attribute on the canvas objects.  

This library comes with several plugins/extensions in which you have the option to use and the whole library is scalable and extendible. The idea is that you build components and wrappers by extending the DisplayObject object.

A animation extension is available with this library to allow you to do easing and animate object in your canvas.

Another extension call CanvasEvents gives the canvas and displayobjects 'addEventListener' and 'removeEventListener' methods.  

##Basics

The library consists of two main components, the Canvas object and the DisplayObject.   

###Canvas
The Canvas is a wrapper for the HTML5 canvas and it stores a reference to object which have been appended to it. You can create multiple instances of the canvas wrapper.
###DisplayObject
The DisplayObject the base level object which you can extend to make your own custom components. This like the canvas can have children associated with it and contains a style method where you can set different style attributes. 


##Example Code

```
canvas = new Canvas();
canvas.build();
canvas.width(500);
canvas.height(500);
document.getElementById('canvasHolder').appendChild(canvas.element);

dp = new CanvasDisplayObject();
dp.build();
dp.style.width(20);
dp.style.height(20);
dp.style.x(20);
dp.style.y(20);
dp.style.backgroundColor('#f00');
canvas.appendChild(dp);
```
  
#API

[Canvas Renderer API](http://fahimc.github.io/CanvasRenderer/)