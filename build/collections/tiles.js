define(["underscore","backbone","models/tile"],function(e,t,n){var r=t.Collection.extend({model:n,url:"/javascript/data/tile-data.json",initialize:function(){}});return new r});