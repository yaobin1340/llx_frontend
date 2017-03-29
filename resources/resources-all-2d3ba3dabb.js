angular.module("ohapp").factory("Shops",function($config,$http){var Shops=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.lat="",this.lng="",this.area_code="",this.cate_id="",this.order="",this.shop_name="",this.message="正在加载...",this.backdrop=!0,this.promise=null};return Shops.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apipublic/ApiPmall/getshops",data:{page:this.page,lat:this.lat,lng:this.lng,area_code:this.area_code,order:this.order,cate_id:this.cate_id,shop_name:this.shop_name}}).success(function(data){if(data.success){if(null==data.shop_list||!data.shop_list.length)return void(this.end=!0);for(var items=data.shop_list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},Shops}),angular.module("ohapp").factory("journals",function($config,$http){var journals=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return journals.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apiuser/Money/cashlogs",data:{page:this.page}}).success(function(data){if(data.success){if(null==data.list||!data.list.length)return void(this.end=!0);for(var items=data.list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},journals}),angular.module("ohapp").factory("OfferPay",function($config,$http){var OfferPay=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return OfferPay.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apiuser/Pay/index",data:{page:this.page}}).success(function(data){if(data.success){if(null==data.list||!data.list.length)return void(this.end=!0);for(var items=data.list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},OfferPay}),angular.module("ohapp").factory("system",function($config,$http){var system=function(){this.items=[],this.busy=!1,this.page=1,this.end=!1,this.delay=0,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return system.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apiuser/Message/index",data:{page:this.page}}).success(function(data){if(data.success){if(null==data.msg||!data.msg.length)return void(this.end=!0);for(var items=data.msg,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},system}),angular.module("ohapp").factory("mumber",function($config,$http){var mumber=function(){this.items=[],this.busy=!1,this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return mumber.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apiuser/Message/vipmsg",data:{page:this.page}}).success(function(data){if(data.success){if(null==data.msg||!data.msg.length)return void(this.end=!0);for(var items=data.msg,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},mumber}),angular.module("ohapp").factory("Evaluate",function($config,$http){var Evaluate=function(a){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.totalnum_haspic=0,this.shop_id="",this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return Evaluate.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apipublic/ApiPshop/shopDianPing",data:{shop_id:this.shop_id,page:this.page}}).success(function(data){if(data.success){if(this.totalnum_haspic=data.totalnum_haspic,null==data.list||!data.list.length)return void(this.end=!0);for(var items=data.list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},Evaluate}),angular.module("ohapp").factory("payShop",function($config,$http){var payShop=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return payShop.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apishop/ApiSorder/index",data:{page:this.page,keyword:this.mobile}}).success(function(data){if(data.success){if(null==data.list||!data.list.length)return void(this.end=!0);for(var items=data.list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},payShop}),angular.module("ohapp").factory("shopFans",function($config,$http){var shopFans=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return shopFans.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apishop/Fans",data:{page:this.page,keyword:this.mobile}}).success(function(data){if(data.success){if(null==data.list||!data.list.length)return void(this.end=!0);for(var items=data.list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},shopFans}),angular.module("ohapp").factory("journalShop",function($config,$http){var journalShop=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return journalShop.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apishop/Money/cashlogs",data:{page:this.page}}).success(function(data){if(data.success){if(null==data.list||!data.list.length)return void(this.end=!0);for(var items=data.list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},journalShop}),angular.module("ohapp").factory("xiubiShop",function($config,$http){var xiubiShop=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.lat="",this.lng="",this.area_code="",this.cate_id="",this.order="",this.cate_name="",this.message="正在加载...",this.backdrop=!0,this.promise=null};return xiubiShop.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apipublic/ApiPjf/goods_list",data:{page:this.page}}).success(function(data){if(data.success){if(null==data.goods_list||!data.goods_list.length)return void(this.end=!0);for(var items=data.goods_list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},xiubiShop}),angular.module("ohapp").factory("Address",function($config,$http){var Address=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.shop_id="",this.adrId="",this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return Address.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apiuser/Adr/index",data:{page:this.page}}).success(function(data){if(data.success){if(null==data.addr||!data.addr.length)return void(this.end=!0);for(var items=data.addr,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},Address}),angular.module("ohapp").factory("evaluatePr",function($config,$http){var evaluatePr=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.goods_id="",this.orderby="",this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return evaluatePr.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apipublic/ApiPshop/goodsdianPing",data:{goods_id:this.goods_id,page:this.page,orderby:this.orderby}}).success(function(data){if(data.success){if(null==data.list||!data.list.length)return void(this.end=!0);for(var items=data.list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},evaluatePr}),angular.module("ohapp").factory("xiubiCart",function($config,$http){var xiubiCart=function(a){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.orderby="",this.status="",this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return xiubiCart.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apiuser/Apijf/order_list",data:{page:this.page,status:this.status}}).success(function(data){if(data.success){if(null==data.order_list||!data.order_list.length)return void(this.end=!0);for(var items=data.order_list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},xiubiCart}),angular.module("ohapp").factory("CartIndent",function($config,$http){var CartIndent=function(a){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.orderby="",this.aready="",this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return CartIndent.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apiuser/Orderinfo/orderlist",data:{page:this.page,aready:this.aready}}).success(function(data){if(data.success){if(null==data.order_list||!data.order_list.length)return void(this.end=!0);for(var items=data.order_list,goods=data.goods,arr=[],i=0;i<items.length;i++){for(var j=0;j<goods.length;j++)items[i].order_id==goods[j].order_id&&arr.push(goods[j]);this.items.push({orders:items[i],goods:arr}),arr=[]}this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},CartIndent}),angular.module("ohapp").factory("money",function($config,$http){var money=function(){this.items=[],this.busy=!1,this.page=1,this.end=!1,this.minDuration=0,this.bg_date="",this.end_date="",this.message="正在加载...",this.backdrop=!0,this.promise=null};return money.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apiuser/Money/detail",data:{page:this.page,bg_date:this.bg_date,end_date:this.end_date}}).success(function(data){if(data.success){if(null==data.list||!data.list.length)return void(this.end=!0);for(var items=data.list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},money}),angular.module("ohapp").factory("shopMoney",function($config,$http){var shopMoney=function(){this.items=[],this.busy=!1,this.page=1,this.end=!1,this.minDuration=0,this.bg_date="",this.end_date="",this.message="正在加载...",this.backdrop=!0,this.promise=null};return shopMoney.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apishop/Money/detail",data:{page:this.page,bg_date:this.bg_date,end_date:this.end_date}}).success(function(data){if(data.success){if(null==data.list||!data.list.length)return void(this.end=!0);for(var items=data.list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},shopMoney}),angular.module("ohapp").factory("xiubi",function($config,$http){var xiubi=function(){this.items=[],this.busy=!1,this.page=1,this.end=!1,this.minDuration=0,this.bg_date="",this.end_date="",this.message="正在加载...",this.backdrop=!0,this.promise=null};return xiubi.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apishop/Money/detail",data:{page:this.page,bg_date:this.bg_date,end_date:this.end_date}}).success(function(data){if(data.success){if(null==data.list||!data.list.length)return void(this.end=!0);for(var items=data.list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},xiubi}),angular.module("ohapp").factory("loveShop",function($config,$http){var loveShop=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return loveShop.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apiuser/Sc/sc_fd_list",data:{page:this.page}}).success(function(data){if(data.success){if(null==data.list||!data.list.length)return void(this.end=!0);for(var items=data.list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},loveShop}),angular.module("ohapp").factory("lovePro",function($config,$http){var lovePro=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return lovePro.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apiuser/Sc/sc_good_list",data:{page:this.page}}).success(function(data){if(data.success){if(null==data.list||!data.list.length)return void(this.end=!0);for(var items=data.list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},lovePro}),angular.module("ohapp").factory("weichart",function($config,$http){var weichart=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return weichart.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apiuser/Wxtx/Wxtx_list",data:{page:this.page}}).success(function(data){if(data.success){if(null==data.list||!data.list.length)return void(this.end=!0);for(var items=data.list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},weichart}),angular.module("ohapp").factory("Loveshow",function($config,$http,$sce){var Loveshow=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return Loveshow.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apixiu/Xiuuser/get_xf_list",data:{page:this.page}}).success(function(data){function a(publishTime){function rd(d){return d<10?"0"+d:d}var d_minutes,d_hours,d_days,d;if(d=timeNow-publishTime,d_days=parseInt(d/86400),d_hours=parseInt(d/3600),d_minutes=parseInt(d/60),d_days>0&&d_days<9)items[i].cdate=d_days+"天前";else if(d_days<=0&&d_hours>0)items[i].cdate=d_hours+"小时前";else if(d_hours<=0&&d_minutes>0)items[i].cdate=d_minutes+"分钟前";else if(0==d_minutes)items[i].cdate="刚刚";else{var s=new Date(1e3*publishTime);items[i].cdate=s.getFullYear()+"-"+rd(s.getMonth()+1)+"-"+rd(s.getDate())+" "+rd(s.getHours())+":"+rd(s.getMinutes())+":"+rd(s.getSeconds())}}if(data.success){if(null==data.list||!data.list.length)return void(this.end=!0);for(var imgs,items=data.list,timeNow=parseInt((new Date).getTime()/1e3),i=0;i<items.length;i++){a(items[i].create_time),imgs=[];for(var j=0;j<items[i].pic.length;j++)""!=items[i].pic[j]&&imgs.push(items[i].pic[j]);items[i].pic=imgs,this.items.push(items[i])}this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},Loveshow}),angular.module("ohapp").factory("Lovepersonal",function($config,$http){var Lovepersonal=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.order=1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return Lovepersonal.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apixiu/Xiupublic/xiu_list_all",data:{page:this.page,order:this.order}}).success(function(data){function a(publishTime){function rd(d){return d<10?"0"+d:d}var d_minutes,d_hours,d_days,d;if(d=timeNow-publishTime,d_days=parseInt(d/86400),d_hours=parseInt(d/3600),d_minutes=parseInt(d/60),d_days>0&&d_days<9)items[i].create_time=d_days+"天前";else if(d_days<=0&&d_hours>0)items[i].create_time=d_hours+"小时前";else if(d_hours<=0&&d_minutes>0)items[i].create_time=d_minutes+"分钟前";else if(0==d_minutes)items[i].create_time="刚刚";else{var s=new Date(1e3*publishTime);items[i].create_time=s.getFullYear()+"-"+rd(s.getMonth()+1)+"-"+rd(s.getDate())+" "+rd(s.getHours())+":"+rd(s.getMinutes())+":"+rd(s.getSeconds())}}if(data.success){if(null==data.list||!data.list.length)return void(this.end=!0);for(var items=data.list,timeNow=parseInt((new Date).getTime()/1e3),i=0;i<items.length;i++)a(items[i].linux_time),this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},Lovepersonal}),angular.module("ohapp").factory("evaluatePr",function($config,$http){var evaluatePr=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.goods_id="",this.orderby="",this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return evaluatePr.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apipublic/ApiPshop/goodsdianPing",data:{goods_id:this.goods_id,page:this.page,orderby:this.orderby}}).success(function(data){if(data.success){if(null==data.list||!data.list.length)return void(this.end=!0);for(var items=data.list,i=0;i<items.length;i++)this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},evaluatePr}),angular.module("ohapp").factory("Loveshop",function($config,$http,$sce){var Loveshop=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.order=1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return Loveshop.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=$http({method:"POST",url:$config.api_uri+"/Apixiu/Xiupublic/xiushop_list_all",data:{page:this.page,order:this.order}}).success(function(data){function a(publishTime){function rd(d){return d<10?"0"+d:d}var d_minutes,d_hours,d_days,d;if(d=timeNow-publishTime,d_days=parseInt(d/86400),d_hours=parseInt(d/3600),d_minutes=parseInt(d/60),d_days>0&&d_days<9)items[i].create_time=d_days+"天前";else if(d_days<=0&&d_hours>0)items[i].create_time=d_hours+"小时前";else if(d_hours<=0&&d_minutes>0)items[i].create_time=d_minutes+"分钟前";else if(0==d_minutes)items[i].create_time="刚刚";else{var s=new Date(1e3*publishTime);items[i].create_time=s.getFullYear()+"-"+rd(s.getMonth()+1)+"-"+rd(s.getDate())+" "+rd(s.getHours())+":"+rd(s.getMinutes())+":"+rd(s.getSeconds())}}if(data.success){if(null==data.list||!data.list.length)return void(this.end=!0);for(var items=data.list,timeNow=parseInt((new Date).getTime()/1e3),i=0;i<items.length;i++)a(items[i].linux_time),this.items.push(items[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},Loveshop});