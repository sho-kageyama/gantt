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
                itemsPerPage: 15,
                months : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                dow : ["日", "月", "火", "水", "木", "金", "土"],
                onItemClick: function(data) {
                    alert("進捗バーがクリックされました。");
                },
                onAddClick: function(dt, rowId) {
                    alert("空白部分がクリックされました。");
                },
                onRender: function() {
                    if (window.console && typeof console.log === "function") {
                        console.log("chart rendered");
                        linePrott();
                    }
                }
            })
         
    
         
});

 function linePrott(){
	 
	var elements = [];
	 for(var i in sourcedata){
		 var element = document.getElementById('progressbar-'+i);
		 var cordinate = element.getBoundingClientRect();
		 console.log('absolute top :'+cordinate.top + window.pageYOffset + '\nabsolute left :' + cordinate.left + window.pageXOffset);
		 elements.push(cordinate);
	 }
	 var top = elements[0].top + window.pageYOffset;
	 var left = elements[0].left + window.pageXOffset;
	 var top2 = elements[1].top + window.pageYOffset;
	 var left2 = elements[1].left + window.pageXOffset;
	 
	 console.log(elements[0] +':'+elements[1]);
	 DrawLine({
			x1: top,
			y1: left,
			x2: top2,
			y2: left2,
		});
	 
	 console.log(elements);
 }
 
 function DrawLine(params) {
	  var param = jQuery.extend({
	              ID: 0
	            , x1: 0
	            , y1: 0
	            , x2: 0
	            , y2: 0
	            , line_style: "solid"
	            , line_color: "#000"
	            , line_width: "1px"
	            , parent: $("div.bar")
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
	  console.log('DrawLine');
	}
 