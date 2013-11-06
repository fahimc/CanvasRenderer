/**
 * @constructor
 */
var CanvasStyle=function(){
	this.parent =null;
	this.hasUpdates=false;
	this.props={
	};
};
(function()
{
	var _ = CanvasStyle.prototype;
	/**
	 set the width
	 @public
	 @alias width
	 @memberOf CanvasStyle
	  @param {number} value width
	  @param {boolean} noUpdate (optional) set true if you dont want to render the change
	 @returns {Number}
	 */
	_.width=function(value,noUpdate)
	{
		if(value!=undefined)this.updateProp('width',value,noUpdate);

		return this.props['width']!=undefined?(this.scaleX() * this.props['width'].value):0;
	};
	/**
	 set the x position
	 @public
	 @alias x
	 @memberOf CanvasStyle
	  @param {Number} value x
	    @param {boolean} noUpdate (optional) set true if you dont want to render the change
	 @returns {Number}
	 */
	_.x=function(value,noUpdate)
	{
		if(value!=undefined)this.updateProp('x',value,noUpdate);
		return this.getVal('x',0);
	};
	/**
	 set the y position
	 @public
	 @alias y
	 @memberOf CanvasStyle
	  @param {Number} value y 
	    @param {boolean} noUpdate (optional) set true if you dont want to render the change
	 @returns {Number}
	 */
	_.y=function(value,noUpdate)
	{
		if(value!=undefined)this.updateProp('y',value,noUpdate);
		return this.getVal('y',0);
	};
	/**
	 set the height
	 @public
	 @alias height
	 @memberOf CanvasStyle
	  @param {Number} value height
	    @param {boolean} noUpdate (optional) set true if you dont want to render the change
	 @returns {Number}
	 */
	_.height=function(value,noUpdate)
	{
		if(value!=undefined)this.updateProp('height',value,noUpdate);
		return this.props['height']!=undefined?((this.type==CanvasRenderer.types.CIRCLE?this.scaleX():this.scaleY()) * this.props['height'].value):0;
	};
	/**
	 set the scaleX
	 @public
	 @alias scaleX
	 @memberOf CanvasStyle
	  @param {Number} value from 0 to 1
	 @returns {Number}
	 */
	_.scaleX=function(value)
	{
		if(value!=undefined)this.updateProp('scaleX',value);
		return this.getNested('scaleX',1);
	};
	/**
	 set the scaleY
	 @public
	 @alias scaleY
	 @memberOf CanvasStyle
	  @param {Number} value from 0 to 1
	 @returns {Number}
	 */
	_.scaleY=function(value)
	{
		if(value!=undefined)this.updateProp('scaleY',value);
		return this.getNested('scaleY',1);
	};
	/**
	 set the radius
	 @public
	 @alias radius
	 @memberOf CanvasStyle
	  @param {Number} value the radius of a circle
	 @returns {Number}
	 */
	_.radius=function(value)
	{
		if(value!=undefined)this.updateProp('radius',value);
		return this.props['radius']!=undefined?(this.scaleX() * this.props['radius'].value):0;
	};
	/**
	 set the opacity
	 @public
	 @alias opacity
	 @memberOf CanvasStyle
	  @param {Number} value from 0 to 1
	 @returns {Number}
	 */
	_.opacity=function(value)
	{
		if(value!=undefined)this.updateProp('opacity',value);
		return this.getNested('opacity',1);
	};
	/**
	 set the rotate
	 @public
	 @alias rotate
	 @memberOf CanvasStyle
	  @param {Number} value from 0 to 360
	 @returns {Number}
	 */
	_.rotate=function(value)
	{
		if(value!=undefined)this.updateProp('rotate',value);
		return this.props['rotate']!=undefined?(this.props['rotate'].value):null;
	};
	/**
	 set the backgroundColor
	 @public
	 @alias backgroundColor
	 @memberOf CanvasStyle
	  @param {String} value hex colour
	 @returns {String}
	 */
	_.backgroundColor=function(value)
	{
		if(value!=undefined)this.updateProp('backgroundColor',value);
		return this.props['backgroundColor']!=undefined?this.props['backgroundColor'].value:"";
	};
	/**
	 set the backgroundGradient. The positions are relative to the x and y of the object not the canvas.
	 @public
	 @alias backgroundGradient
	 @memberOf CanvasStyle
	  @param {String} type type of gradient 'linear' or 'radial'
	  @param {Array} positions An Array of 4 gradient points, x0,y0,x1,y1 for linear or 6 points for radial. Check w3schools.
	 @returns {Array} colorStops An Array of colorStops which are also arrays of two items opacity (0 to 1) amd colour.
	 */
	_.backgroundGradient=function(type,positions,colorStops)
	{
		if(positions!=undefined)this.updateProp('backgroundGradient',{type:type,positions:positions,colorStops:colorStops});
		return this.props['backgroundGradient']!=undefined?this.props['backgroundGradient'].value:null;
	};
	/**
	 set the font
	 @public
	 @alias font
	 @memberOf CanvasStyle
	  @param {String} value string containing font family and size etc.. 
	 @returns {String}
	 */
	_.font=function(value)
	{
		if(value!=undefined)this.updateProp('font',value);
		return this.props['font']!=undefined?this.props['font'].value:"40px san-serif";
	};
	/**
	 set the textBaseline
	 @public
	 @alias textBaseline
	 @memberOf CanvasStyle
	  @param {String} value top,middle and bottom etc..
	 @returns {String}
	 */
	_.textBaseline =function(value)
	{
		if(value!=undefined)this.updateProp('textBaseline',value);
		return this.props['textBaseline']!=undefined?this.props['textBaseline'].value:"top";
	};
	/**
	 set the textAlign
	 @public
	 @alias textAlign
	 @memberOf CanvasStyle
	  @param {String} value start etc..
	 @returns {String}
	 */
	_.textAlign =function(value)
	{
		if(value!=undefined)this.updateProp('textAlign',value);
		return this.props['textAlign']!=undefined?this.props['textAlign'].value:"start";
	};
	/**
	 set the lineWidth
	 @public
	 @alias lineWidth
	 @memberOf CanvasStyle
	  @param {Number} value provide the size
	 @returns {Number}
	 */
	_.lineWidth=function(value)
	{
		if(value!=undefined)this.updateProp('lineWidth',value);
		return this.props['lineWidth']!=undefined?this.props['lineWidth'].value:"";
	};
	/**
	 set the strokeStyle
	 @public
	 @alias String
	 @memberOf CanvasStyle
	  @param {String} value hex colour
	 @returns {String}
	 */
	_.strokeStyle=function(value)
	{
		if(value!=undefined)this.updateProp('strokeStyle',value);
		return this.props['strokeStyle']!=undefined?this.props['strokeStyle'].value:"";
	};
	_.updateProp=function(name,val,noUpdate)
	{
		
		if(!this.props[name])this.props[name]={value:val,updated:false};
		this.props[name].value = val;
		this.props[name].updated= true;
		this.hasUpdates= true;
		if(!noUpdate)CanvasRenderer.render();
	};
	_.getVal=function(name,val)
	{
		if(this.props[name]==undefined)return val;
		if(!this.parent)return this.props[name].value;
		return this.parent.style[name]()+this.props[name].value;
	};
	_.getNested=function(name,val)
	{
		if(!this.parent)return this.props[name]?this.props[name].value:val;
		if(this.props[name]==undefined)return this.parent.style[name]()* val;
		return this.parent.style[name]()<1?(this.parent.style[name]()*this.props[name].value):(this.props[name].value<0?0:this.props[name].value);
	};
	_.setVal=function(val,name)
	{
		if(!this.parent||isNaN(val))return val;
		
		return val-this.parent.style[name]();
	};
	_.check=function()
	{

		return this.hasUpdates;
	};
	_.updated=function()
	{
		for(var name in this.props)
		{
			this.props[name].updated=false;
		}
	};
})();
