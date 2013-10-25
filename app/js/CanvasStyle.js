var CanvasStyle=function(){
	this.props={
	};
};
(function()
{
	var _ = CanvasStyle.prototype;
	_.parent =null;
	_.hasUpdates=false;
	_.width=function(value)
	{
		if(value!=undefined)this.updateProp('width',value);
		return this.props['width']?this.props['width'].value:0;
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
		return this.props['height']?this.props['height'].value:0;
	};
	_.radius=function(value)
	{
		if(value!=undefined)this.updateProp('radius',value);
		return this.props['radius']?this.props['radius'].value:0;
	};
	_.backgroundColor=function(value)
	{
		if(value!=undefined)this.updateProp('backgroundColor',value);
		return this.props['backgroundColor']?this.props['backgroundColor'].value:"";
	};
	_.lineWidth=function(value)
	{
		if(value!=undefined)this.updateProp('lineWidth',value);
		return this.props['lineWidth']?this.props['lineWidth'].value:" ";
	};
	_.strokeStyle=function(value)
	{
		if(value!=undefined)this.updateProp('strokeStyle',value);
		return this.props['strokeStyle']?this.props['strokeStyle'].value:" ";
	};
	_.updateProp=function(name,val)
	{
		if(!this.props[name])this.props[name]={value:val,updated:false};
		this.props[name].value = this.setVal(val,name);
		this.props[name].updated= true;
		this.hasUpdates= true;
		CanvasRenderer.render();
	};
	_.getVal=function(name,val)
	{
		if(!this.props[name])return val;
		if(!this.parent)return this.props[name].value;
		return this.parent.style[name]()+this.props[name].value;
	};
	_.setVal=function(val,name)
	{
		if(!this.parent||isNaN(val))return val;
		
		return val-this.parent.style[name]();
	};
	_.check=function()
	{
		// for(var name in this.props)
		// {
			// if(this.props[name].updated)return true;
		// }
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
