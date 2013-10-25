var CanvasStyle=function(){
	this.parent =null;
	this.hasUpdates=false;
	this.props={
	};
};
(function()
{
	var _ = CanvasStyle.prototype;
	
	_.width=function(value)
	{
		if(value!=undefined)this.updateProp('width',value);

		return this.props['width']!=undefined?(this.scaleX() * this.props['width'].value):0;
	};
	_.x=function(value)
	{
		if(value!=undefined)this.updateProp('x',value);
		return this.getVal('x',0);
	};
	_.y=function(value)
	{
		if(value!=undefined)this.updateProp('y',value);
		return this.getVal('y',0);
	};
	_.height=function(value)
	{
		if(value!=undefined)this.updateProp('height',value);
		return this.props['height']!=undefined?(this.scaleX() * this.props['height'].value):0;
	};
	_.scaleX=function(value)
	{
		if(value!=undefined)this.updateProp('scaleX',value);
		return this.getNested('scaleX',1);
	};
	_.scaleY=function(value)
	{
		if(value!=undefined)this.updateProp('scaleY',value);
		return this.getNested('scaleY',1);
	};
	_.radius=function(value)
	{
		if(value!=undefined)this.updateProp('radius',value);
		return this.props['radius']!=undefined?(this.scaleX() * this.props['radius'].value):0;
	};
	_.opacity=function(value)
	{
		if(value!=undefined)this.updateProp('opacity',value);
		return this.getNested('opacity',1);
	};
	_.backgroundColor=function(value)
	{
		if(value!=undefined)this.updateProp('backgroundColor',value);
		return this.props['backgroundColor']!=undefined?this.props['backgroundColor'].value:"";
	};
	_.font=function(value)
	{
		if(value!=undefined)this.updateProp('font',value);
		return this.props['font']!=undefined?this.props['font'].value:"40px san-serif";
	};
	_.textBaseline =function(value)
	{
		if(value!=undefined)this.updateProp('textBaseline',value);
		return this.props['textBaseline']!=undefined?this.props['textBaseline'].value:"top";
	};
	_.lineWidth=function(value)
	{
		if(value!=undefined)this.updateProp('lineWidth',value);
		return this.props['lineWidth']!=undefined?this.props['lineWidth'].value:" ";
	};
	_.strokeStyle=function(value)
	{
		if(value!=undefined)this.updateProp('strokeStyle',value);
		return this.props['strokeStyle']!=undefined?this.props['strokeStyle'].value:" ";
	};
	_.updateProp=function(name,val)
	{
		
		if(!this.props[name])this.props[name]={value:val,updated:false};
		this.props[name].value = val;
		this.props[name].updated= true;
		this.hasUpdates= true;
		CanvasRenderer.render();
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
