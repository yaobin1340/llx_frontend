angular.module("ohapp").factory("Shops",function(t,s){var i=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.lat="",this.lng="",this.area_code="",this.cate_id="",this.order="",this.shop_name="",this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apipublic/ApiPmall/getshops",data:{page:this.page,lat:this.lat,lng:this.lng,area_code:this.area_code,order:this.order,cate_id:this.cate_id,shop_name:this.shop_name}}).success(function(t){if(t.success){if(null==t.shop_list||!t.shop_list.length)return void(this.end=!0);for(var s=t.shop_list,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("journals",function(t,s){var i=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apiuser/Money/cashlogs",data:{page:this.page}}).success(function(t){if(t.success){if(null==t.list||!t.list.length)return void(this.end=!0);for(var s=t.list,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("OfferPay",function(t,s){var i=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apiuser/Pay/index",data:{page:this.page}}).success(function(t){if(t.success){if(null==t.list||!t.list.length)return void(this.end=!0);for(var s=t.list,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("system",function(t,s){var i=function(){this.items=[],this.busy=!1,this.page=1,this.end=!1,this.delay=0,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apiuser/Message/index",data:{page:this.page}}).success(function(t){if(t.success){if(null==t.msg||!t.msg.length)return void(this.end=!0);for(var s=t.msg,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("mumber",function(t,s){var i=function(){this.items=[],this.busy=!1,this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apiuser/Message/vipmsg",data:{page:this.page}}).success(function(t){if(t.success){if(null==t.msg||!t.msg.length)return void(this.end=!0);for(var s=t.msg,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("Evaluate",function(t,s){var i=function(t){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.totalnum_haspic=0,this.shop_id="",this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apipublic/ApiPshop/shopDianPing",data:{shop_id:this.shop_id,page:this.page}}).success(function(t){if(t.success){if(this.totalnum_haspic=t.totalnum_haspic,null==t.list||!t.list.length)return void(this.end=!0);for(var s=t.list,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("payShop",function(t,s){var i=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apishop/ApiSorder/index",data:{page:this.page,keyword:this.mobile}}).success(function(t){if(t.success){if(null==t.list||!t.list.length)return void(this.end=!0);for(var s=t.list,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("shopFans",function(t,s){var i=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apishop/Fans",data:{page:this.page,keyword:this.mobile}}).success(function(t){if(t.success){if(null==t.list||!t.list.length)return void(this.end=!0);for(var s=t.list,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("journalShop",function(t,s){var i=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apishop/Money/cashlogs",data:{page:this.page}}).success(function(t){if(t.success){if(null==t.list||!t.list.length)return void(this.end=!0);for(var s=t.list,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("xiubiShop",function(t,s){var i=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.lat="",this.lng="",this.area_code="",this.cate_id="",this.order="",this.cate_name="",this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apipublic/ApiPjf/goods_list",data:{page:this.page}}).success(function(t){if(t.success){if(null==t.goods_list||!t.goods_list.length)return void(this.end=!0);for(var s=t.goods_list,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("Address",function(t,s){var i=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.shop_id="",this.adrId="",this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apiuser/Adr/index",data:{page:this.page}}).success(function(t){if(t.success){if(null==t.addr||!t.addr.length)return void(this.end=!0);for(var s=t.addr,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("evaluatePr",function(t,s){var i=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.goods_id="",this.orderby="",this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apipublic/ApiPshop/goodsdianPing",data:{goods_id:this.goods_id,page:this.page,orderby:this.orderby}}).success(function(t){if(t.success){if(null==t.list||!t.list.length)return void(this.end=!0);for(var s=t.list,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("xiubiCart",function(t,s){var i=function(t){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.orderby="",this.status="",this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apiuser/Apijf/order_list",data:{page:this.page,status:this.status}}).success(function(t){if(t.success){if(null==t.order_list||!t.order_list.length)return void(this.end=!0);for(var s=t.order_list,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("CartIndent",function(t,s){var i=function(t){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.orderby="",this.aready="",this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apiuser/Orderinfo/orderlist",data:{page:this.page,aready:this.aready}}).success(function(t){if(t.success){if(null==t.order_list||!t.order_list.length)return void(this.end=!0);for(var s=t.order_list,i=t.goods,e=[],h=0;h<s.length;h++){for(var n=0;n<i.length;n++)s[h].order_id==i[n].order_id&&e.push(i[n]);this.items.push({orders:s[h],goods:e}),e=[]}this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("money",function(t,s){var i=function(){this.items=[],this.busy=!1,this.page=1,this.end=!1,this.minDuration=0,this.bg_date="",this.end_date="",this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apiuser/Money/detail",data:{page:this.page,bg_date:this.bg_date,end_date:this.end_date}}).success(function(t){if(t.success){if(null==t.list||!t.list.length)return void(this.end=!0);for(var s=t.list,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("shopMoney",function(t,s){var i=function(){this.items=[],this.busy=!1,this.page=1,this.end=!1,this.minDuration=0,this.bg_date="",this.end_date="",this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apishop/Money/detail",data:{page:this.page,bg_date:this.bg_date,end_date:this.end_date}}).success(function(t){if(t.success){if(null==t.list||!t.list.length)return void(this.end=!0);for(var s=t.list,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("xiubi",function(t,s){var i=function(){this.items=[],this.busy=!1,this.page=1,this.end=!1,this.minDuration=0,this.bg_date="",this.end_date="",this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apishop/Money/detail",data:{page:this.page,bg_date:this.bg_date,end_date:this.end_date}}).success(function(t){if(t.success){if(null==t.list||!t.list.length)return void(this.end=!0);for(var s=t.list,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("loveShop",function(t,s){var i=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apiuser/Sc/sc_fd_list",data:{page:this.page}}).success(function(t){if(t.success){if(null==t.list||!t.list.length)return void(this.end=!0);for(var s=t.list,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i}),angular.module("ohapp").factory("lovePro",function(t,s){var i=function(){this.items=[],this.busy=!1,this.after="",this.page=1,this.end=!1,this.minDuration=0,this.message="正在加载...",this.backdrop=!0,this.promise=null};return i.prototype.nextPage=function(){this.busy||this.end||(this.busy=!0,this.promise=s({method:"POST",url:t.api_uri+"/Apiuser/Sc/sc_good_list",data:{page:this.page}}).success(function(t){if(t.success){if(null==t.list||!t.list.length)return void(this.end=!0);for(var s=t.list,i=0;i<s.length;i++)this.items.push(s[i]);this.after="t3_"+this.items[this.items.length-1].id,this.busy=!1,this.page++}}.bind(this)))},i});