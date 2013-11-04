exports.endWith = function(name, str) {
	return name.substring(name.length - str.length) === str;
};

exports.getGMTString = function(date) {
	var d = new Date(date);
	return new Date(d.getTime() + ((-d.getTimezoneOffset() / 60 - 8) * 3600000)).toGMTString();
};