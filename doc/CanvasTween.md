<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>JSDoc: Namespace: CanvasTween</title>

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

# Namespace: CanvasTween

<section>

<header>

## 
    CanvasTween

</header>  

<article>
    <div class="container-overview">

<dl class="details">

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [CanvasTween.js](CanvasTween.js.html), [line 1](CanvasTween.js.html#line1)</dd>

</dl>

    </div>

### Members

        <dl>

<dt>

#### <span class="type-signature">&lt;static> </span>ease<span class="type-signature"></span>

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

                <td class="name">`ease`</td>

            <td class="type">

<span class="param-type">Object</span>

            </td>

            <td class="description last">types of eases available

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

                <td class="name">`easeIn`</td>

            <td class="type">

<span class="param-type">String</span>

            </td>

            <td class="description last">defines an ease in</td>
        </tr>

        <tr>

                <td class="name">`easeOut`</td>

            <td class="type">

<span class="param-type">String</span>

            </td>

            <td class="description last">defines an ease out</td>
        </tr>

        <tr>

                <td class="name">`strongEaseOut`</td>

            <td class="type">

<span class="param-type">String</span>

            </td>

            <td class="description last">defines an strong ease out</td>
        </tr>

        <tr>

                <td class="name">`easeBack`</td>

            <td class="type">

<span class="param-type">String</span>

            </td>

            <td class="description last">defines an ease back</td>
        </tr>

	</tbody>
</table>
            </td>
        </tr>

	</tbody>
</table></dl>

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [CanvasTween.js](CanvasTween.js.html), [line 16](CanvasTween.js.html#line16)</dd>

</dl>

</dd>

        </dl>

### Methods

        <dl>

<dt>

#### <span class="type-signature">&lt;static> </span>to<span class="signature">(obj, duration, options)</span><span class="type-signature"></span>

</dt>
<dd>

    <div class="description">
        animate a canvas object
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

                <td class="name">`obj`</td>

            <td class="type">

<span class="param-type">[CanvasDisplayObject](CanvasDisplayObject.html)</span>

            </td>

            <td class="description last">provide a CanvasDisplayObject</td>
        </tr>

        <tr>

                <td class="name">`duration`</td>

            <td class="type">

<span class="param-type">Number</span>

            </td>

            <td class="description last">provide a duration from 0 to 1</td>
        </tr>

        <tr>

                <td class="name">`options`</td>

            <td class="type">

<span class="param-type">Object</span>

            </td>

            <td class="description last">provide style attributes and other attributes</td>
        </tr>

	</tbody>
</table>

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

                <td class="name">`options.onComplete`</td>

            <td class="type">

<span class="param-type">Function</span>

            </td>

            <td class="description last">provide a callback</td>
        </tr>

        <tr>

                <td class="name">`options.delay`</td>

            <td class="type">

<span class="param-type">Number</span>

            </td>

            <td class="description last">provide a delay from 0 to 1</td>
        </tr>

        <tr>

                <td class="name">`options.ease`</td>

            <td class="type">

<span class="param-type">String</span>

            </td>

            <td class="description last">provide an ease. Check CanvasTween.ease object for types that are available;</td>
        </tr>

	</tbody>
</table></dl>

    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">

*   [CanvasTween.js](CanvasTween.js.html), [line 34](CanvasTween.js.html#line34)</dd>

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