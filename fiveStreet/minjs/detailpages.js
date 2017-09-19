"use strict";

require(["config"], function () {
	require(["jquery", "common", "returnId", "commonheader"], function ($, co, returnId) {
		$.ajax({
			type: "get",
			url: "../html/commonheader.html",
			async: true,
			success: function success(data) {
				$(".commonh").html(data);
			}
		});
		$.ajax({
			type: "get",
			url: "../html/commonfooter.html",
			async: true,
			success: function success(data) {
				$(".commonf").html(data);
			}
		});
		//		请求详情页页面数据
		var id = co.Cookie.get("goodsid");
		console.log(id);
		$.ajax({
			type: "get",
			url: "http://api.restful.5lux.com.cn/good/goodsdetail/?id=" + id,
			async: true,
			success: function success(data) {
				var data = JSON.parse(data).data;
				var piclistArr = data.goods_gallery;
				for (var i = 0; i < piclistArr.length; i++) {
					$(".divslide").append("<li><img src=" + piclistArr[i].filepath + " /></li>");
				}
				$(".macleft img").attr({ "src": piclistArr[0].filepath });
				$(".macright img").attr({ "src": piclistArr[0].filepath });
				//		图片tab切换事件
				$(".divslide img").on("click", function () {
					var oSrc = $(this).attr("src");
					$(".macleft img").attr({ "src": oSrc });
					$(".macright img").attr({ "src": oSrc });
					$(this).parent().css({ "border": "1px solid blue" });
					$(this).parent().siblings().css({ "border": "1px solid #cccccc" });
				});
				var piclistindex = 0;
				if ($(".divslide").children().length > 5) {
					$(".piclist .spanleft").on("click", function () {
						piclistindex--;
						if (piclistindex < 0) {
							piclistindex = 0;
						}
						$(".divslide").stop().animate({ "left": -piclistindex * 94 });
					});
					$(".piclist .spanright").on("click", function () {
						piclistindex++;
						if (piclistindex > $(".divslide").children().length - 5) {
							piclistindex = $(".divslide").children().length - 5;
						}
						$(".divslide").stop().animate({ "left": -piclistindex * 94 });
					});
				}
				//				图片切换结束
				//				右侧鞋的详细信息
				$(".goodsname").html(data.goods_info.brand_en_name);
				$(".goodsnametip").html(data.goods_info.good_name);
				$(".goodshuohao span").html(data.goods_info.barCode);
				$(".goodsprice .price1 span").html(data.goods_info.product_price);
				$(".goodsprice .price2 span").html(data.goods_info.market_price);
				$(".sendstore").html(data.goods_info.mbpage_title);
				$(".pshoucang i").html(data.goods_info.goods_type);
				//				尺码数和颜色，不一定有，需要判断,此处略去
				for (var i = 0; i < data.sku.all[0].attr_val.length; i++) {
					$(".goodscolor .spanleft").html(data.sku.all[0].attr_name);
					$(".colorlist").append("<li>" + data.sku.all[0].attr_val[i].attr_value + "</li>");
				}
				for (var i = 0; i < data.sku.all[1].attr_val.length; i++) {
					$(".goodssize .spanleft").html(data.sku.all[1].attr_name);
					$(".sizelist").append("<li>" + data.sku.all[1].attr_val[i].attr_value + "</li>");
				}
			}
		});
		//		请求详情页下方热销排行及同品牌推荐
		$.ajax({
			type: "get",
			url: "http://api.restful.5lux.com.cn/good/goodsdetail_recommend/?product_id=" + id,
			async: true,
			success: function success(data) {
				var data = JSON.parse(data).data;
				//				console.log(data);
				for (var i = 0; i < data.recommend.length; i++) {
					var oLi = "<li><p class='linum'>" + (i + 1) + "</p><div class='picbox'><img src=" + data.recommend[i].thumb + " /></div><p class='pdesrip'>" + data.recommend[i].sku_title + "</p><p class='pprice'>￥<span>" + data.recommend[i].product_price + "</span></p></li>";
					$(".hotrange").append(oLi);
				}
			}
		});
		$.ajax({
			type: "get",
			url: "http://api.restful.5lux.com.cn/index.php/good/goodsdetail_desc/?goods_id=622773",
			async: true,
			success: function success(data) {
				console.log(JSON.parse(data));
			}
		});
		//		放大镜效果
		$(".macleft").hover(function (e) {
			$(".macright").stop().animate({ "width": "480px", "height": "480px", "left": "490px", "top": "10px" }, 800);
			var e = e || event;
			var x = e.clientX;
			var y = e.clientY;
			var oDrag = $(".macleft .drag");
			oDrag.fadeIn(200);
			oDrag.css({ "left": Math.max(0, Math.min(oDrag.parent().width() - oDrag.width(), x - oDrag.parent().offset().left - oDrag.width() / 2)), "top": Math.max(0, Math.min(oDrag.parent().height() - oDrag.height(), y - oDrag.parent().offset().top + $(window).scrollTop() - oDrag.height() / 2)) });
			$(this).on("mousemove", function (e) {
				var e = e || event;
				var x = e.clientX;
				var y = e.clientY;
				var oLeft = Math.max(0, Math.min(oDrag.parent().width() - oDrag.width(), x - oDrag.parent().offset().left - oDrag.width() / 2));
				var oTop = Math.max(0, Math.min(oDrag.parent().height() - oDrag.height(), y - oDrag.parent().offset().top + $(window).scrollTop() - oDrag.height() / 2));
				oDrag.css({ "left": oLeft, "top": oTop });
				var timesnum = oDrag.parent().width() / oDrag.width();
				$(".macright img").width($(".macleft").width() * timesnum);
				$(".macright img").height($(".macleft").height() * timesnum);
				$(".macright img").css({ "left": -timesnum * oLeft, "top": -timesnum * oTop });
			});
			//添加鼠标滚动事件
			//				$(".macleft").get(0).addEventListener("mousewheel",function(e){
			//					var e=e||event;
			//					var magWid;
			//					var magHei;
			//					if(e.wheelDelta>=120){//向上滚动
			//						magWid=Math.max(60,Math.min(480,$(".macright img").width()+3));
			//						magHei=Math.max(60,Math.min(480,$(".macright img").height()+3));
			//						move(e);
			//					}else{
			//						magWid=Math.max(60,Math.min(480,$(".macright img").width()-3));
			//						magHei=Math.max(60,Math.min(480,$(".macright img").height()-3));
			//						move(e);
			//					}
			//					$(".macright img").width(magWid);
			//					$(".macright img").height(magHei);
			//				});

		}, function () {
			$(".macright").stop().animate({ "width": "0px", "height": "0px", "left": "245px", "top": "245px" }, 800);
			$(".macleft .drag").fadeOut(200);
		});
	});
});