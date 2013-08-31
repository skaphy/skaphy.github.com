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
		var html = "<table class=\"table\">";
		$.each(result, function(key, value) {
			html += "<tr>";
			html += "<td>" + key + "</td><td>" + value + "回</td>";
			html += "</tr>";
		});
		html += "<table>";
		$("#result").html(html);
	};
	reader.readAsText(file);
	$("#mainform").hide();
	$("#result").show();
});

