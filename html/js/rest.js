/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2012-10-31
 */

function Rest() {
	if (arguments.length === 1) {
		baseurl = '';
		methods = arguments[0];
	} else if (arguments.length == 2) {
		baseurl = arguments[0];
		methods = arguments[1];
	} else {
		throw new Error('arguments error');
	}
	var createFunc = function(url, type) {
		return function() {
			if (arguments.length === 0 || arguments.length > 3) {
				throw new Error('arguments error');
			}
			var callback = arguments[0];
			var options = {
				url : baseurl + url,
				type : type,
				dataType : 'json',
				success : function(data) {
					callback(200, data);
				},
				error : function(XMLHttpRequest) {
					callback(XMLHttpRequest.status);
				}
			};
			switch (type) {
			case 'get':
				var params = arguments[1];
				if (params) options.url += '?' + $.param(params);
				break;
			case 'post':
				var params = arguments[1];
				options.contentType = 'application/json';
				options.data = JSON.stringify(params);
				break;
			case 'put':
				var id = arguments[1];
				var params = arguments[2];
				options.url += '/' + id;
				options.contentType = 'application/json';
				options.data = JSON.stringify(params);
				break;
			case 'delete':
				var id = arguments[1];
				options.url += '/' + id;
				break;
			default:
				throw new Error('method error');
				break;
			}
			$.ajax(options);
		};
	};

	for ( var i = 0; i < methods.length; i++) {
		var method = methods[i];
		var url = '';
		var type = 'post'
		if (method.indexOf(':') == -1) {
			url = method;
		} else {
			var arr = method.split(':');
			type = arr[0];
			url = arr[1];
		}
		var tmpArr = url.split('/');
		var funcArr = new Array();
		for ( var j = 0; j < tmpArr.length; j++) {
			if (tmpArr[j] != '') {
				if (j == tmpArr.length - 1) {
					funcArr.push(type + tmpArr[j].substring(0, 1).toUpperCase()
							+ tmpArr[j].substring(1));
				} else {
					funcArr.push(tmpArr[j]);
				}
			}
		}
		if (funcArr.length == 1) {
			this[funcArr[0]] = createFunc(url, type);
		} else {
			if (!this.hasOwnProperty(funcArr[0])) {
				this[funcArr[0]] = new Object();
			}
			var methodObj = this[funcArr[0]];
			for ( var j = 1; j < funcArr.length - 1; j++) {
				if (!methodObj.hasOwnProperty(funcArr[j])) {
					methodObj[funcArr[j]] = new Object();
				}
				methodObj = methodObj[funcArr[j]];
			}
			methodObj[funcArr[funcArr.length - 1]] = createFunc(url, type);
		}
	}
}