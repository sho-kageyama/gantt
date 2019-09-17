 $(window).on('load',function() {
            "use strict";
            var today = moment();
            console.log(today);
    
            $(".gantt").gantt({
                source: sourcedata,
                navigate: "scroll",
                scale: "days",
                minScale: "days",
                maxScale: "months",
                itemsPerPage: 10,
                months : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                dow : ["日", "月", "火", "水", "木", "金", "土"],
                onItemClick: function(data) {
                   // alert("進捗バーがクリックされました。");
                	console.log(data);
                },
                onMouseOver : function(data, e){
                	console.log(data);
                	console.log(data.style.width);
                	var style = $(data).attr('style');
                	var left = Number(data.style.left.replace('px',''));
            
                	var that = $('div.dataPanel')[0];
                	var x,y = panelXY(e,that);
                	console.log('X :' + x + ' Y :'+ y);
                	var width;
                	//$(data).attr('style', ''+style+'width:'+width+'px;');
                	
                	console.log('カーソルが乗りました');
                	
                	$(data).mousedown(function(){
                		console.log('mouseDown');
                		var z = panelXY(e,that);
                    	console.log('X :' + z[0] + ' Y :'+ z[1]);
                    	width = z[0] - left;
//                    	$(data).attr('style', ''+style+'width:'+width+'px;');
                	}).mouseup(function(){
                		console.log('mouseUp');
                		console.log(width);
                		$(data).attr('style', ''+style+'width:'+width+'px;');
                		linePrott();
                	});
                	
                },
                onAddClick: function(dt, rowId) {
//                    alert("空白部分がクリックされました。");
                },
                onRender: function() {
                	linePrott();
                    if (window.console && typeof console.log === "function") {
                        console.log("chart rendered");
                        horidayPrott();
                        
                    }
                }
            })
         
    
         
});

function horidayPrott(){
 var saturday = document.getElementsByClassName('day sa');
	 
	 for(var i in saturday){
		 if(saturday[i].getBoundingClientRect() != null){
			 DrawBox({
					left:saturday[i].getBoundingClientRect().left,
				 });
		 }else{
			 console.log('rect none');
		 }
	 }
}


function panelXY(e, that){
	if(!e){
		e = window.event;
	}
	
	var x,y;
	
	if(e.targetTouches){
		x = e.targetTouches[0].pageX - e.targetOffsetLeft;
		y = e.targetTouches[0].pageY - e.targetOffsetTop;
	}else{
		x = e.pageX - that.getBoundingClientRect().left;
		y = e.pageY - that.getBoundingClientRect().top;
	}
	
	
	return [x,y];
}

 
 
 function linePrott(){
	 $('.line').remove();
	 
	var x =[];
	var y = [];
     
     var dataPanel = $('.dataPanel')[0];
     
	 for(var i in sourcedata){
		 var element = document.getElementById('progressbar-'+i);
		 y.push(Number(element.style.top.replace('px','')));
		 x.push(Number(element.style.left.replace('px','')) + element.getBoundingClientRect().width);
	 }
	
	 for(var i = 0;i< sourcedata.length-1;i++){
		 var l = Number(i)+1;
		 DrawLine({
			 x1:x[i],
			 y1:y[i],
			 x2:x[l],
			 y2:y[l]
		 });
	 }
	 
	
	 
	 
 }
 
 function DrawLine(params) {
	  var param = jQuery.extend({
	              ID: 0
	            , x1: 0
	            , y1: 0
	            , x2: 0
	            , y2: 0
	            , line_style: "solid"
	            , line_color: "black"
	            , line_width: "1px"
	            , parent: $("div.dataPanel")
	            , callback: function(){}
	  }, params);
	  if(param.x1 < param.x2){
	    sx = param.x1;
	    sy = param.y1;
	    ex = param.x2;
	    ey = param.y2;
	  }
	  else {
	    sx = param.x2;
	    sy = param.y2;
	    ex = param.x1;
	    ey = param.y1;
	  }
	  var w = Math.sqrt(Math.pow((sx - ex) ,2) + Math.pow((sy - ey) ,2));
	  var base = Math.max(sx, ex) - Math.min(sx, ex);
	  var tall = Math.max(sy, ey) - Math.min(sy, ey);
	  var aTan = Math.atan(tall / base);
	  var deg = aTan * 180 / Math.PI;
	  deg = sy > ey ? 0 - deg: deg;
	  var line = $("<div id=" + param.ID + "></div>")
	    .addClass("line")
	    .css({
	      "left": sx,
	      "top": sy,
	      "width": w,
	      "transform": "rotate(" + deg + "deg)",
	      "-webkit-transform": "rotate(" + deg + "deg)",
	      "border-top-style": param.line_style,
	      "border-top-color": param.line_color,
	      "border-top-width": param.line_width,
	    });
	  $(param.parent).append(line);
	}
 
 
 
 function DrawBox(params) {
	  var param = jQuery.extend({
	              ID: 0
	            , left: 0
	            , parent: $("div.dataPanel")
	            , callback: function(){}
	  }, params);

	  var box = $("<div id=" + param.ID + "></div>")
	    .addClass("box")
	    .css({
	      "left": param.left + 185,
	      "top": -0.2,
	      "height":322,
	      "width": 48,
	    });
	  $(param.parent).append(box);
	}
 
