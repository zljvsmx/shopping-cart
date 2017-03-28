$(function(){
	var mark=0;
	$(".car").on("click",function(){
		if(mark==0){
			$("#carlist").animate({marginRight:"0px"},500)
			mark=1;
		}else{
			$("#carlist").animate({marginRight:"-260px"},500)
			mark=0
		}
	})

	//点击购买按钮添加至购物车
	var buyButton=$(".buy");
	buyButton.on("click",BuyClick)
	
	function BuyClick(){
		var thingsName=$(this).parents("li").find(".things_name").text();
		var thingsPrice=$(this).parent().find("i").text();
		var thingsImage=$(this).parents("li").find("img").attr("src");
		var kNum=$(this).parents("li").attr("num")
		var Geshu=1;
		$(this).off("click").text("已经添加至购物车");
		
		
		
		
		$(".list").append('<div class="select things" num='+kNum+'><img src='+thingsImage+'/><p class="name">'+thingsName+'</p><p class="price">$<i>'+thingsPrice+'</i></p><ul class="caozuo"><li class="zengjian"><span class="minus">-</span><span>1</span><span class="add">+</span></li><li class="del">删除</li></ul></div>');
		countTotalPrice();
		totalGeshu();
		
		
		
		
		//点击加号添加商品个数
		
		$(".add").off("click").on("click",function(){
			Geshu=parseInt($(this).parent().find("span:nth-of-type(2)").text())
			Geshu++
			$(this).parent().find("span:nth-of-type(2)").text(Geshu)
			countTotalPrice();
			totalGeshu();
		})
		
		//动态生成的元素点击减号减少商品个数
		$(".minus").off("click").on("click",function(){
			Geshu=parseInt($(this).parent().find("span:nth-of-type(2)").text());
			if(Geshu>1){
				Geshu--;
				$(this).parent().find("span:nth-of-type(2)").text(Geshu)
			}else{
				Geshu==1;
			}
			countTotalPrice();
			totalGeshu();
		})
		
		//删除购物车内的商品
		var del=$(".del");
		del.each(function(){
			$(this).off("click").on("click",function(){
				var delName=$(this).parents(".things").find(".name").text();
				$(this).parents(".things").remove();
				countTotalPrice();
				totalGeshu();
				var oldBtn=$("#container ul li").find("span:contains("+delName+")").parents("li").find(".buy")
				oldBtn.on("click",BuyClick).text("点击购买")
			})
		})

		//计算总价函数
		function countTotalPrice(){			
			var totalPrice=0,listThings=$(".list").find(".things");
			for (var i=0;i<listThings.length;i++) {
				var this_geshu=parseInt(listThings.eq(i).find(".zengjian span:nth-of-type(2)").text());
				var this_price=parseInt(listThings.eq(i).find(".price i").text());
				totalPrice+=this_geshu*this_price;
			}
			$(".total span").eq(1).text(totalPrice);
			totalGeshu();
		}
		
		//购物车上的商品总数
		function totalGeshu(){
			var listThings=$(".list").find(".things");
			if (listThings.length>0) {
				var totalGeshu=0;
				listThings.each(function(){
					var this_geshu=parseInt($(this).find(".zengjian span:nth-of-type(2)").text());
					totalGeshu+=this_geshu;
				})
				$(".carLogo span").html(totalGeshu)
			} else{
				$(".carLogo span").css("display","none")
			}
		}
	}
})
	

