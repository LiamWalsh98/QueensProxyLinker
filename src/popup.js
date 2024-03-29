document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('button').addEventListener('click', onclick, false)

    function onclick () {

        var query = { active: true, currentWindow: true };

        function callback(tabs) {
            var currentTab = tabs[0]; // there will be only one in this array

            var url = checkField(currentTab.url)

            chrome.tabs.update({
                url: "https://login.proxy.queensu.ca/login?url=" + url
            });
        }

        chrome.tabs.query(query, callback);
    }

}, false);

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

function checkField(url_value){

    if( (url_value.substring(0,7) != 'http://') && (url_value.substring(0,8) != 'https://') ) {
        url_value = 'http://' + url_value;
    }

    url_value = fix_url(url_value);
    
    if(!isValidURL(url_value)){
        return null;
    }
    else {
        return url_value;
    }
}
