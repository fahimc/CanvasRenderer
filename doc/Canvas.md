<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>JSDoc: Class: Canvas</title>

    <script src="scripts/prettify/prettify.js"> </script>
    <script src="scripts/prettify/lang-css.js"> </script>
    <!--[if lt IE 9]>
      <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link type="text/css" rel="stylesheet" href="styles/prettify-tomorrow.css">
    <link type="text/css" rel="stylesheet" href="styles/jsdoc-default.css">
</head>

<body>

<div id="main">

# Class: Canvas

<section>

<header>

## 
    Canvas

</header>  

<article>
    <div class="container-overview">

<dt>

#### <span class="type-signature"></span>new Canvas<span class="signature">()</span><span class="type-signature"></span>

</dt>
<dd>

<dl class="details">

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [Canvas.js](Canvas.js.html), [line 4](Canvas.js.html#line4)</dd>

</dl>

</dd>

    </div>

### Methods

        <dl>

<dt>

#### <span class="type-signature">&lt;static> </span>addEventListener<span class="signature">(eventName, callback)</span><span class="type-signature"></span>

</dt>
<dd>

    <div class="description">
        add Event listeners to the canvas object
    </div>

##### Parameters:

<table class="params">
    <thead>
	<tr>

		<th>Name</th>

		<th>Type</th>

		<th class="last">Description</th>
	</tr>
	</thead>

	<tbody>

        <tr>

                <td class="name">`eventName`</td>

            <td class="type">

<span class="param-type">String</span>

            </td>

            <td class="description last">the name of the event</td>
        </tr>

        <tr>

                <td class="name">`callback`</td>

            <td class="type">

<span class="param-type">Function</span>

            </td>

            <td class="description last">the callback function</td>
        </tr>

	</tbody>
</table>

<dl class="details">

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [CanvasEvents.js](CanvasEvents.js.html), [line 53](CanvasEvents.js.html#line53)</dd>

</dl>

</dd>

<dt>

#### <span class="type-signature">&lt;static> </span>appendChild<span class="signature">(displayObject)</span><span class="type-signature"></span>

</dt>
<dd>

    <div class="description">
        adds an object to the canvas
    </div>

##### Parameters:

<table class="params">
    <thead>
	<tr>

		<th>Name</th>

		<th>Type</th>

		<th class="last">Description</th>
	</tr>
	</thead>

	<tbody>

        <tr>

                <td class="name">`displayObject`</td>

            <td class="type">

<span class="param-type">[CanvasDisplayObject](CanvasDisplayObject.html)</span>

            </td>

            <td class="description last">provide a displayobject</td>
        </tr>

	</tbody>
</table>

<dl class="details">

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [Canvas.js](Canvas.js.html), [line 84](Canvas.js.html#line84)</dd>

</dl>

</dd>

<dt>

#### <span class="type-signature">&lt;static> </span>build<span class="signature">()</span><span class="type-signature"></span>

</dt>
<dd>

    <div class="description">
        build the Canvas
    </div>

<dl class="details">

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [Canvas.js](Canvas.js.html), [line 18](Canvas.js.html#line18)</dd>

</dl>

</dd>

<dt>

#### <span class="type-signature">&lt;static> </span>getChildByUID<span class="signature">(uid)</span><span class="type-signature"> &rarr; {[CanvasDisplayObject](CanvasDisplayObject.html)}</span>

</dt>
<dd>

    <div class="description">
        returns a child element by its uid
    </div>

##### Parameters:

<table class="params">
    <thead>
	<tr>

		<th>Name</th>

		<th>Type</th>

		<th class="last">Description</th>
	</tr>
	</thead>

	<tbody>

        <tr>

                <td class="name">`uid`</td>

            <td class="type">

<span class="param-type">number</span>

            </td>

            <td class="description last">this is the uid of an object</td>
        </tr>

	</tbody>
</table>

<dl class="details">

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [Canvas.js](Canvas.js.html), [line 69](Canvas.js.html#line69)</dd>

</dl>

##### Returns:

<dl>
	<dt>
		Type
	</dt>
	<dd>

<span class="param-type">[CanvasDisplayObject](CanvasDisplayObject.html)</span>

	</dd>
</dl>

</dd>

<dt>

#### <span class="type-signature">&lt;static> </span>getContext<span class="signature">(value)</span><span class="type-signature"> &rarr; {Context}</span>

</dt>
<dd>

    <div class="description">
        returns the context of the canvas
    </div>

##### Parameters:

<table class="params">
    <thead>
	<tr>

		<th>Name</th>

		<th>Type</th>

		<th class="last">Description</th>
	</tr>
	</thead>

	<tbody>

        <tr>

                <td class="name">`value`</td>

            <td class="type">

<span class="param-type">string</span>

            </td>

            <td class="description last">'2d' or '3d'</td>
        </tr>

	</tbody>
</table>

<dl class="details">

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [Canvas.js](Canvas.js.html), [line 58](Canvas.js.html#line58)</dd>

</dl>

##### Returns:

<dl>
	<dt>
		Type
	</dt>
	<dd>

<span class="param-type">Context</span>

	</dd>
</dl>

</dd>

<dt>

#### <span class="type-signature">&lt;static> </span>height<span class="signature">(value)</span><span class="type-signature"> &rarr; {Number}</span>

</dt>
<dd>

    <div class="description">
        set the height of the canvas
    </div>

##### Parameters:

<table class="params">
    <thead>
	<tr>

		<th>Name</th>

		<th>Type</th>

		<th class="last">Description</th>
	</tr>
	</thead>

	<tbody>

        <tr>

                <td class="name">`value`</td>

            <td class="type">

<span class="param-type">number</span>

            </td>

            <td class="description last">height</td>
        </tr>

	</tbody>
</table>

<dl class="details">

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [Canvas.js](Canvas.js.html), [line 45](Canvas.js.html#line45)</dd>

</dl>

##### Returns:

<dl>
	<dt>
		Type
	</dt>
	<dd>

<span class="param-type">Number</span>

	</dd>
</dl>

</dd>

<dt>

#### <span class="type-signature">&lt;static> </span>removeChild<span class="signature">(displayObject)</span><span class="type-signature"></span>

</dt>
<dd>

    <div class="description">
        removes an object to the canvas
    </div>

##### Parameters:

<table class="params">
    <thead>
	<tr>

		<th>Name</th>

		<th>Type</th>

		<th class="last">Description</th>
	</tr>
	</thead>

	<tbody>

        <tr>

                <td class="name">`displayObject`</td>

            <td class="type">

<span class="param-type">[CanvasDisplayObject](CanvasDisplayObject.html)</span>

            </td>

            <td class="description last">provide a displayobject</td>
        </tr>

	</tbody>
</table>

<dl class="details">

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [Canvas.js](Canvas.js.html), [line 97](Canvas.js.html#line97)</dd>

</dl>

</dd>

<dt>

#### <span class="type-signature">&lt;static> </span>removeEventListener<span class="signature">(eventName, callback)</span><span class="type-signature"></span>

</dt>
<dd>

    <div class="description">
        remove Event listeners to the canvas object
    </div>

##### Parameters:

<table class="params">
    <thead>
	<tr>

		<th>Name</th>

		<th>Type</th>

		<th class="last">Description</th>
	</tr>
	</thead>

	<tbody>

        <tr>

                <td class="name">`eventName`</td>

            <td class="type">

<span class="param-type">String</span>

            </td>

            <td class="description last">the name of the event</td>
        </tr>

        <tr>

                <td class="name">`callback`</td>

            <td class="type">

<span class="param-type">Function</span>

            </td>

            <td class="description last">the callback function</td>
        </tr>

	</tbody>
</table>

<dl class="details">

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [CanvasEvents.js](CanvasEvents.js.html), [line 82](CanvasEvents.js.html#line82)</dd>

</dl>

</dd>

<dt>

#### <span class="type-signature">&lt;static> </span>width<span class="signature">(value)</span><span class="type-signature"> &rarr; {Number}</span>

</dt>
<dd>

    <div class="description">
        set the width of the canvas
    </div>

##### Parameters:

<table class="params">
    <thead>
	<tr>

		<th>Name</th>

		<th>Type</th>

		<th class="last">Description</th>
	</tr>
	</thead>

	<tbody>

        <tr>

                <td class="name">`value`</td>

            <td class="type">

<span class="param-type">number</span>

            </td>

            <td class="description last">width</td>
        </tr>

	</tbody>
</table>

<dl class="details">

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [Canvas.js](Canvas.js.html), [line 32](Canvas.js.html#line32)</dd>

</dl>

##### Returns:

<dl>
	<dt>
		Type
	</dt>
	<dd>

<span class="param-type">Number</span>

	</dd>
</dl>

</dd>

        </dl>

</article>

</section>  

</div>

<nav>

## [Index](index.html)

### Classes

*   [Canvas](Canvas.html)
*   [CanvasDisplayObject](CanvasDisplayObject.html)
*   [CanvasImage](CanvasImage.html)
*   [CanvasStyle](CanvasStyle.html)
*   [Sprite](Sprite.html)
*   [TextField](TextField.html)

### Namespaces

*   [CanvasRenderer](CanvasRenderer.html)
*   [CanvasTween](CanvasTween.html)
</nav>

<footer>
    Documentation generated by [JSDoc 3.2.0](https://github.com/jsdoc3/jsdoc) on Sun Oct 27 2013 12:26:52 GMT-0000 (GMT)
</footer>

<script> prettyPrint(); </script>
<script src="scripts/linenumber.js"> </script>
</body>
</html>