console.log('script sourced');

var summed = false;
var postUrl = '';
var objectToSend = {
  x: 0,
  y: 0
};

var calculate = function () {
  if (!($('#currentNum').attr('aged'))) {
    objectToSend.y = $('#currentNum').html();
  }
  $.ajax({
    url: postUrl,
    type: 'POST',
    data: objectToSend,
    success: function(data){
      $('#currentNum').html(data.answer);
      objectToSend.x = $('#currentNum').html();
    }//end ajax success callback
  });//end ajax call
};//end calculate

$(document).ready(function(){
  console.log('jq works');
  $('.numberBtn').on('click', function(){
    if (summed){
      objectToSend.x = 0;
      objectToSend.y = 0;
      summed = false;
    }
    if ($('#currentNum').attr('aged')){
      $('#currentNum').html($(this).html());
      $('#currentNum').attr('aged', '');
    }
    else {
      $('#currentNum').html($('#currentNum').html() + $(this).html());
    }
    //remove leading 0 if necessary
    if ($('#currentNum').html()[0] === '0' && $('#currentNum').html()[1] !== '.'){
      $('#currentNum').html($('#currentNum').html().slice(1))
    }
  });//end number click

  $('.operatorBtn').on('click', function () {
    summed = false;
    if (objectToSend.x && !($('#currentNum').attr('aged'))){
      calculate();
      $('#currentNum').attr('aged', 'true');
    }
    else {
      objectToSend.x = $('#currentNum').html();
      $('#currentNum').attr('aged', 'true');
    }
    switch ($(this).attr('id')) {
      case 'add':
        postUrl = '/add'
        break;
      case 'subtract':
        postUrl = '/subtract'
        break;
      case 'multiply':
        postUrl = '/multiply'
        break;
      case 'divide':
        postUrl = '/divide'
        break;
      default:
        console.log('outside switch, debug');
    }//end switch
  });//end operator click

  $('#decimal').on('click', function () {
    if ($('#currentNum').attr('aged')){
      $('#currentNum').html('0');
    };
    if ($('#currentNum').html().indexOf('.') === -1){
      $('#currentNum').html($('#currentNum').html() + '.');
      $('#currentNum').attr('aged', '');
    }
  });

  $('#signChange').on('click', function () {
    if ($('#currentNum').html() === '0'){
      //do nothing
    }
    else if ($('#currentNum').html()[0] === '-'){
      $('#currentNum').html($('#currentNum').html().slice(1));
    }
    else {
      $('#currentNum').html('-' + $('#currentNum').html());
    }
  });

  $('#calculate').on('click', function(){
    calculate();
    //store y's value in x for use if '=' is pressed again
    if (!($('#currentNum').attr('aged'))) {
      objectToSend.x = objectToSend.y;
      $('#currentNum').attr('aged', 'true');
    }
    summed = true;
  });

  $('#clear').on('click', function () {
    objectToSend.x = 0;
    objectToSend.y = 0;
    postUrl = '';
    $('#currentNum').html('0');
  });
});
