/*global define*/
define([
        'jquery',
        'config/config',
        'models/tile',
        'modules/grid-button',
        'modules/double-spring',
], function ($, Config, model, GridButton, DoubleSpring) {
	'use strict';

	var Grid = function (a, b) {
		console.log("Grid"),
	    // this.textCanvas = document.createElement("canvas"), 
	    // this.textCanvas.width = 500, 
	    // this.textCanvas.height = 100, 
	    // this.textCanvas.context = this.textCanvas.getContext("2d"), 
	    // this.textCanvas.context.fillStyle = "yellow", 
	    // this.textCanvas.context.fillRect(0, 0, this.textCanvas.width, this.textCanvas.height), 
	    this.camera = {
	        x: 0,
	        y: 0,
	        momentumx: 0,
	        momentumy: 0
	    },

	    this.mousefollow = {
  			x: Config.mouse.x,
	    	y: Config.mouse.y
	    },


	    this.squareWidth = 350,
	    this.squareHeight = 350,
	    this.locked = 1, 
	    this.startZoom = .5, 
	    this.resize(a, b),

	    this.fliptile = {
	    	x: 0,
	    	y: 0,
	    	xi: 1,
	    	yi: 1,
	    	angle: 0
	    }
        
        this.holding = false;

	    this.colours=[];
	    for(var i=0;i<64;i++) {
	    	this.colours.push({r:Math.floor(Math.random()*256),
	    	                   g:Math.floor(Math.random()*256),
	    	                   b:Math.floor(Math.random()*256)});
	    };
	};

	Grid.constructor = Grid;

	Grid.prototype.resize = function (a, b) {
		console.log("Grid.resize " + a + "x" + b),
	    this.width = a,
	    this.height = b
	};

	Grid.prototype.render = function (a) {
	    //console.log("render");
	    a.save();
	    
	    //use the difference to move the camera when holding
        if(Config.mouse.button) {
        	this.camera.momentumx = (Config.mouse.x-this.mousefollow.x)*0.4;
        	this.camera.momentumy = (Config.mouse.y-this.mousefollow.y)*0.4;       	
        	this.camera.x += (Config.mouse.x-this.mousefollow.x)*0.4;
        	this.camera.y += (Config.mouse.y-this.mousefollow.y)*0.4;
        } else {
            this.camera.x += this.camera.momentumx;
            this.camera.y += this.camera.momentumy;
            this.camera.momentumy *= 0.95;
            this.camera.momentumx *= 0.95;
        }

        this.mousefollow.x+=(Config.mouse.x-this.mousefollow.x)*0.4;
        this.mousefollow.y+=(Config.mouse.y-this.mousefollow.y)*0.4;


	    // this.fliptile.x += this.fliptile.xi;
	    // this.fliptile.y += this.fliptile.yi;
	    // if(this.fliptile.x<=0) this.fliptile.xi=1;
	    // if(this.fliptile.y<=0) this.fliptile.yi=1;
	    // if(this.fliptile.x>=canvas.width-this.squareWidth) this.fliptile.xi=-1;
	    // if(this.fliptile.y>=canvas.height-this.squareHeight) this.fliptile.yi=-1;

	    // this.fliptile.angle+=1;
	    // this.fliptile.angle%=360;

	    // var textlength = 0,
	    //     message = "Tile";
	    // var scalex, scaley, overcolor, opacity;

	    // scalex = Math.abs(Math.cos(this.fliptile.angle*.01745329252));
	    // scaley = scalex
	    // opacity = 1-scalex;
	    //opacity*=.9;
            //console.log(canvas.width+"x"+canvas.height);
            a.fillStyle="navy";
            a.fillRect(0,0,canvas.width,canvas.height);


//// FLIPPING HORIZONTAL
//                 if(this.fliptile.angle<90 || this.fliptile.angle>=270) {
// //frontside
//                 a.drawImage(model.content[2].image,this.fliptile.x+(1-scalex)*this.squareWidth*.5,this.fliptile.y,this.squareWidth*scalex,this.squareHeight);
//                 } else {
// //backside    
//                 a.fillStyle = model.content[2].backcolour;
//                 a.fillRect(this.fliptile.x+(1-scalex)*this.squareWidth*.5,this.fliptile.y,this.squareWidth*scalex,this.squareHeight);

//                 a.font="60px Arial";
//                 textlength = a.measureText(message).width;
//                 a.fillStyle = "white";
//                 if(scalex>.01) { 
//                     a.scale(scalex,1);
//                     a.fillText(message, (this.fliptile.x+this.squareWidth*.5-(textlength*.5*scalex))/scalex, this.fliptile.y+.5*this.squareHeight+30);
//                     a.scale(1/scalex,1);
//                 };

//                 };
//             a.fillStyle="rgba(0,0,0,"+opacity+")";
//             a.fillRect(this.fliptile.x+(1-scalex)*this.squareWidth*.5,this.fliptile.y,this.squareWidth*scalex,this.squareHeight);



// //// FLIPPING VERTICAL
//                 if(this.fliptile.angle<90 || this.fliptile.angle>=270) {
// //frontside
//                 a.drawImage(model.content[2].image,this.fliptile.x,this.fliptile.y+(1-scaley)*this.squareHeight*.5,this.squareWidth,this.squareHeight*scaley);
//                 } else {
// //backside    
//                 a.fillStyle = model.content[2].backcolour;
//                 a.fillRect(this.fliptile.x,this.fliptile.y+(1-scaley)*this.squareHeight*.5,this.squareWidth,this.squareHeight*scaley);

//                 a.font="60px Arial";
//                 textlength = a.measureText(message).width;
//                 a.fillStyle = "white";
//                 if(scaley>.01) { 
//                     a.scale(1,scaley);
//                     a.fillText(message, this.fliptile.x+(this.squareWidth-textlength)*.5, (this.fliptile.y+.5*this.squareHeight+30*scaley)/scaley);
//                     a.scale(1,1/scaley);
//                 };

//                 };
//             a.fillStyle="rgba(0,0,0,"+opacity+")";
//             a.fillRect(this.fliptile.x,this.fliptile.y+(1-scaley)*this.squareHeight*.5,this.squareWidth,this.squareHeight*scaley);

//         a.font="16px Arial";
//         a.fillStyle = "white";
//         a.fillText("Config: mousexy="+Config.mouse.x+","+Config.mouse.y+"  trackxy="+Config.track.x+","+Config.track.y+"  downAtxy="+Config.downAt.x+","+Config.downAt.y, 5,21);


a.strokeStyle = "white";
var gl=this.camera.x % 300;
do{
  a.beginPath();
  a.moveTo(gl,0);
  a.lineTo(gl,canvas.height);
  a.stroke();
  gl+=300;
} while(gl<canvas.width);

gl=this.camera.y % 300;
do{
  a.beginPath();
  a.moveTo(0,gl);
  a.lineTo(canvas.width,gl);
  a.stroke();
  gl+=300;
} while(gl<canvas.height);



// var x, y, sx, sy;
// a.font="20px Arial";
// for(var i=0; i<model.content.length; i++) {
//   x=model.content[i].position.x*this.squareWidth/4;
//   y=model.content[i].position.y*this.squareHeight/4+30;
//   sx=model.content[i].scale*(this.squareWidth/4)-10;
//   sy=model.content[i].scale*(this.squareWidth/4)-10;

//   a.fillRect(x,y,sx,sy);
//   a.fillStyle="black";
//   a.fillText(i,x+30,y+30);

// };

 	a.fillStyle="white";
  	a.fillText("Config: mousexy="+Config.mouse.x+","+Config.mouse.y+"  trackxy="+Config.track.x+","+Config.track.y+"  downAtxy="+Config.downAt.x+","+Config.downAt.y+"  holding="+this.holding, 5,21);

                // a.scale(.5+Math.random()*2,.5+Math.random()*2);
                // a.font = "20pt Arial";
                // textlength = a.measureText(message).width;
                // a.fillStyle = "rgba(64,64,192,.75)"
                // a.fillRect(x,y-20,textlength,20);

                // a.fillStyle = "white";
                // a.fillText(message, x, y);

                // a.lineWidth = 2;
                // a.strokeStyle = "white"
                // a.beginPath();
                // a.moveTo(x,y);
                // a.lineTo(x+textlength,y);
                // a.stroke();

            // i = Math.floor(Math.random()*model.content.length)
            // if(model.content[i].image) {
            //     a.drawImage(model.content[i].image,Math.floor(Math.random()*canvas.width),Math.floor(Math.random()*canvas.height),50,50);
            // };
              
            a.restore();
        };

        return Grid;
});