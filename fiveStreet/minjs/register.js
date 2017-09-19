"use strict";

require(["config"], function () {
	require(["jquery", "common"], function ($, co) {
		$(window).load(function () {
			$.ajax({
				type: "get",
				url: "commonfooter.html",
				async: true,
				success: function success(data) {
					$(".alertfoot").html(data);
				}
			});
			var part = {
				userreg: /[\u2E80-\u9FFF0-9a-zA-Z\-\_]{6,12}/,
				phonereg: /^[1]{1}[3|5|7|8]{1}[0-9]{9}/
			};
			var codeArr = [{
				"src": "../img/1799.png",
				"num": "1799"
			}, {
				"src": "../img/38R9.png",
				"num": "38R9"
			}, {
				"src": "../img/476N.png",
				"num": "476N"
			}, {
				"src": "../img/5US8.png",
				"num": "5US8"
			}, {
				"src": "../img/BDK4.png",
				"num": "BDK4"
			}];
			var usernameArr = JSON.parse(co.Cookie.get("usernames")) == null ? [] : JSON.parse(co.Cookie.get("usernames"));
			var passwordArr = JSON.parse(co.Cookie.get("userpasswords")) == null ? [] : JSON.parse(co.Cookie.get("userpasswords"));
			//			手机号正则验证及cookie的存取,以及短信验证码的获取
			//			手机框获取焦点
			$(".phonenumval").on("dblclick", function () {
				$(".numlist").show();
				if (usernameArr.length != 0) {
					var str = "";
					for (var i = 0; i < usernameArr.length; i++) {
						str += "<li>" + usernameArr[i] + "</li>";
					}
					$(".numlist").html(str);
				}
				$(".numlist").on("click", $("li"), function (e) {
					var e = e || event;
					var target = e.target || e.srcElement;
					$(".phonenumval").val(target.innerText);
					$(".numlist").html("");
					$(".numlist").hide();
				});
				$("body").not(".numlist").on("click", function () {
					$(".numlist").html("");
					$(".numlist").hide();
				});
			});
			//			手机框keyup事件,会和cookie中数据比对,匹配的显示
			//			$(".phonenumval").on("keyup",function(){
			//				$(".numlist").show();
			//				var phonenum=$(".phonenumval").val();
			//				if(usernameArr.length!=0){
			//					for(var i=0;i<usernameArr.length;i++){
			//						var str="";
			//						var arr=phonenum.split("");
			//						arr.every(function(item,index){
			//							return item=
			//						});
			//						for(var j=0;j<phonenum.length;j++){
			//							var oListr="";
			//							if(phonenum[j]==usernameArr[i][j]){
			//								oListr="<li>"+usernameArr[i]+"</li>";
			//							}else{
			//								
			//							}
			//						}
			//						str+=oListr;
			//					}
			//					$(".numlist").html(str);
			//				}
			//			});
			//			手机框失去焦点
			$(".phonenumval").on("blur", function () {
				if (part.phonereg.test($(".phonenumval").val())) {
					$(".numwarn").hide();
					//			获取验证码点击,短信验证模态框出现
					if ($(".phonenum .getcode").html() == "获取验证码") {
						$(".phonenum .getcode").on("click", function () {
							$(".alertWrap").fadeIn(300);
							$(".alertdrag .phoneinp").val($(".phonenumval").val());
						});
					}
				} else {
					$(".numwarn").show();
				}
			});
			//			密码框验证事件
			$(".passw .passwval").on("blur", function () {
				var $this = $(this);
				if (part.userreg.test($this.val())) {
					$(".paswarn").hide();
				} else {
					$(".paswarn").show();
				}
			});
			//			确认密码框验证
			$(".surepassw .surepasswval").on("blur", function () {
				if ($(this).val() == $(".passw .passwval").val()) {
					$(".surepaswarn").hide();
				} else {
					$(".surepaswarn").show();
				}
			});
			//			随机产生一个验证码,且对应正确才可
			createCode();
			//			随机验证码函数
			function createCode() {
				var index = 0;
				$(".imgcode").attr({ "src": codeArr[index].src });
				$(".labimgcode a").on("click", function () {
					var newindex = Math.floor(Math.random() * codeArr.length);
					while (newindex == index) {
						newindex = Math.floor(Math.random() * codeArr.length);
					}
					$(".imgcode").attr({ "src": codeArr[newindex].src });
					$(".shibiecode").on("blur", checkcode);
					function checkcode() {
						if ($(".shibiecode").val() == codeArr[newindex].num) {
							$(".rigcode").text("请输入图形识别码").css({ "color": "#666666" });
							//********短信点击事件*********，后续添加
						} else {
							$(".rigcode").text("*请输入此图形识别码").css({ "color": "#cf0101" });
						}
					}
					checkcode();

					index = newindex;
				});
			}
			//			模态验证狂的X点击,消失
			$(".alertcancle").on("click", function () {
				$(".alertWrap").fadeOut(300, function () {
					$(".alertdrag .phoneinp").val("");
				});
			});
			//			注册点击存cookie
			$(".register .clibtn").on("click", function () {

				usernameArr.push($(".phonenumval").val());
				passwordArr.push($(".passwval").val());
				console.log(usernameArr);
				console.log(passwordArr);
				//				console.log(JSON.parse(co.Cookie.get("usernames")));
				co.Cookie.set("usernames", JSON.stringify(usernameArr), 30, "/");
				co.Cookie.set("userpasswords", JSON.stringify(passwordArr), 30, "/");
			});
		});
	});
});