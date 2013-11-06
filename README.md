CanvasRenderer
==============

[LATEST VERSION](https://github.com/fahimc/CanvasRenderer/tree/master/build)  
[source code](https://github.com/fahimc/CanvasRenderer/tree/master/app/lib/canvas)  


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

###Structure of this Library  
![Structure](https://raw.github.com/fahimc/CanvasRenderer/master/CanvasRenderer.jpg)  

###Canvas
The Canvas is a wrapper for the HTML5 canvas and it stores a reference to object which have been appended to it. You can create multiple instances of the canvas wrapper.
###DisplayObject
The DisplayObject the base level object which you can extend to make your own custom components. This like the canvas can have children associated with it and contains a style method where you can set different style attributes. 

###Style
The style object works like the DOM stlye object, it allows you to change styling properties such as height, width, background colour, rotation and opacity etc.  
This is the heart of the library as only changes to a style will render the canvas but you can call CanvasRenderer.render() manually if required.   

##Example Code

```
//creating a canvas wrapper
canvas = new Canvas();
canvas.build();
canvas.width(500);
canvas.height(500);
document.getElementById('canvasHolder').appendChild(canvas.element);

//creating a base level display object
dp = new CanvasDisplayObject();
dp.build();
dp.style.width(20);
dp.style.height(20);
dp.style.x(20);
dp.style.y(20);
dp.style.backgroundColor('#f00');
canvas.appendChild(dp);


//create a circle
circle = new Sprite();
circle.beginFill('#A8CD1B', 0.5);
circle.drawCircle(0, 0, 40);
canvas.appendChild(circle);

//set style properties
circle.style.opacity(0.8)'
circle.style.rotate(45);


```
  
#API

[Canvas Renderer API](http://fahimc.github.io/CanvasRenderer/)

#Examples

[Bar Chart with Animation](http://8fc.co.uk/github/examples/canvasrenderer/example1.html)  
[Event Listeners](http://8fc.co.uk/github/examples/canvasrenderer/example2.html)  
[Canvas Animations](http://8fc.co.uk/github/examples/canvasrenderer/example3.html)  
[Using the Sprite Object](http://8fc.co.uk/github/examples/canvasrenderer/example4.html)  
