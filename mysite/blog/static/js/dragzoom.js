﻿$(function(){function t(t,i){var e=this,s=new google.maps.OverlayView;s.onAdd=function(){e.init_(t,i)},s.draw=function(){},s.onRemove=function(){},s.setMap(t),this.prjov_=s}var i=function(t){var i;switch(t){case"thin":i="2px";break;case"medium":i="4px";break;case"thick":i="6px";break;default:i=t}return i},e=function(t){var e,s={};if(document.defaultView&&document.defaultView.getComputedStyle){if(e=t.ownerDocument.defaultView.getComputedStyle(t,""))return s.top=parseInt(e.borderTopWidth,10)||0,s.bottom=parseInt(e.borderBottomWidth,10)||0,s.left=parseInt(e.borderLeftWidth,10)||0,s.right=parseInt(e.borderRightWidth,10)||0,s}else if(document.documentElement.currentStyle&&t.currentStyle)return s.top=parseInt(i(t.currentStyle.borderTopWidth),10)||0,s.bottom=parseInt(i(t.currentStyle.borderBottomWidth),10)||0,s.left=parseInt(i(t.currentStyle.borderLeftWidth),10)||0,s.right=parseInt(i(t.currentStyle.borderRightWidth),10)||0,s;return s.top=parseInt(t.style["border-top-width"],10)||0,s.bottom=parseInt(t.style["border-bottom-width"],10)||0,s.left=parseInt(t.style["border-left-width"],10)||0,s.right=parseInt(t.style["border-right-width"],10)||0,s},s={x:0,y:0},o=function(t){s.x="undefined"!=typeof document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft,s.y="undefined"!=typeof document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop};o();var n=function(t){var i=0,e=0;return t=t||window.event,"undefined"!=typeof t.pageX?(i=t.pageX,e=t.pageY):"undefined"!=typeof t.clientX&&(i=t.clientX+s.x,e=t.clientY+s.y),{left:i,top:e}},h=function(t){for(var i=t.offsetLeft,e=t.offsetTop,s=t.offsetParent;null!==s;){s!==document.body&&s!==document.documentElement&&(i-=s.scrollLeft,e-=s.scrollTop);var o=s,n=o.offsetLeft,h=o.offsetTop;if(!n&&!h&&window.getComputedStyle){var l=document.defaultView.getComputedStyle(o,null).MozTransform||document.defaultView.getComputedStyle(o,null).WebkitTransform;if(l&&"string"==typeof l){var a=l.split(",");n+=parseInt(a[4],10)||0,h+=parseInt(a[5],10)||0}}i+=n,e+=h,s=s.offsetParent}return{left:i,top:e}},l=function(t,i){if(t&&i)for(var e in i)i.hasOwnProperty(e)&&(t[e]=i[e]);return t},a=function(t,i){"undefined"!=typeof i&&(t.style.opacity=i),"undefined"!=typeof t.style.opacity&&""!==t.style.opacity&&(t.style.filter="alpha(opacity="+100*t.style.opacity+")")};t.prototype.init_=function(t,i){var s,n=this;for(this.map_=t,i=i||{},this.key_=i.key||"shift",this.key_=this.key_.toLowerCase(),this.borderWidths_=e(this.map_.getDiv()),this.veilDiv_=[],s=0;4>s;s++)this.veilDiv_[s]=document.createElement("div"),this.veilDiv_[s].onselectstart=function(){return!1},l(this.veilDiv_[s].style,{backgroundColor:"gray",opacity:.25,cursor:"crosshair"}),l(this.veilDiv_[s].style,i.paneStyle),l(this.veilDiv_[s].style,i.veilStyle),l(this.veilDiv_[s].style,{position:"absolute",overflow:"hidden",display:"none"}),"shift"===this.key_&&(this.veilDiv_[s].style.MozUserSelect="none"),a(this.veilDiv_[s]),"transparent"===this.veilDiv_[s].style.backgroundColor&&(this.veilDiv_[s].style.backgroundColor="white",a(this.veilDiv_[s],0)),this.map_.getDiv().appendChild(this.veilDiv_[s]);this.noZoom_=i.noZoom||!1,this.visualEnabled_=i.visualEnabled||!1,this.visualClass_=i.visualClass||"",this.visualPosition_=i.visualPosition||google.maps.ControlPosition.LEFT_TOP,this.visualPositionOffset_=i.visualPositionOffset||new google.maps.Size(35,0),this.visualPositionIndex_=i.visualPositionIndex||null,this.visualSprite_=i.visualSprite||"http"+("https:"===document.location.protocol?"s":"")+"://maps.gstatic.com/mapfiles/ftr/controls/dragzoom_btn.png",this.visualSize_=i.visualSize||new google.maps.Size(20,20),this.visualTips_=i.visualTips||{},this.visualTips_.off=this.visualTips_.off||"Turn on drag zoom mode",this.visualTips_.on=this.visualTips_.on||"Turn off drag zoom mode",this.boxDiv_=document.createElement("div"),l(this.boxDiv_.style,{border:"4px solid #736AFF"}),l(this.boxDiv_.style,i.boxStyle),l(this.boxDiv_.style,{position:"absolute",display:"none"}),a(this.boxDiv_),this.map_.getDiv().appendChild(this.boxDiv_),this.boxBorderWidths_=e(this.boxDiv_),this.listeners_=[google.maps.event.addDomListener(document,"keydown",function(t){n.onKeyDown_(t)}),google.maps.event.addDomListener(document,"keyup",function(t){n.onKeyUp_(t)}),google.maps.event.addDomListener(this.veilDiv_[0],"mousedown",function(t){n.onMouseDown_(t)}),google.maps.event.addDomListener(this.veilDiv_[1],"mousedown",function(t){n.onMouseDown_(t)}),google.maps.event.addDomListener(this.veilDiv_[2],"mousedown",function(t){n.onMouseDown_(t)}),google.maps.event.addDomListener(this.veilDiv_[3],"mousedown",function(t){n.onMouseDown_(t)}),google.maps.event.addDomListener(document,"mousedown",function(t){n.onMouseDownDocument_(t)}),google.maps.event.addDomListener(document,"mousemove",function(t){n.onMouseMove_(t)}),google.maps.event.addDomListener(document,"mouseup",function(t){n.onMouseUp_(t)}),google.maps.event.addDomListener(window,"scroll",o)],this.hotKeyDown_=!1,this.mouseDown_=!1,this.dragging_=!1,this.startPt_=null,this.endPt_=null,this.mapWidth_=null,this.mapHeight_=null,this.mousePosn_=null,this.mapPosn_=null,this.visualEnabled_&&(this.buttonDiv_=this.initControl_(this.visualPositionOffset_),null!==this.visualPositionIndex_&&(this.buttonDiv_.index=this.visualPositionIndex_),this.map_.controls[this.visualPosition_].push(this.buttonDiv_),this.controlIndex_=this.map_.controls[this.visualPosition_].length-1)},t.prototype.initControl_=function(t){var i,e,s=this;return i=document.createElement("div"),i.className=this.visualClass_,i.style.position="relative",i.style.overflow="hidden",i.style.height=this.visualSize_.height+"px",i.style.width=this.visualSize_.width+"px",i.title=this.visualTips_.off,e=document.createElement("img"),e.src=this.visualSprite_,e.style.position="absolute",e.style.left=-(2*this.visualSize_.width)+"px",e.style.top="0px",i.appendChild(e),i.onclick=function(t){s.hotKeyDown_=!s.hotKeyDown_,s.hotKeyDown_?(s.buttonDiv_.firstChild.style.left=-(0*s.visualSize_.width)+"px",s.buttonDiv_.title=s.visualTips_.on,s.activatedByControl_=!0,google.maps.event.trigger(s,"activate")):(s.buttonDiv_.firstChild.style.left=-(2*s.visualSize_.width)+"px",s.buttonDiv_.title=s.visualTips_.off,google.maps.event.trigger(s,"deactivate")),s.onMouseMove_(t)},i.onmouseover=function(){s.buttonDiv_.firstChild.style.left=-(1*s.visualSize_.width)+"px"},i.onmouseout=function(){s.hotKeyDown_?(s.buttonDiv_.firstChild.style.left=-(0*s.visualSize_.width)+"px",s.buttonDiv_.title=s.visualTips_.on):(s.buttonDiv_.firstChild.style.left=-(2*s.visualSize_.width)+"px",s.buttonDiv_.title=s.visualTips_.off)},i.ondragstart=function(){return!1},l(i.style,{cursor:"pointer",marginTop:t.height+"px",marginLeft:t.width+"px"}),i},t.prototype.isHotKeyDown_=function(t){var i;if(t=t||window.event,i=t.shiftKey&&"shift"===this.key_||t.altKey&&"alt"===this.key_||t.ctrlKey&&"ctrl"===this.key_,!i)switch(t.keyCode){case 16:"shift"===this.key_&&(i=!0);break;case 17:"ctrl"===this.key_&&(i=!0);break;case 18:"alt"===this.key_&&(i=!0)}return i},t.prototype.isMouseOnMap_=function(){var t=this.mousePosn_;if(t){var i=this.mapPosn_,e=this.map_.getDiv();return t.left>i.left&&t.left<i.left+e.offsetWidth&&t.top>i.top&&t.top<i.top+e.offsetHeight}return!1},t.prototype.setVeilVisibility_=function(){var t;if(this.map_&&this.hotKeyDown_&&this.isMouseOnMap_()){var i=this.map_.getDiv();if(this.mapWidth_=i.offsetWidth-(this.borderWidths_.left+this.borderWidths_.right),this.mapHeight_=i.offsetHeight-(this.borderWidths_.top+this.borderWidths_.bottom),this.activatedByControl_){var e=parseInt(this.buttonDiv_.style.left,10)+this.visualPositionOffset_.width,s=parseInt(this.buttonDiv_.style.top,10)+this.visualPositionOffset_.height,o=this.visualSize_.width,n=this.visualSize_.height;for(this.veilDiv_[0].style.top="0px",this.veilDiv_[0].style.left="0px",this.veilDiv_[0].style.width=e+"px",this.veilDiv_[0].style.height=this.mapHeight_+"px",this.veilDiv_[1].style.top="0px",this.veilDiv_[1].style.left=e+o+"px",this.veilDiv_[1].style.width=this.mapWidth_-(e+o)+"px",this.veilDiv_[1].style.height=this.mapHeight_+"px",this.veilDiv_[2].style.top="0px",this.veilDiv_[2].style.left=e+"px",this.veilDiv_[2].style.width=o+"px",this.veilDiv_[2].style.height=s+"px",this.veilDiv_[3].style.top=s+n+"px",this.veilDiv_[3].style.left=e+"px",this.veilDiv_[3].style.width=o+"px",this.veilDiv_[3].style.height=this.mapHeight_-(s+n)+"px",t=0;t<this.veilDiv_.length;t++)this.veilDiv_[t].style.display="block"}else{for(this.veilDiv_[0].style.left="0px",this.veilDiv_[0].style.top="0px",this.veilDiv_[0].style.width=this.mapWidth_+"px",this.veilDiv_[0].style.height=this.mapHeight_+"px",t=1;t<this.veilDiv_.length;t++)this.veilDiv_[t].style.width="0px",this.veilDiv_[t].style.height="0px";for(t=0;t<this.veilDiv_.length;t++)this.veilDiv_[t].style.display="block"}}else for(t=0;t<this.veilDiv_.length;t++)this.veilDiv_[t].style.display="none"},t.prototype.onKeyDown_=function(t){this.map_&&!this.hotKeyDown_&&this.isHotKeyDown_(t)&&(this.mapPosn_=h(this.map_.getDiv()),this.hotKeyDown_=!0,this.activatedByControl_=!1,this.setVeilVisibility_(),google.maps.event.trigger(this,"activate"))},t.prototype.getMousePoint_=function(t){var i=n(t),e=new google.maps.Point;return e.x=i.left-this.mapPosn_.left-this.borderWidths_.left,e.y=i.top-this.mapPosn_.top-this.borderWidths_.top,e.x=Math.min(e.x,this.mapWidth_),e.y=Math.min(e.y,this.mapHeight_),e.x=Math.max(e.x,0),e.y=Math.max(e.y,0),e},t.prototype.onMouseDown_=function(t){if(this.map_&&this.hotKeyDown_){this.mapPosn_=h(this.map_.getDiv()),this.dragging_=!0,this.startPt_=this.endPt_=this.getMousePoint_(t),this.boxDiv_.style.width=this.boxDiv_.style.height="0px";var i=this.prjov_.getProjection(),e=i.fromContainerPixelToLatLng(this.startPt_);google.maps.event.trigger(this,"dragstart",e)}},t.prototype.onMouseDownDocument_=function(t){this.mouseDown_=!0},t.prototype.onMouseMove_=function(t){if(this.mousePosn_=n(t),this.dragging_){this.endPt_=this.getMousePoint_(t);var i=Math.min(this.startPt_.x,this.endPt_.x),e=Math.min(this.startPt_.y,this.endPt_.y),s=Math.abs(this.startPt_.x-this.endPt_.x),o=Math.abs(this.startPt_.y-this.endPt_.y),l=Math.max(0,s-(this.boxBorderWidths_.left+this.boxBorderWidths_.right)),a=Math.max(0,o-(this.boxBorderWidths_.top+this.boxBorderWidths_.bottom));this.veilDiv_[0].style.top="0px",this.veilDiv_[0].style.left="0px",this.veilDiv_[0].style.width=i+"px",this.veilDiv_[0].style.height=this.mapHeight_+"px",this.veilDiv_[1].style.top="0px",this.veilDiv_[1].style.left=i+s+"px",this.veilDiv_[1].style.width=this.mapWidth_-(i+s)+"px",this.veilDiv_[1].style.height=this.mapHeight_+"px",this.veilDiv_[2].style.top="0px",this.veilDiv_[2].style.left=i+"px",this.veilDiv_[2].style.width=s+"px",this.veilDiv_[2].style.height=e+"px",this.veilDiv_[3].style.top=e+o+"px",this.veilDiv_[3].style.left=i+"px",this.veilDiv_[3].style.width=s+"px",this.veilDiv_[3].style.height=this.mapHeight_-(e+o)+"px",this.boxDiv_.style.top=e+"px",this.boxDiv_.style.left=i+"px",this.boxDiv_.style.width=l+"px",this.boxDiv_.style.height=a+"px",this.boxDiv_.style.display="block",google.maps.event.trigger(this,"drag",new google.maps.Point(i,e+o),new google.maps.Point(i+s,e),this.prjov_.getProjection())}else this.mouseDown_||(this.mapPosn_=h(this.map_.getDiv()),this.setVeilVisibility_())},t.prototype.onMouseUp_=function(t){var i,e=this;if(this.mouseDown_=!1,this.dragging_){if(this.getMousePoint_(t).x===this.startPt_.x&&this.getMousePoint_(t).y===this.startPt_.y)return void this.onKeyUp_(t);var s=Math.min(this.startPt_.x,this.endPt_.x),o=Math.min(this.startPt_.y,this.endPt_.y),n=Math.abs(this.startPt_.x-this.endPt_.x),h=Math.abs(this.startPt_.y-this.endPt_.y),l=!0;l&&(s+=this.borderWidths_.left,o+=this.borderWidths_.top);var a=this.prjov_.getProjection(),r=a.fromContainerPixelToLatLng(new google.maps.Point(s,o+h)),_=a.fromContainerPixelToLatLng(new google.maps.Point(s+n,o)),p=new google.maps.LatLngBounds(r,_);if(this.noZoom_)this.boxDiv_.style.display="none";else{i=this.map_.getZoom(),this.map_.fitBounds(p),this.map_.getZoom()<i&&this.map_.setZoom(i);var v=a.fromLatLngToContainerPixel(r),d=a.fromLatLngToContainerPixel(_);l&&(v.x-=this.borderWidths_.left,v.y-=this.borderWidths_.top,d.x-=this.borderWidths_.left,d.y-=this.borderWidths_.top),this.boxDiv_.style.left=v.x+"px",this.boxDiv_.style.top=d.y+"px",this.boxDiv_.style.width=Math.abs(d.x-v.x)-(this.boxBorderWidths_.left+this.boxBorderWidths_.right)+"px",this.boxDiv_.style.height=Math.abs(d.y-v.y)-(this.boxBorderWidths_.top+this.boxBorderWidths_.bottom)+"px",setTimeout(function(){e.boxDiv_.style.display="none"},1e3)}this.dragging_=!1,this.onMouseMove_(t),google.maps.event.trigger(this,"dragend",p),this.isHotKeyDown_(t)||this.onKeyUp_(t)}},t.prototype.onKeyUp_=function(t){var i,e,s,o,n,h,l,a,r=null;if(this.map_&&this.hotKeyDown_){for(this.hotKeyDown_=!1,this.dragging_&&(this.boxDiv_.style.display="none",this.dragging_=!1,e=Math.min(this.startPt_.x,this.endPt_.x),s=Math.min(this.startPt_.y,this.endPt_.y),o=Math.abs(this.startPt_.x-this.endPt_.x),n=Math.abs(this.startPt_.y-this.endPt_.y),h=this.prjov_.getProjection(),l=h.fromContainerPixelToLatLng(new google.maps.Point(e,s+n)),a=h.fromContainerPixelToLatLng(new google.maps.Point(e+o,s)),r=new google.maps.LatLngBounds(l,a)),i=0;i<this.veilDiv_.length;i++)this.veilDiv_[i].style.display="none";this.visualEnabled_&&(this.buttonDiv_.firstChild.style.left=-(2*this.visualSize_.width)+"px",this.buttonDiv_.title=this.visualTips_.off,this.buttonDiv_.style.display=""),google.maps.event.trigger(this,"deactivate",r)}},google.maps.Map.prototype.enableKeyDragZoom=function(i){this.dragZoom_=new t(this,i)},google.maps.Map.prototype.disableKeyDragZoom=function(){var t,i=this.dragZoom_;if(i){for(t=0;t<i.listeners_.length;++t)google.maps.event.removeListener(i.listeners_[t]);for(this.getDiv().removeChild(i.boxDiv_),t=0;t<i.veilDiv_.length;t++)this.getDiv().removeChild(i.veilDiv_[t]);i.visualEnabled_&&this.controls[i.visualPosition_].removeAt(i.controlIndex_),i.prjov_.setMap(null),this.dragZoom_=null}},google.maps.Map.prototype.keyDragZoomEnabled=function(){return null!==this.dragZoom_},google.maps.Map.prototype.getDragZoomObject=function(){return this.dragZoom_}});