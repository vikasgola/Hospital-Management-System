$(document).ready( function() {
    // $("#tabcontrol").on("click", function() {
        $("#main-content").load("../html/paients/history.html");
    // });
});


$(function () {
    $( '#patient-table' ).searchable({
        striped: true,
        oddRow: { 'background-color': '#f5f5f5' },
        evenRow: { 'background-color': '#fff' },
        searchType: 'fuzzy'
    });
});