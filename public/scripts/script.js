console.log('script sourced');

//the currently displayed number (currentNum) will be 'stale' if an operatorBtn, '=', or '%' was the last button pressed.
// If the current number is stale, pressing a numberBtn will start a new number ('y'), and operatorBtn presses will not perform a calculation.
// If the current number is not stale, pressing a numberBtn will concatenate to the current number, and operatorBtn presses will perform a calculation

//flag to determine whether to reset objectToSend values on numberBtn press
var summed = false;

var postUrl = '';
var objectToSend = {
  x: 0,
  y: 0
};

var calculate = function () {
  //if currentNum is not stale, use currentNum for y
  if (!($('#currentNum').attr('stale'))) {
    objectToSend.y = $('#currentNum').html();
  }
  $.ajax({
    url: postUrl,
    type: 'POST',
    data: objectToSend,
    success: function(data){
      $('#currentNum').html(data.answer);
      //store result of calculation for possible use in next operation
      objectToSend.x = $('#currentNum').html();
    }//end ajax success callback
  });//end ajax call
};//end calculate

$(document).ready(function(){
  console.log('jq works');
  $('.numberBtn').on('click', function(){
    //if last button press was '=', start from scratch
    if (summed){
      objectToSend.x = 0;
      objectToSend.y = 0;
      summed = false;
    }
    //see top of file for notes on 'stale'
    if ($('#currentNum').attr('stale')){
      $('#currentNum').html($(this).html());
      $('#currentNum').attr('stale', '');
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
    //see top of file for notes on 'stale'
    if (objectToSend.x && !($('#currentNum').attr('stale'))){
      calculate();
      $('#currentNum').attr('stale', 'true');
    }
    else {
      objectToSend.x = $('#currentNum').html();
      $('#currentNum').attr('stale', 'true');
    }
    //set postUrl to request the appropriate operation
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
    //start at 0. if currently displayed number is stale. See top of file for notes on 'stale'.
    if ($('#currentNum').attr('stale')){
      $('#currentNum').html('0');
    };
    //will not add '.' if already present in the currentNum
    //indexOf returns -1 if the provided character is not found in the calling string.
    if ($('#currentNum').html().indexOf('.') === -1){
      $('#currentNum').html($('#currentNum').html() + '.');
      $('#currentNum').attr('stale', '');
    }
  });//end decimal onclick

  $('#signChange').on('click', function () {
    //0 can't be negative
    if ($('#currentNum').html() === '0'){
      //do nothing
    }
    //remove '-' sign if present
    else if ($('#currentNum').html()[0] === '-'){
      $('#currentNum').html($('#currentNum').html().slice(1));
    }
    //else add '-' sign
    else {
      $('#currentNum').html('-' + $('#currentNum').html());
    }
  });//end signChange onclick

  $('#percent').on('click', function(){
    $('#currentNum').html(Number($('#currentNum').html())/100);
    //see top of file for notes on 'stale'
    $('#currentNum').attr('stale', 'true');
  });//end percent onclick

  $('#calculate').on('click', function(){
    calculate();
    //store y's value in x for use if '=' is the next button pressed. the calculate function will use currentNum for y
    if (!($('#currentNum').attr('stale'))) {
      objectToSend.x = objectToSend.y;
      $('#currentNum').attr('stale', 'true');
    }
    summed = true;
  });//end calculate onclick

  $('#clear').on('click', function () {
    objectToSend.x = 0;
    objectToSend.y = 0;
    postUrl = '';
    $('#currentNum').html('0');
  });
});
