"use strict";

require(["config"], function () {
	//写出页面所需要的所有模块，不用考虑顺序问题
	require(["jquery", "common", "returnId", "commonheader", "commonfooter"], function ($, co, returnId, cohead, cofoot) {
		$(window).load(function () {
			//			添加公共头部
			$.ajax({
				type: "get",
				url: "../html/commonheader.html",
				async: true,
				success: function success(data) {
					$(".allWrap").show();
					$(".topheader").html(data);
					cohead(data);
				}
			});
			//			添加公共尾部
			$.ajax({
				type: "get",
				url: "../html/commonfooter.html",
				async: true,
				success: function success(data) {
					$(".footerWrap").html(data);
				}
			});
			//			为导航添加鼠标滑过效果
			$(".slidelist li").hover(function () {
				$(this).stop().animate({ "width": "150px" });
			}, function () {
				$(this).stop().animate({ "width": "42px" });
			});

			//			轮播图位置自适应块
			setTimeout(function () {
				$(".imgbox").css({ "width": $(window).width() });
				$(".picbox").css({ "width": $(".imgbox").eq(0).width() * $(".imgbox").length });
				$(".bigpic").css({ "left": -($(".bigpic").eq(0).width() - $(".imgbox").eq(0).width()) / 2 });
				//			轮播图运动
				co.carousel(".picbox", 2000);
			}, 50);
			$(window).resize(function () {
				$(".bigpic").css({ "position": "absolute", "left": -($(".bigpic").width() - $(".picWrap").width()) / 2, "top": 0 });
			});
			//			品牌旗舰块划过效果
			$(".brandbox").hover(function () {
				$(this).stop().animate({ "bottom": 0 }, 300);
			}, function () {
				$(this).stop().animate({ "bottom": "-110px" }, 300);
			});

			//			co.layout(".brandbac");
			//			热门旗舰店,购物中心引用模板文件创建
			$.ajax({
				type: "get",
				url: "../json/json.json",
				success: function success(data) {
					var hothtml = co.template("hotstore", data.hotstorelist);
					$(".hotlistwrap").html(hothtml);
					var shophtml = co.template("shopcentertemp", data.shopcenterlist);
					$(".shopcenterbox").html(shophtml);
					//			为热门旗舰店块添加滑动效果
					$(".hotlistwrap li").hover(function () {
						$(this).find(".imgwrap").fadeOut(200);
						$(this).find(".licover").fadeIn(300);
						$(this).find(".lefttop").stop().animate({ "width": $(this).width() + 2 });
						$(this).find(".leftleft").stop().animate({ "height": $(this).height() + 2 });
						$(this).find(".rightright").stop().animate({ "height": $(this).height() + 2 });
						$(this).find(".rightbottom").stop().animate({ "width": $(this).width() + 2 });
					}, function () {
						$(this).find(".imgwrap").fadeIn(300);
						$(this).find(".licover").fadeOut(200);
						$(this).find(".lefttop").stop().animate({ "width": 0 });
						$(this).find(".leftleft").stop().animate({ "height": 0 });
						$(this).find(".rightright").stop().animate({ "height": 0 });
						$(this).find(".rightbottom").stop().animate({ "width": 0 });
					});
					//					为热门旗舰店添加点击切换
					var index = 0;
					var wid = 1210;
					$(".hotbtn .spanleft").on("click", function () {
						index++;
						if (index >= 2) {
							index = 2;
						}
						$(".hotlistwrap").stop().animate({ "left": -wid * index });
					});
					$(".hotbtn .spanright").on("click", function () {
						index--;
						if (index <= 0) {
							index = 0;
						}
						$(".hotlistwrap").stop().animate({ "left": -wid * index });
					});
					//为经典箱包块模板添加轮播效果
					co.classicmove(".btnbox");
					//为首页最下方添加Tab切换效果
					$(".promolist li").on("mouseenter", function () {
						$(this).css({ "border": "1px solid black" }).siblings().css({ "border": "1px solid #cccccc" });
						var $index = $(this).index();
						$(this).parent().parent().find(".listrightbox img").attr({ "src": data.taplist[$index].src });
					});
				}
			});
			//			商场同款块js效果
			$(".mallmenu li").on("mouseenter", function () {
				$(this).css({ "background": "black" }).siblings().css({ "background": "#999999" });
				var index = $(this).index();
				$(".mallbox .malllist").stop().animate({ "left": -1210 * index }, 300);
			});
			$(".mallleft .div1").hover(function () {
				$(this).find("div").stop().animate({ "left": "-20px" }, 200);
				$(this).find("img").stop().animate({ "left": "56px" }, 200);
			}, function () {
				$(this).find("div").stop().animate({ "left": "0px" }, 200);
				$(this).find("img").stop().animate({ "left": "36px" }, 200);
			});
			$(".mallleft .div2").hover(function () {
				$(this).find("div").stop().animate({ "left": "-20px" }, 200);
				$(this).find("img").stop().animate({ "right": "0px" }, 200);
			}, function () {
				$(this).find("div").stop().animate({ "left": "0px" }, 200);
				$(this).find("img").stop().animate({ "right": "20px" }, 200);
			});
			$(".mallleft .div3").hover(function () {
				$(this).find("div").stop().animate({ "left": "-20px" }, 200);
				$(this).find("img").stop().animate({ "left": "80px" }, 200);
			}, function () {
				$(this).find("div").stop().animate({ "left": "0px" }, 200);
				$(this).find("img").stop().animate({ "left": "60px" }, 200);
			});
			//			购物中心块js效果
			$(".shopcenterlist li").hover(function () {
				$(this).find(".dswrap").stop().animate({ "top": "-50px" }, 300);
			}, function () {
				$(this).find(".dswrap").stop().animate({ "top": "0px" }, 300);
			});
			//			图片懒加载功能块
			co.layout(".img-lay");
			$(".goods").on("click", function () {
				var idstr = $(this).attr("id");
				console.log(idstr);
				co.Cookie.set("goodsid", idstr, "30", "/");
			});
		});
	});
});