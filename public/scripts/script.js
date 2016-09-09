console.log('script sourced');

$(document).ready(function(){
  console.log('jq works');
  $('#add').on('click', function () {
    var objectToSend = {
      x: $('#x').val(),
      y: $('#y').val()
    };
    $.ajax({
      url: '/add',
      type: 'POST',
      data: objectToSend,
      success: function(data){
        $('#outDiv').html(data);
      }//end ajax success callback
    });//end ajax call
  });
  $('#subtract').on('click', function () {
    var objectToSend = {
      x: $('#x').val(),
      y: $('#y').val()
    };
    $.ajax({
      url: '/subtract',
      type: 'POST',
      data: objectToSend,
      success: function(data){
        $('#outDiv').html(data);
      }//end ajax success callback
    });//end ajax call
  });
  $('#multiply').on('click', function () {
    var objectToSend = {
      x: $('#x').val(),
      y: $('#y').val()
    };
    $.ajax({
      url: '/multiply',
      type: 'POST',
      data: objectToSend,
      success: function(data){
        $('#outDiv').html(data);
      }//end ajax success callback
    });//end ajax call
  });
  $('#divide').on('click', function () {
    var objectToSend = {
      x: $('#x').val(),
      y: $('#y').val()
    };
    $.ajax({
      url: '/divide',
      type: 'POST',
      data: objectToSend,
      success: function(data){
        $('#outDiv').html(data);
      }//end ajax success callback
    });//end ajax call
  });
  // $('#calculate').on('click', function () {
  //
  // });
  $('#clear').on('click', function () {
    $('#x').val('');
    $('#y').val('');
    $('#outDiv').html('Answer');
  });
});
