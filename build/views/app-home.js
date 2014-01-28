// if (c) {

define(["jquery","underscore","backbone","config/config","models/tile","modules/grid","modules/double-spring","modules/box","modules/grid-dom","modules/trackpad","modules/loader-screen","match_media","bootstrap_transition","bootstrap_collapse"],function(e,t,n,r,i,s,o,u,a,f,l,c){var h,p=n.View.extend({initialize:function(){h=this,app_compatible=!Modernizr.canvas||!c.mobile();if(app_compatible){this.load(),r.mouse;var e=window.innerWidth||document.documentElement.clientWidth,t=window.innerHeight||document.documentElement.clientHeight;r.mouse.x=e/2,r.mouse.y=t/2}},load:function(){loaderScreen=new l,loaderScreen.onComplete=this.kickOff,h.onResize(),e(window).resize(h.onResize)},kickOff:function(){loaded=!0,holding=!1;var t=window.innerWidth||document.documentElement.clientWidth,n=window.innerHeight||document.documentElement.clientHeight;app_compatible&&(canvas=document.getElementById("nbn"),canvas.width=t,canvas.height=n*.87,context=canvas.getContext("2d"),canvas.style.left="0px",canvas.style.display="none",e(canvas).fadeIn("slow"),e(canvas).mousedown(h.onMouseDown),e(canvas).mouseup(h.onMouseUp),e(canvas).mousemove(h.onMouseMove),e(canvas).mouseout(h.onMouseOut),e(canvas).bind("touchstart",h.onTouchStart),e(canvas).bind("touchend",h.onTouchEnd),e(canvas).bind("touchmove",h.onTouchMove),grid=new s(t,n),grid.canvasOffset=n*.08,trackpad=new f(canvas)),grid.onTransitionFinished=function(){loaderScreen.destroy(),document.body.removeChild(loaderScreen.view)},h.browseMode=!1,h.pauseGridRender=!1,h.onResize(),h.resizeCount=9,trackpad.lock(),trackpad.setPosition(t/2,n/2),grid.onStartComplete=h.onGridStartComplete,requestAnimFrame(h.update)},onGridStartComplete:function(){h.browseMode=!0,setTimeout(h.unlock,1e3)},unlock:function(){trackpad.unlock()},update:function(){r.isMobile||h.resizeCount++,h.resizeCount==10&&h.realResize(),loaded&&h.browseMode&&trackpad.update(),r.track&&(r.track.x=trackpad.value,r.track.y=trackpad.valueY),(h.pauseGridRender||app_compatible)&&grid.render(context),requestAnimFrame(h.update)},realResize:function(){console.log("REAL RESIZE");var t=window.innerWidth||document.documentElement.clientWidth,n=window.innerHeight||document.documentElement.clientHeight;if(window.grid){if(app_compatible||window.canvas)canvas.width=t,canvas.height=n*.87,grid.canvasOffset=n*.08;grid.resize(t,n);var i={x:500,y:500};if(r.isMobile){i.x=t,i.y=n,window.usingForm?t>2*n?e(overlay).fadeIn():e(overlay).fadeOut():t>n?e(overlay).fadeIn():e(overlay).fadeOut();var s=i.x/2,o=i.y/2;h.pauseGridRender&&(app_compatible&&(grid.render(context),viewer.render(context)),t!=this.cacheW&&n!=this.cacheH&&window.scrollTo(0,0),this.cacheW=t,this.cacheH=n,console.log("RESIZING"))}}},onSwapPressed:function(){window.location.hash="",h.pauseGridRender=!1,viewer.swap()},onViewerHidden:function(){trackpad.unlock(),grid.unlock(),h.browseMode=!0},onResize:function(){h.resizeCount=0;var e=window.innerWidth||document.documentElement.clientWidth,t=window.innerHeight||document.documentElement.clientHeight;this.w=e,this.h=t,window.tabMenu&&tabMenu.resize(e,t),loaderScreen&&loaderScreen.resize(e,t),window.tickerTape&&(tickerTape.view.style.left=e/2-304+"px")},onMouseDown:function(e){e.preventDefault(),r.downAt.x=r.mouse.x,r.downAt.y=r.mouse.y,r.mouse.button=!0,r.mouse.dragDistance=0},onMouseUp:function(e){e.preventDefault(),r.mouse.button=!1,r.mouse.dragDistance<15&&grid.sentClick()},onMouseOut:function(e){e.preventDefault(),r.mouse.button=!1},onTouchStart:function(e){e.preventDefault(),r.mouse.x=e.originalEvent.touches[0].clientX+document.body.scrollLeft,r.mouse.y=e.originalEvent.touches[0].clientY+document.body.scrollTop,downAt.x=r.mouse.x,downAt.y=r.mouse.y,r.mouse.button=!0,r.mouse.dragDistance=0},onTouchEnd:function(e){},onTouchMove:function(e){e.preventDefault(),r.mouse.x=e.originalEvent.touches[0].clientX+document.body.scrollLeft,r.mouse.y=e.originalEvent.touches[0].clientY+document.body.scrollTop},onMouseMove:function(e){var t=e.clientX+document.body.scrollLeft,n=e.clientY+document.body.scrollTop,i=r.mouse.x-t,s=r.mouse.y-n;r.mouse.dragDistance+=Math.sqrt(i*i+s*s),r.mouse.dragDistance>1e4&&(r.mouse.dragDistance=1e4),r.mouse.x=t,r.mouse.y=n}});return p});