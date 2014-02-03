/*global define*/
define([
	'jquery'
], function ($) {

      var Config = {

            REMOTE_PATH : "",

            worldWidth : 5,

            mouse : {
                  x: 0,
                  y: 0,
                  button: false,
                  dragDistance: 0
            },
            track : {
                  x: 0,
                  y: 0
            }
      };

      return Config;
});