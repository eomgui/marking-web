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
	$("#dialog").load(page);
	$("#dialog").dialog({
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