// ########### All code in this file is from proxy.queensu.ca ################

function fix_url(url_string) {
	var vars = new Array();
        var go_on = true;

	var query_split = url_string.indexOf('?') + 1;
        if(query_split == 0) {
            go_on = false;
            original = url_string;
        }
        else {
	    var original = url_string.substring(0, query_split);
        }
        var dir_struct = original.substring(original.indexOf('/', 8));
        if(dir_struct.charAt(dir_struct.length - 1) == '?') {
            dir_struct = escape(dir_struct.substring(0, dir_struct.length - 1)) + '?';
        }
        else {
            dir_struct = escape(dir_struct);
        }
        original = original.substring(0, original.indexOf('/', 8));

	var query_string = url_string.substring(query_split);
	vars = query_string.split('&');


	for (var i in vars) {
		var start = vars[i].substring(0, vars[i].indexOf('=') + 1);
		var end = escape(vars[i].substring(vars[i].indexOf('=') + 1));
		end = end.replace(/\//g, '%2F');

		vars[i] = start + end;
	}

	query_string = vars.join('&');

        if(go_on) {
	    url_string = original + dir_struct + query_string;
        }

	return(url_string);
}

function isValidURL(url){
    var RegExp = /^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/;
    if(RegExp.test(url)){
        return true;
    }else{
        return false;
    }
}

function checkField(){
    var frm = document.frmGoto_url, error = "";
    var url_value = frm.url.value;

    if( (url_value.substring(0,7) != 'http://') && (url_value.substring(0,8) != 'https://') ) {
        frm.url.value = 'http://' + url_value;
        url_value = frm.url.value;
    }

    url_value = fix_url(frm.url.value);
    frm.url.value = url_value;

    if(!isValidURL(url_value)){
        error += "Please enter a valid URL\n";
    }

    if(error != ""){
        alert(error + ": " + url_value);
        return false;
    }else{
        return true;
    }
}