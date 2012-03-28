function selectClasses(staffID)
{
	params = {};
	params.fcn = 'login';
	params.params = {
		user : user,
		pass : pass
	}
	jQuery.getJSON("http://192.168.192.35/mark/model/classes-model.php?callback=?", params, function(data) {
		if(!data[0]) {
			$("#error_text").html(data[1][0]);
			$("#error_msg").show();
		}else{
			
		}
	});
}
//code wholesale copied from the login method because I'm too tired to think today