$(document).ready(function(){
    $("#coin-table").on('click', '.fa fa-pencil', function() {
        $(this).closest('tr').remove();
    });
});