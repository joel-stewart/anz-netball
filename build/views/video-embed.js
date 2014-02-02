define(["jquery","underscore","backbone","text!templates/video-modal.html","text!templates/video-embed.html"],function(e,t,n,r,i){var s,o=n.View.extend({tagName:"div",defaults:{top:"50%",left:"50%",width:500,height:500},className:"loading",initialize:function(){s=this,s.set_options(),this.$el.on("click.video.close",this.close),window.addEventListener?window.addEventListener("message",s.on_message_received,!1):window.attachEvent("onmessage",s.on_message_received,!1)},on_message_received:function(e){var t=JSON.parse(e.data);switch(t.event){case"ready":}},set_options:function(){if(!this.options.video_id){console.log("You must define a video id.");return}this.options.modal?(this.view_style_options=e.extend({},this.defaults,this.options),this._template_result=t.template(r,this.options.video_id,{variable:"data"}),this.$el.css(this.view_style_options).addClass("modal fade").attr({tabindex:-1,role:"dialog","aria-hidden":"true"}).modal("show"),this.$el.on("hidden.bs.modal",s.close),e(window).on("resize scroll",s.resize),s.resize()):(this._template_result=t.template(i,this.options.video_id,{variable:"data"}),this.$el.addClass("video-pane"))},resize:function(){s.$el.css({marginTop:"-"+s.view_style_options.height/2+"px",marginLeft:"-"+s.view_style_options.width/2+"px"})},close:function(e){setTimeout(function(){s.$el.remove()},400)},render:function(){return this.$el.html(this._template_result),this}});return o});