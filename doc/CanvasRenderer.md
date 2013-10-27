<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>JSDoc: Namespace: CanvasRenderer</title>

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

# Namespace: CanvasRenderer

<section>

<header>

## 
    CanvasRenderer

</header>  

<article>
    <div class="container-overview">

<dl class="details">

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [CanvasRenderer.js](CanvasRenderer.js.html), [line 1](CanvasRenderer.js.html#line1)</dd>

</dl>

    </div>

### Members

        <dl>

<dt>

#### <span class="type-signature">&lt;static> </span>frameRate<span class="type-signature"></span>

</dt>
<dd>

<dl class="details">

##### Properties:

        <dl>

<table class="props">
    <thead>
	<tr>

		<th>Name</th>

		<th>Type</th>

		<th class="last">Description</th>
	</tr>
	</thead>

	<tbody>

        <tr>

                <td class="name">`frameRate`</td>

            <td class="type">

<span class="param-type">Number</span>

            </td>

            <td class="description last">this sets the framerate</td>
        </tr>

	</tbody>
</table></dl>

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [CanvasRenderer.js](CanvasRenderer.js.html), [line 19](CanvasRenderer.js.html#line19)</dd>

</dl>

</dd>

<dt>

#### <span class="type-signature">&lt;static> </span>types<span class="type-signature"></span>

</dt>
<dd>

<dl class="details">

##### Properties:

        <dl>

<table class="props">
    <thead>
	<tr>

		<th>Name</th>

		<th>Type</th>

		<th class="last">Description</th>
	</tr>
	</thead>

	<tbody>

        <tr>

                <td class="name">`types`</td>

            <td class="type">

<span class="param-type">Object</span>

            </td>

            <td class="description last">types of elements

###### Properties

<table class="props">
    <thead>
	<tr>

		<th>Name</th>

		<th>Type</th>

		<th class="last">Description</th>
	</tr>
	</thead>

	<tbody>

        <tr>

                <td class="name">`RECT`</td>

            <td class="type">

<span class="param-type">String</span>

            </td>

            <td class="description last">defines a RECT display object</td>
        </tr>

        <tr>

                <td class="name">`CIRCLE`</td>

            <td class="type">

<span class="param-type">String</span>

            </td>

            <td class="description last">defines a CIRCLE display object</td>
        </tr>

        <tr>

                <td class="name">`TEXT`</td>

            <td class="type">

<span class="param-type">String</span>

            </td>

            <td class="description last">defines a TEXT display object</td>
        </tr>

        <tr>

                <td class="name">`IMAGE`</td>

            <td class="type">

<span class="param-type">String</span>

            </td>

            <td class="description last">defines a IMAGE display object</td>
        </tr>

	</tbody>
</table>
            </td>
        </tr>

	</tbody>
</table></dl>

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [CanvasRenderer.js](CanvasRenderer.js.html), [line 12](CanvasRenderer.js.html#line12)</dd>

</dl>

</dd>

        </dl>

### Methods

        <dl>

<dt>

#### <span class="type-signature">&lt;static> </span>getCanvasByUID<span class="signature">()</span><span class="type-signature"> &rarr; {[Canvas](Canvas.html)}</span>

</dt>
<dd>

    <div class="description">
        get a canvas wrapper by its uid
    </div>

<dl class="details">

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [CanvasRenderer.js](CanvasRenderer.js.html), [line 114](CanvasRenderer.js.html#line114)</dd>

</dl>

##### Returns:

<dl>
	<dt>
		Type
	</dt>
	<dd>

<span class="param-type">[Canvas](Canvas.html)</span>

	</dd>
</dl>

</dd>

<dt>

#### <span class="type-signature">&lt;static> </span>getDisplayByUID<span class="signature">()</span><span class="type-signature"> &rarr; {[CanvasDisplayObject](CanvasDisplayObject.html)}</span>

</dt>
<dd>

    <div class="description">
        get an object by its uid
    </div>

<dl class="details">

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [CanvasRenderer.js](CanvasRenderer.js.html), [line 98](CanvasRenderer.js.html#line98)</dd>

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

#### <span class="type-signature">&lt;static> </span>render<span class="signature">()</span><span class="type-signature"></span>

</dt>
<dd>

    <div class="description">
        This will render the canvas
    </div>

<dl class="details">

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [CanvasRenderer.js](CanvasRenderer.js.html), [line 32](CanvasRenderer.js.html#line32)</dd>

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
    Documentation generated by [JSDoc 3.2.0](https://github.com/jsdoc3/jsdoc) on Sun Oct 27 2013 12:26:53 GMT-0000 (GMT)
</footer>

<script> prettyPrint(); </script>
<script src="scripts/linenumber.js"> </script>
</body>
</html>