let sourcedata = [ {
	id: 1,
	type:"plan",
	name : "Java基礎",
	desc : "Java基礎15門",
	values : [ {
		from : "2019-09-02",
		to : "2019-09-04",
		label : "3days",
		customClass : "ganttRed"
	} ]
}, {
	id : 2,
	type:"plan",
	name : " ",
	desc : "じゃんけん課題",
	values : [ {
		from : "2019-09-05",
		to : "2019-09-09",
		label : "4days",
		customClass : "ganttblue"
	} ]
},
{
	id:3,
	type:"plan",
	name : " ",
	desc : "電卓課題",
	values : [ {
		from : "2019-09-10",
		to : "2019-09-12",
		label : "3days",
		customClass : "ganttRed"
	} ]
},
{
	id:4,
	type:"plan",
	name : "DB基礎課題",
	desc : "SQL基礎問題",
	values : [ {
		from : "2019-09-13",
		to : "2019-09-17",
		label : "3days",
		customClass : "ganttOrange"
	} ]
},
{
	id:5,
	type:"plan",
	name : "Web課題",
	desc : "SpringMvc課題",
	values : [ {
		from : "2019-09-18",
		to : "2019-09-20",
		label : "3days",
		customClass : "ganttOrange"
	} ]
},
{
	id:6,
	type:"plan",
	name : "",
	desc : "施設予約管理",
	values : [ {
		from : "2019-09-23",
		to : "2019-10-04",
		label : "15days",
		customClass : "ganttGreen"
	} ]
},
{
	id:1,
	type:"result",
	name : "",
	desc : "java基礎実績",
	values : [ {
		from : "2019-09-2",
		to : "2019-09-03",
		label : "result",
		customClass : "ganttOrange"
	} ]
},
{
	id:2,
	type:"result",
	name : "",
	desc : "janken実績",
	values : [ {
		from : "2019-09-04",
		to : "2019-09-05",
		label : "result",
		customClass : "ganttblue"
	} ]
}

]


window.onload = () =>{
	
	sourcedata.sort(function(a,b){
		if(a.id > b.id){
			return 1;
		}else if(a.id == b.id){
			return 0;
		}else{
			return -1;
		}
		
	});
	
	console.log(sourcedata);
	
	return sourcedata;
}
