var IP = "http://10.178.30.78";
//var IP = "http://192.168.192.35";
function str(str) {
	return JSON.stringify(str);
}

var QueryString = function() {
	// This function is anonymous, is executed immediately and
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for(var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		// If first entry with this name
		if( typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = pair[1];
			// If second entry with this name
		} else if( typeof query_string[pair[0]] === "string") {
			var arr = [query_string[pair[0]], pair[1]];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(pair[1]);
		}
	}
	return query_string;
}();
/*
 * generates a dialog
 */
function generateWindow(page) {
	$("#dialog").load(page).dialog({
		show : "blind",
		hide : "explode",
		position : 'center',
		modal : true,
		height : $(window).height() - 200,
		width : $(window).width() - 300,
		resizable : false,
		close : function(ev, ui) {
			$(this).html("");
		}
	});
}

function selectClasses() {
	var staffID = QueryString.id;
	params = {};
	params.fcn = 'selectClasses';
	params.params = {
		staffID : staffID
	}
	jQuery.getJSON(IP + "/mark/model/classes-model.php?callback=?", params, function(data) {
		if(data[0] == 0) {
			$("#error_text").html(data[1]);
			$("#error_msg").show();
		} else if(data[0] == 1){
			x = data;
			var list = "";
			for(var i = 0; i < data[1].length; i++) {
				$("#selectClasses_sem" + data[1][i][4]).append('<li class="pureCssMenui"><a class="pureCssMenui" class_button="true" id="' + data[1][i][0] + '" href="#">' + data[1][i][1] + '</a></li>');
			}
			selectedClass = $("#selectClasses_sem1").children().eq(0).children().eq(0).attr('id');
			$("#menu_visible_class,#title_class_name").html($("#selectClasses_sem1").children().eq(0).children().eq(0).html());
			$("#menu_visible_class").attr("class_id", selectedClass);
			try {
				buildStudents("studentSelect_div");
			} catch(err) {
			}
		}else if (data[0] == -1){
			window.location.href = "index.html?err=" + data[1] + "";
		}
	});
}
function clearExpAndLrn(){
	$("#learningList").children().each(function(){
		$(this).remove();
	})
	$("#expList").children().each(function(){
		$(this).remove();
	})
}
