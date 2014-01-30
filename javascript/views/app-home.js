/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'config/config',
    'modules/grid',
    'collections/tiles',
    'collections/tiles-data',
    'modules/double-spring',
    'modules/box',
    'modules/grid-dom',
    'modules/trackpad',
    'modules/loader-screen',
    'match_media',
    'bootstrap_transition',    
    'bootstrap_collapse'
], function ($, _, Backbone, Config, Grid, TileCollection, TileData, DoubleSpring, Box, GridDom, Trackpad, LoaderScreen, MatchMedia) {

    var _self;

    var AppView = Backbone.View.extend({

        initialize : function () {
            _self = this;
            app_compatible = !Modernizr.canvas || !MatchMedia.mobile();
            
            if (app_compatible) {

                $.when(TileCollection.fetch())
                    .done(function () {
                        TileData.content = TileCollection.toJSON();
                        _self.load();
                    }
                );

                Config.mouse;
                var d = window.innerWidth || document.documentElement.clientWidth,
                    e = window.innerHeight || document.documentElement.clientHeight;
                Config.mouse.x = d / 2, Config.mouse.y = e / 2;           
            }
        },

        load : function () {
            loaderScreen = new LoaderScreen;
            loaderScreen.onComplete = this.kickOff;
            // document.body.appendChild(loaderScreen.view);
            _self.onResize();
            $(window).resize(_self.onResize);
        },

        kickOff : function() {
            loaded = true;
            holding = false;
            var a = window.innerWidth || document.documentElement.clientWidth,
                b = window.innerHeight || document.documentElement.clientHeight;
            
            if(app_compatible) {
                canvas = document.getElementById("nbn"); 
                canvas.width = a; 
                canvas.height = b*0.87; //100%-8%-5% 
                context = canvas.getContext("2d");
                // canvas.style.position = "absolute";
                // canvas.style.top = "8%";
                canvas.style.left = "0px"; 
                // document.body.appendChild(canvas);
                canvas.style.display = "none"; 
                $(canvas).fadeIn("slow"); 
                $(canvas).mousedown(_self.onMouseDown);
                $(canvas).mouseup(_self.onMouseUp);
                $(canvas).mousemove(_self.onMouseMove);
                $(canvas).mouseout(_self.onMouseOut);
                $(canvas).bind("touchstart", _self.onTouchStart);
                $(canvas).bind("touchend", _self.onTouchEnd);
                $(canvas).bind("touchmove", _self.onTouchMove);
                grid = new Grid(a, b);
                grid.canvasOffset = b*0.08; //8%
                trackpad = new Trackpad(canvas);
            } else {
                // grid = new GridDom(a, b);
                // $(grid.domView).mousedown(onMouseDown);
                // $(grid.domView).mouseup(onMouseUp);
                // $(grid.domView).mousemove(onMouseMove);
                // trackpad = new Trackpad(grid.domView); 
                // for(var i=0;i<model.content.length;i++){
                //     model.content[i].lines = grid.splitText(model.content[i].)
                // }
            };

            grid.onTransitionFinished = function () {
                loaderScreen.destroy();
                document.body.removeChild(loaderScreen.view);
            };

            _self.browseMode = false;
            _self.pauseGridRender = false;
            _self.onResize();
            _self.resizeCount = 9;
            trackpad.lock();
            
            trackpad.setPosition(a / 2, b / 2);
            grid.onStartComplete = _self.onGridStartComplete;
            requestAnimFrame(_self.update);
        },

        onGridStartComplete :  function () {
            _self.browseMode = true, setTimeout(_self.unlock, 1000);
        },

        unlock : function () {
            //holding = false;
            trackpad.unlock();
        },

        update : function () {
            //console.log(Config.isMobile);
            Config.isMobile || _self.resizeCount++;
           _self.resizeCount ==10 && _self.realResize(); 
            if(loaded && _self.browseMode) trackpad.update(); 
            if(Config.track) {
                Config.track.x = trackpad.value;
                Config.track.y = trackpad.valueY;
            };

            ////todo:put mouse status update and stuff here which would have been in grid.render()
            if (_self.pauseGridRender || app_compatible) { grid.render(context) }
            // pauseGridRender || (app_compatible ? grid.render() : ()); 
            requestAnimFrame(_self.update);
        },

        realResize : function () {
            console.log('REAL RESIZE');
            var a = window.innerWidth || document.documentElement.clientWidth,
                b = window.innerHeight || document.documentElement.clientHeight;
            if (window.grid) {
                if(app_compatible || window.canvas) {
                    canvas.width = a;
                    canvas.height = b*0.87;
                    grid.canvasOffset = b*0.08;
                    //todo: change camera position based on previous size and new size
                };
                console.log(canvas.width+"x"+canvas.height+" offset="+grid.canvasOffset);
                grid.resize(a, b);
                var c = {
                    x: 500,
                    y: 500
                };
                // if(Config.isMobile) {
                //     c.x = a;
                //     c.y = b;
                //     window.usingForm ? a > 2 * b ? $(overlay).fadeIn() : $(overlay).fadeOut() : a > b ? $(overlay).fadeIn() : $(overlay).fadeOut();
                //     var d = c.x / 2,
                //         e = c.y / 2;
                //     if(_self.pauseGridRender) {
                //         if(app_compatible) {
                //             grid.render(context);
                //             viewer.render(context);                            
                //         }
                //         if(a != this.cacheW && b != this.cacheH) window.scrollTo(0, 0);
                //         this.cacheW = a;
                //         this.cacheH = b;
                //         console.log("RESIZING");
                //     };
                // };
            };
        },

        onSwapPressed : function () {
            window.location.hash = "";
            _self.pauseGridRender = false;
            viewer.swap();
        },

        onViewerHidden : function () {
            trackpad.unlock();
            grid.unlock();
            _self.browseMode = true;
        },

        // resize : function () { 
        //     console.log("app.resize");
        // },

        onResize : function () {
            _self.resizeCount = 0;
            var a = window.innerWidth || document.documentElement.clientWidth,
                b = window.innerHeight || document.documentElement.clientHeight;
            this.w = a;
            this.h = b;

            // if(MatchMedia.mobile()) _self.realResize();
            if(window.tabMenu) tabMenu.resize(a, b);
            if(loaderScreen) loaderScreen.resize(a, b);
            if(window.tickerTape) tickerTape.view.style.left = a / 2 - 304 + "px";

        },

        onMouseDown : function (a) {
            a.preventDefault();
            // Config.downAt.x = Config.mouse.x;
            // Config.downAt.y = Config.mouse.y;
            Config.mouse.button = true;
            Config.mouse.dragDistance = 0;
        },

        onMouseUp : function (a) {
            a.preventDefault();
            Config.mouse.button = false;
            if(Config.mouse.dragDistance<15) grid.sentClick();
        },

        onMouseOut : function (a) {
            a.preventDefault();
            Config.mouse.button = false;
        },

        onTouchStart : function (e) {
            e.preventDefault();
            // Config.downAt.x = e.originalEvent.touches[0].clientX + document.body.scrollLeft;
            // Config.downAt.y = e.originalEvent.touches[0].clientY + document.body.scrollTop;
            grid.mousefollow.x = e.originalEvent.touches[0].clientX;
            grid.mousefollow.y = e.originalEvent.touches[0].clientY;  
            Config.mouse.x = e.originalEvent.touches[0].clientX;
            Config.mouse.y = e.originalEvent.touches[0].clientY;           
            Config.mouse.button = true;
            Config.mouse.dragDistance = 0;

            // e.preventDefault();
            // Config.mouse.x = e.originalEvent.touches[0].clientX + document.body.scrollLeft;
            // Config.mouse.y = e.originalEvent.touches[0].clientY + document.body.scrollTop;
            // Config.mouse.button = true;
            // Config.mouse.dragDistance = 0;
        },

        onTouchEnd : function (e) {
            e.preventDefault();
            Config.mouse.button = false;
            // alert(Config.mouse.button);
            if(Config.mouse.dragDistance<15) grid.sentClick();
        },

        onTouchMove : function(e) {
            e.preventDefault();
            // //var newX = a.pageX + document.body.scrollLeft, newY = a.pageY + document.body.scrollTop;
            var newX = e.originalEvent.touches[0].clientX + document.body.scrollLeft,
                newY = e.originalEvent.touches[0].clientY + document.body.scrollTop;
                // alert(Config.mouse.dragDistance);
            Config.newX = newX;
            var dx = Config.mouse.x - newX, dy = Config.mouse.y - newY;
            Config.mouse.dragDistance += Math.sqrt(dx*dx+dy*dy);
            //console.log(Config.mouse)
            if(Config.mouse.dragDistance>1e4) {
               Config.mouse.dragDistance=1e4; 
            } 
            Config.mouse.x = newX;
            Config.mouse.y = newY;
        },

        onMouseMove : function (a) {
            //var newX = a.pageX + document.body.scrollLeft, newY = a.pageY + document.body.scrollTop;
            var newX = a.clientX + document.body.scrollLeft, 
                newY = a.clientY + document.body.scrollTop;
            Config.newX = newX;
            var dx = Config.mouse.x - newX, dy = Config.mouse.y - newY;
            Config.mouse.dragDistance += Math.sqrt(dx*dx+dy*dy);
            //console.log(Config.mouse)
            if(Config.mouse.dragDistance>1e4) Config.mouse.dragDistance=1e4;
            Config.mouse.x = newX;
            Config.mouse.y = newY;
        }

    });

    return AppView;

});