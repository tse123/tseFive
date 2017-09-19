define(["jquery"],function($){
	return function (data) {

			$(".myfive").hover(function() {
				$(this).css({
					"background": "white",
					"border-color": "#dfdfdf"
				}).find("ul").show();
				$(this).find(".tip a").css({
					"color": "#c69c6d"
				});
				$(this).find(".tip .trigona").css({
					"border-bottom": "5px solid #cc0000",
					"border-top": "0"
				});
			}, function() {
				$(this).css({
					"background": "#f2f2f2",
					"border-color": "#f2f2f2"
				}).find("ul").hide();
				$(this).find(".tip a").css({
					"color": "#666666"
				});
				$(this).find(".tip .trigona").css({
					"border-top": "5px solid #666666",
					"border-bottom": "0"
				});
			});
			$(".noborder").hover(function() {
				$(this).css({
					"borderColor": "#dfdfdf",
					"background": "white"
				}).find(".loadimg").show();
			}, function() {
				$(this).css({
					"borderColor": "#f2f2f2",
					"background": "#f2f2f2"
				}).find(".loadimg").hide();
			});

			//-------------------搜索框搜索下拉菜单---------------------//
			$(".inp").on("focus keyup",function(){
				$.ajax({
					type:"get",
					url:"http://suggestion.baidu.com/su?wd=" + $(".inp").val(),
					dataType:"jsonp",
					jsonp:"cb",
					success:function(data){
						var oUL=$("<ul>");
						for(var i=0;i<data.s.length;i++){
							var oLi=$("<li>");
							oLi.html(data.s[i]);
							oUL.append(oLi);
						}
						$(".selectbox").html("");
						$(".selectbox").append(oUL);
						$(".selectbox").on("click",$("li"), function(e) {
							var e = e || event;
							var target = e.target || e.srcElement;					
							$(".inp").val(target.innerText);
							$(".selectbox").html("");	
						});
//						$("body").not(".selectbox").on("click",function(){
//							$(".selectbox").html("");
//							$(".numlist").hide();
//						});
					}
				});
			});
			
			
			//					购物菜单块划过效果
			$(".shopdiv").hover(function() {
				$(".shopgoods").show();
			}, function() {
				$(".shopgoods").hide();
			});
		}

		
})
