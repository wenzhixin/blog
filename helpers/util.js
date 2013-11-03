exports.endWith = function(name, str) {
	return name.substring(name.length - str.length) === str;
}