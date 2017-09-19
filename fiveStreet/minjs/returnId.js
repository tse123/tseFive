"use strict";

define(["jquery"], function ($) {
	var idstr = 0;
	return {
		retid: function retid(id) {
			idstr = id;
		},
		idst: idstr
	};
});