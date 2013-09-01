"use strict";

$("body").ready(function() {
	if (window.File) {
		
	} else {
		document.write("File APIをサポートしたブラウザが必要です。");
	}
});

$("#tweetszipbtn").click(function() {
	var file = $("#tweetszip").get(0).files[0];
	var reader = new FileReader();
	reader.onload = function(e) {
		var csv = CSVData.parse(e.target.result);
		var csv_text = csv[0].indexOf("text");
		var csv_ts = csv[0].indexOf("timestamp");
		var result = {};
		$.each(csv, function(i, data) {
			if (data[csv_text].indexOf("ちんこ") != -1) {
				// post中にちんこが含まれる
				var date = new Date(Date.parse(data[csv_ts]));
				var datestr = "" + date.getFullYear() + "年" + (date.getMonth()+1) + "月";
				if (typeof(result[datestr]) === 'undefined') result[datestr] = 0;
				result[datestr]++;
			}
		});
		var html = "<div class=\"span5\" style=\"height:200px;overflow:auto;\"><table class=\"table\">";
		$.each(result, function(key, value) {
			html += "<tr>";
			html += "<td>" + key + "</td><td>" + value + "回</td>";
			html += "</tr>";
		});
		html += "</table></div>";
		html += "<div class=\"span7\" style=\"height:200px;overflow:auto;\">";
		html += "<div id=\"graphChincount\" style=\"width:100%;height:200px;\"></div>";
		html += "</div>";
		$("#result").html(html);

		var data = [];
		$.each(result, function(key, value) {
			data.push({month:key, count:value});
		});
		var chart = new AmCharts.AmSerialChart();
		chart.dataProvider = data.reverse();
		chart.categoryField = "month";
		var graph = new AmCharts.AmGraph();
		graph.valueField = "count";
		graph.type = "line";
		graph.bullet = "round";
		graph.balloonText = "[[category]]: [[value]]";
		chart.addGraph(graph);
		chart.write("graphChincount");
	};
	reader.readAsText(file);
	$("#mainform").hide();
	$("#result").show();
});

