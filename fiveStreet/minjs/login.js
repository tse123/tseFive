"use strict";

require(["config"], function () {
	require(["jquery", "common"], function ($, co) {
		$(window).load(function () {
			$.ajax({
				type: "get",
				url: "commonfooter.html",
				async: true,
				success: function success(data) {
					$(".loginfoot").html(data);
				}
			});
			$(".userinp").val(co.Cookie.get("loginuser"));
			$(".userpas").val(co.Cookie.get("loginpas"));
			//			如果check勾选过,将其存入cookie,下次打开这个页面的时候直接使用
			$(".cli").on("click", function () {
				if ($(".check input[name='checking']")[0].checked == true) {
					co.Cookie.set("loginuser", $(".userinp").val(), 30, "/");
					co.Cookie.set("loginpas", $(".userpas").val(), 30, "/");
				} else {
					co.Cookie.set("loginuser", "", 30, "/");
					co.Cookie.set("loginpas", "", 30, "/");
				}
			});
		});
	});
});