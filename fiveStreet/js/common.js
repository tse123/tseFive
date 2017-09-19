define(["jquery"],function($){
	return {
//		节流函数
		throttle:function(cbk,delay){
			var timeout=null;
			return function(){
				clearTimeout(timeout);
				timeout=setTimeout(function(){
					cbk();
				},delay);
			} 
		},
//		图片懒加载函数
		layout:function(imgname){
				function lay(){
					for(var i=0;i<$(imgname).length;i++){
							if(($(imgname).eq(i).offset().top-$(window).scrollTop())<=400&&($(imgname).eq(i).offset().top-$(window).scrollTop())>=0){
								$(imgname).eq(i).attr({"src":$(imgname).eq(i).attr("data-src")});
								
							}
//							else{
//								$(imgname).eq(i).attr({"src":"../img/good_load.gif"});
//							}
					}
				}
				lay();
				$(window).scroll(function(){
					lay();
				});
		},
//		轮播图插件
		carousel:function(obj,time){
			var picnum=$(obj).children().length;
			var picwid=$(obj).children().eq(0).width();
			var picindex=0;
			var timer;
			function automove(){
				timer=setInterval(function(){
					picindex++;
					$(obj).stop().animate({"left":-picindex*picwid},1000,function(){
						if(picindex==picnum-1){
							setTimeout(function(){
								picindex=0;
								$(obj).css({"left":-picindex*picwid});
								
							},0);
						}
					});
					btnchange();
				},time);
			}
			automove();
//			动态添加左右按钮,并添加点击事件
			var oPrev=$("<div>");
			var oNext=$("<div>");
			oPrev.addClass("prev");
			oNext.addClass("next");
			$(obj).parent().append(oPrev);
			$(obj).parent().append(oNext);
			var frag=true;
			oPrev.click(function(){
				if(frag){
					
					clearInterval(timer);
					frag=!frag;
					picindex++;
					btnchange();
					$(obj).stop().animate({"left":-picindex*picwid},1000,function(){
						if(picindex==picnum-1){
							setTimeout(function(){
								picindex=0;
								$(obj).css({"left":-picindex*picwid});
							},0);
						}
						frag=!frag;
						automove();
					});
				}
			});
			oNext.click(function(){
				if(frag){
					frag=!frag;
					clearInterval(timer);
					picindex--;
					btnchange();
					$(obj).stop().animate({"left":-picindex*picwid},1000,function(){
						if(picindex==0){
							setTimeout(function(){
								picindex=picnum-1;
								$(obj).css({"left":-picindex*picwid});
							},0);
						}
						frag=!frag;
						automove();
					});
				}
			});
//			动态添加下方按钮
			var oBtnlist=$("<ul>");
			oBtnlist.addClass("btnlist");
			for(var i=0;i<picnum-1;i++){
				var oLi=$("<li>");
				oBtnlist.append(oLi);
			}
			$(".picWrap").append(oBtnlist);
			oBtnlist.css({"left":($(".picWrap").width()-oBtnlist.width())/2});
			btnchange();
			function btnchange(){
				var btnindex=picindex;
				if(btnindex==picnum-1){
					btnindex=0;
				}
				$(".btnlist li").eq(btnindex).css({"background":"red"}).siblings().css({"background":"white"});
				$(".btnlist li").click(function(){
					clearInterval(timer);
					picindex=$(this).index();
					btnindex=picindex;
					$(".btnlist li").eq(btnindex).css({"background":"red"}).siblings().css({"background":"white"});
					$(obj).stop().animate({"left":-picindex*picwid},1000,function(){
						automove();
					});
				});
			}
			
		},
		template:function(id, data) {
			var str = document.getElementById(id).innerText;
			str = "log(`"+str+"`)";
			str = str.replace(/<%=(.+)%>/g, "`); log($1); log(`");
			str = str.replace(/<%(.+)%>/g, "`); $1 log(`");
			var funcstr = `
				(function(data){
					var htmlstr = "";
					function log(str) {
						htmlstr += str;
					}
					${str};
					return htmlstr;
				})
			`;
			var realfunc = eval(funcstr);
			return realfunc(data);
		},
//		经典箱包块包括模板的轮播函数,连续点击会出现bug
		classicmove:function(obj){
			$(obj).on("click",function(e){
				var $this=$(this);
				var e=e||event;
				$this.target=e.target||e.srcElement;
				$this.index=0;
				$this.find(".btnlist li").eq($this.index).css({"background":"#c77f40"}).siblings().css({"background":"#666666"});
				if($this.target.className=="prevleft"){
					$this.index++;
					$this.find(".btnlist li").eq($this.index).css({"background":"#c77f40"}).siblings().css({"background":"#666666"});
					$this.parent().find(".bagslogolist").stop().animate({"left":-$this.index*220},function(){
						if($this.index>=3){
							$this.index=0;
							$this.find(".btnlist li").eq($this.index).css({"background":"#c77f40"}).siblings().css({"background":"#666666"});
							$this.parent().find(".bagslogolist").stop().css({"left":-$this.index*220});
						}
					});
				}
				if($this.target.className=="nextright"){
					if($this.index<=0){
						$this.index=3;
						$this.parent().find(".bagslogolist").stop().css({"left":-$this.index*220});
					}
					$this.index--;
					$this.find(".btnlist li").eq($this.index).css({"background":"#c77f40"}).siblings().css({"background":"#666666"});
					$this.parent().find(".bagslogolist").stop().animate({"left":-$this.index*220});
				}
			});
		},
		Cookie:{
				set: function(name, value, d, path) {
					var date = new Date();
					date.setDate(date.getDate() + d);
					document.cookie = name + "=" + value + ";" + "expires=" + date + ";" + "path=" + path + ";"
				},
				get: function(name) {
					var list = document.cookie.split("; ");
					for(var i = 0; i < list.length; i++) {
						cooklist = list[i].split("=");
						if(name == cooklist[0]) {
							return cooklist[1];
						}
					}
					return null;
				}
			}
		
	}
});
