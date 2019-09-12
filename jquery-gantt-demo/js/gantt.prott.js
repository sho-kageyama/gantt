 $(function() {
            "use strict";
            var today = moment();
            console.log(today);
            $(".gantt").gantt({
                source: sourcedata,
                navigate: "scroll",
                scale: "days",
                minScale: "days",
                maxScale: "months",
                itemsPerPage: 7,
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
                    }
                }
            });
        });