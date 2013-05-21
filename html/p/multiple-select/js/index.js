$(function() { 
    $("#select1").multipleSelect();
    
    $("#select2").multipleSelect({
    	selectAll: false
    });
    $('#setSelects').click(function() {
    	$('#select2').multipleSelect('setSelects', [1, 3]);
    });
    $('#getSelects').click(function() {
        alert('Selected value is: ' + $('#select2').multipleSelect('getSelects'));
        alert('Selected text is: ' + $('#select2').multipleSelect('getSelects', 'text'));
    });
    $('#enable').click(function() {
       $('#select2').multipleSelect('enable');
    });
    $('#disable').click(function() {
       $('#select2').multipleSelect('disable');
    });
    
    $("#select3").multipleSelect({
    	isopen: true,
    	multiple: true,
    	multipleWidth: 55
    });
});
