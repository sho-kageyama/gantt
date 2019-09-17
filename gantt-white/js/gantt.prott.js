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
	var x =[];
	var y = [];
     
     var dataPanel = $('.dataPanel')[0];
     console.log(dataPanel);
     
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
	            , line_style: "dashed"
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
 
