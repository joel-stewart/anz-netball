define(["jquery","config/config","models/tile","modules/grid-button","modules/double-spring","modules/grid"],function(e,t,n,r,i,s){var o=function(e,n){this.domView=document.createElement("div"),this.domView.style.position="absolute",this.domView.style.top="0px",this.domView.style.left="0px",this.domView.style.display="none",document.body.appendChild(this.domView),this.vignetteTexture=new Image,this.vignetteTexture.src=t.REMOTE_PATH+"img/smoothVignette.png",this.padding=1,this.button=new r(["img/CTA_moment_01.png","img/CTA_moment_02.png","img/CTA_moment_03.png","img/CTA_moment_04.png","img/CTA_moment_05.png","img/CTA_moment_06.png","img/CTA_moment_07.png","img/CTA_moment_08.png","img/CTA_moment_08.png","img/CTA_moment_07.png","img/CTA_moment_06.png","img/CTA_moment_05.png","img/CTA_moment_04.png","img/CTA_moment_03.png","img/CTA_moment_02.png","img/CTA_moment_01.png"]),this.tellUsButton=new r(["img/xmas/doorPrompts_open_01.png","img/xmas/doorPrompts_open_02.png","img/xmas/doorPrompts_open_03.png","img/xmas/doorPrompts_open_04.png","img/xmas/doorPrompts_open_05.png","img/xmas/doorPrompts_open_06.png","img/xmas/doorPrompts_open_07.png","img/xmas/doorPrompts_open_08.png","img/xmas/doorPrompts_open_08.png","img/xmas/doorPrompts_open_07.png","img/xmas/doorPrompts_open_06.png","img/xmas/doorPrompts_open_05.png","img/xmas/doorPrompts_open_04.png","img/xmas/doorPrompts_open_03.png","img/xmas/doorPrompts_open_02.png","img/xmas/doorPrompts_open_01.png"]),this.tellMeMoreButton=new r(["img/CTA_tellMeMore_01.png","img/CTA_tellMeMore_02.png","img/CTA_tellMeMore_03.png","img/CTA_tellMeMore_04.png","img/CTA_tellMeMore_05.png","img/CTA_tellMeMore_06.png","img/CTA_tellMeMore_07.png","img/CTA_tellMeMore_08.png","img/CTA_tellMeMore_08.png","img/CTA_tellMeMore_07.png","img/CTA_tellMeMore_06.png","img/CTA_tellMeMore_05.png","img/CTA_tellMeMore_04.png","img/CTA_tellMeMore_03.png","img/CTA_tellMeMore_02.png","img/CTA_tellMeMore_01.png"]),this.andMaybeText=new Image,this.andMaybeText.src=t.REMOTE_PATH+"img/appearHere.png",this.camera={x:0,y:0},this.squareWidth=250,this.nodePool=[],this.points=[],this.start=!0,this.locked=!0,this.startZoom=5,this.resize(e,n),this.zoomRatio=0,this.startFade=0};return o.constructor=o,o.prototype.resize=function(n,r){this.domView.style.width=n+"px",this.domView.style.height=r+"px",this.width=n,this.height=r,this.gridWidth=Math.ceil(this.width/this.squareWidth)+2+this.padding+1,this.gridHeight=Math.ceil(this.height/this.squareWidth)+2+this.padding+1;var s=this.gridWidth*this.gridHeight;for(var o=0;o<this.points.length;o++)this.nodePool.push(this.points[o]),this.domView.display="none";this.points=[];for(var o=0;s>o;o++){var u=this.nodePool.pop();u||(u={spring:new i,alpha:1,image:new Image,dom:document.createElement("div"),ratio:0},u.dom.className="domGridNode",u.image.style.position="absolute",u.image.style.top="0px",u.image.style.left="0px",u.dom.appendChild(u.image),u.detail=document.createElement("div"),u.detail.innerHTML="UP AND OVER!",u.detail.className="detailDOMTitle",u.detail.style.display="none",e(u.detail).css({top:"145px",left:"-105px"}),u.dom.appendChild(u.detail),u.detailName=document.createElement("div"),u.detailName.innerHTML="John, London",u.detailName.className="detailDOMName",u.detailName.style.display="none",e(u.detailName).css({top:"175px",left:"-105px"}),u.dom.appendChild(u.detailName),u.button=new Image,u.button.src=t.REMOTE_PATH+"img/CTA_moment_01.png",e(u.button).css({position:"absolute",top:"190px",left:"15px"}),u.button.style.display="none",u.button.width=228,u.button.height=43.5,u.dom.appendChild(u.button),u.dom.node=u,u.image.width=250,u.image.height=250,this.domView.appendChild(u.dom)),this.domView.display="block";var a=o%this.gridWidth,f=Math.floor(o/this.gridWidth);u.x=u.xHome=a,u.y=u.yHome=f,this.points.push(u)}console.log("RESIZE"),this.scale=1,this.domView.style.overflow="hidden"},o.prototype.startIntro=function(){e(this.domView).delay("1000").fadeIn(),TweenLite.to(this,2,{startZoom:1,ease:Expo.easeInOut,onComplete:this.onZoomedOut.bind(this)}),TweenLite.to(this,.1,{startFade:1,ease:Expo.easeInOut,delay:2,onComplete:this.onTransitionFinished})},o.prototype.onZoomedOut=function(){this.start=!1,this.locked=!1,this.onStartComplete()},o.prototype.render=function(){var r=.4*(t.track.x-this.camera.x),i=.4*(t.track.y-this.camera.y),o=Math.sqrt(i*i+r*r),u=Math.abs(o);u>40&&(u=40),u/=40,u*=.25,this.scale+=.1*(1-u-this.scale),this.start?(this.scale=this.startZoom,this.camera.x=t.track.x,this.camera.y=t.track.y,5==this.scale):(this.camera.x+=r,this.camera.y+=i);for(var a=(this.scale+(1-this.scale)*this.zoomRatio,this.squareWidth,this.squareWidth*this.gridWidth),f=this.squareWidth*this.gridHeight,l=0;l<this.points.length;l++){var c=this.points[l],h=c.x*this.squareWidth+this.camera.x,p=c.y*this.squareWidth+this.camera.y,d=Math.floor(h/a);0>h&&(d-=1),d*=this.gridWidth,d-=c.x;var v=Math.floor(p/f);if(0>p&&(v-=1),v*=this.gridHeight,v-=c.y,c.xid!=d||c.yid!=v){var m=s.getId(d,v),g=n.content[m];if("share"==g.id&&(g=n.share[g.visualId||0],g.id="share"),c.moment=g,c.isStart=!1,0==d&&0==v&&(c.isStart=!0),c.dom.style.backgroundColor=c.moment.color,c.button.style.display="none","share"==c.moment.id)c.button.src=t.REMOTE_PATH+"img/TELLUS_01.png",c.button.width=169.5,c.button.height=50.25,c.button.style.left="45px",c.button.style.top="160px",c.detail.style.fontSize="20px",c.detail.style.top="215px",c.detail.innerHTML="..and maybe it'll appear here ";else if("startx"==c.moment.id)c.button.src=t.REMOTE_PATH+"img/CTA_tellMeMore_01.png",c.button.width=174.75,c.button.height=46.5,c.button.style.left="40px",c.button.style.top="180px";else{c.moment.xmas?c.moment.locked?(c.button.src=c.moment._state!==!1?t.REMOTE_PATH+"img/CTA_moment_01.png":t.REMOTE_PATH+"img/xmas/doorPrompts_open_01.png",c.moment.superlocked&&(c.button.src=t.REMOTE_PATH+"img/xmas/doorPrompts_locked.png")):c.button.src=t.REMOTE_PATH+"img/CTA_moment_01.png":c.button.src=t.REMOTE_PATH+"img/CTA_moment_01.png",c.button.width=228,c.button.height=43.5,c.button.style.left="15px",c.button.style.top="190px",c.detail.style.fontSize="27px",c.detail.style.top="145px";var y=c.moment.copy,b=c.moment.user+", "+c.moment.loaction;c.detail.innerHTML=y,c.detailName.innerHTML=b}var w=c.moment.gridImage[0];c.moment.xmas===!0&&c.moment.locked&&(w=c.moment.lockedImage),c.image.src=t.REMOTE_PATH+w,c.image.width=250,c.image.height=250}c.xid=d,c.yid=v,h%=a,0>h&&(h+=a),p%=f,0>p&&(p+=f),c.xReal=h,c.yReal=p,c.xReals=h+c.spring.x*(1-this.zoomRatio),c.yReals=p+c.spring.y*(1-this.zoomRatio),c.spring.tx=c.xHome,c.spring.ty=c.yHome}for(var l=0;l<this.points.length;l++){var c=this.points[l];if(c.xReal<(this.gridWidth-1)*this.squareWidth&&c.yReal<(this.gridHeight-1)*this.squareWidth){c.dom.style.display="block";var E=c,S=this.points[this.gridWidth*(c.y%this.gridHeight)+(c.x+1)%this.gridWidth],x=this.points[this.gridWidth*((c.y+1)%this.gridHeight)+(c.x+1)%this.gridWidth],T=this.points[this.gridWidth*((c.y+1)%this.gridHeight)+c.x%this.gridWidth],N=(E.xReals+S.xReals+x.xReals+T.xReals)/4,C=(E.yReals+S.yReals+x.yReals+T.yReals)/4,k=S.xReals-E.xReals,L=x.xReals-T.xReals,A=L>k?k:L,O=E.yReals-T.yReals,M=S.yReals-x.yReals,_=O>M?O:M,D=A/this.squareWidth*250,P=_/this.squareWidth*250;0>D&&(D*=-1),0>P&&(P*=-1);var H=L/k,B=k/L;H=H>B?H:B;var j=O/M,F=M/O;j=j>F?j:F;var I=-this.squareWidth*(this.padding+1),q=1.5*-this.squareWidth;if(c.dom.style.left=N-this.squareWidth/2+I+"px",c.dom.style.top=C-this.squareWidth/2+q+"px",this.overCell!=c)c.isStart&&this.startFade<1&&(D=250,P=250);else{var R=A/this.squareWidth,U=_/this.squareWidth;0>R&&(R*=-1),0>U&&(U*=-1),(E.yReals+S.yReals)/2,c.ratio}}else c.dom.style.display="none"}if(!this.locked){var z=this.hittest();if(z){if(z!=this.overCell&&(this.overCell&&(e(this.overCell.detailName).fadeOut("fast"),e(this.overCell.detail).fadeOut("fast"),this.overCell.button.style.display="none",TweenLite.to(this.overCell.image,.3,{width:250,height:250,left:"0px"})),this.overCell=z,this.overCell.count=0,this.overCell.ratio=0,this.overCell.alpha1=0,this.overCell.alpha2=0),this.overCell.count++,2==this.overCell.count)if("share"==this.overCell.moment.id){e(this.overCell.detail).fadeIn("fast"),this.overCell.button.style.display="block";var W=this.overCell.moment.scale||.8;TweenLite.to(this.overCell.image,.3,{width:250*W,height:250*W,left:125-125*W+"px",ease:Back.easeOut})}else if("startx"==this.overCell.moment.id){this.overCell.button.style.display="block";var W=this.overCell.moment.scale||.8;TweenLite.to(this.overCell.image,.3,{width:250*W,height:250*W,left:125-125*W+"px",ease:Back.easeOut})}else{this.overCell.button.style.display="block";var W=this.overCell.moment.scale||.8;this.overCell.moment.locked?(W=.8,TweenLite.to(this.overCell.image,.3,{width:250*W,height:250*W,left:125-125*W+"px",ease:Back.easeOut})):(e(this.overCell.detail).fadeIn("fast"),e(this.overCell.detailName).delay(60).fadeIn("fast"),TweenLite.to(this.overCell.image,.3,{width:250*W,height:250*W,left:125-125*W+"px",ease:Back.easeOut})),TweenLite.to(this.overCell,.2,{ratio:1,ease:Sine.easeInOut}),TweenLite.to(this.overCell,.1,{alpha1:1,ease:Sine.easeInOut,delay:.1}),TweenLite.to(this.overCell,.3,{alpha2:1,ease:Sine.easeInOut,delay:.2})}this.overCell.alpha=.2;var X=this.overCell.down&&!this.didMove?-30:40;c=this.overCell,this.effectCell(c,X)}}},o.prototype.effectCell=function(e,t){var n=e,r=this.points[this.gridWidth*(e.y%this.gridHeight)+(e.x+1)%this.gridWidth],i=this.points[this.gridWidth*((e.y+1)%this.gridHeight)+(e.x+1)%this.gridWidth],s=this.points[this.gridWidth*((e.y+1)%this.gridHeight)+e.x%this.gridWidth];Math.PI/4,n.spring.tx=-t,n.spring.ty=1.3*-t,r.spring.tx=1.3*+t,r.spring.ty=-t,i.spring.tx=+t,i.spring.ty=1.3*+t,s.spring.tx=-t,s.spring.ty=+t},o.prototype.centerOnMoment=function(){this.locked=!0,TweenLite.to(this,.4,{zoomRatio:1,ease:Cubic.easeIn})},o.prototype.unlock=function(){this.locked=!1,TweenLite.to(this,.2,{zoomRatio:0})},o.prototype.down=function(){this.overCell=this.hittest(),this.overCell.down=!0,this.didMove=!1,this.overCell.count=0,this.overCell.ratio=0,this.overCell.alpha1=0,this.overCell.alpha2=0},o.prototype.hittest=function(){if(document.body.style.cursor="default",this.overCell){var e=this.overCell,n=this.points[this.gridWidth*(e.y%this.gridHeight)+(e.x+1)%this.gridWidth],r=this.points[this.gridWidth*((e.y+1)%this.gridHeight)+(e.x+1)%this.gridWidth],i=(this.points[this.gridWidth*((e.y+1)%this.gridHeight)+e.x%this.gridWidth],n.xReal-e.xReal),s=r.yReal-e.yReal,o=t.mouse.x-e.xReal+2*this.squareWidth,u=t.mouse.y-e.yReal+1.5*this.squareWidth;if(o>0&&i>o&&u>0&&s>u)return"share"==e.moment.id?o>18&&i-22>o&&u>165&&s-30>u&&(document.body.style.cursor="pointer"):o>5&&i-5>o&&u>230&&s+24>u&&(document.body.style.cursor="pointer"),this.overCell}var a=Math.floor((t.mouse.x-this.camera.x)/this.squareWidth)+2,f=Math.floor((t.mouse.y-this.camera.y+.5*this.squareWidth)/this.squareWidth)+1;return a%=this.gridWidth,0>a&&(a+=this.gridWidth),f%=this.gridHeight,0>f&&(f+=this.gridHeight),this.points[f%this.gridHeight*this.gridWidth+a]},o.prototype.up=function(){if(!this.didMove){var e=this.overCell.xid;e<-this.gridWidth&&(e+=this.gridWidth);var t=this.overCell.yid;if(t<-this.gridHeight&&(t+=this.gridHeight),point=this.overCell,point.moment.superlocked)return;var n=point,r=this.points[this.gridWidth*(point.y%this.gridHeight)+(point.x+1)%this.gridWidth],i=this.points[this.gridWidth*((point.y+1)%this.gridHeight)+(point.x+1)%this.gridWidth],s=this.points[this.gridWidth*((point.y+1)%this.gridHeight)+point.x%this.gridWidth],o=-this.width/2-this.squareWidth*(this.padding+1),u=-this.height/2-1.5*this.squareWidth;this.overCell.moment.corners=[{x:n.xReals+o,y:n.yReals+u},{x:r.xReals+o,y:r.yReals+u},{x:i.xReals+o,y:i.yReals+u},{x:s.xReals+o,y:s.yReals+u}],this.overCell.moment.positionX=(e+2-.5)*this.squareWidth+this.width/2-this.squareWidth/2+1,this.overCell.moment.positionY=(t+1.5-.5)*this.squareWidth+this.height/2-this.squareWidth/2+1,this.overCell.moment.positionX=Math.floor(this.overCell.moment.positionX),this.overCell.moment.positionY=Math.floor(this.overCell.moment.positionY),this.overCell.moment.image=point.image,this.onMomentSelected(this.overCell.moment)}},o});