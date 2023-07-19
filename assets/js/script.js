// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {

  var rootEl = $('#root');
  var currentHour = dayjs().format('H')
  var calendarEl =  $(`<div id="" class="row time-block">
    <div class="col-2 col-md-1 hour text-center py-3"></div>
    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
    </div>`)

  for (var i = 9; i <= 17; i++) {
    var tempCalendarEl = calendarEl.clone();
    // gets the 12 hour time from 24 hour number who needs dayjs
    var hourNumber = i % 12 || 12;
    var hourId = 'hour' + hourNumber;
    var timeClass = "";
    var amPm = 'AM';

    if (hourNumber < 9 || hourNumber === 12){
      amPm = "PM";
    }

    if (i < currentHour) {
      timeClass = "past";
    } else if (i == currentHour) {
      timeClass = "present";
    } else {
      timeClass = 'future';
    }

    tempCalendarEl.attr('id', hourId);
    tempCalendarEl.addClass(timeClass);
    tempCalendarEl.children('div').text(hourNumber + amPm);
    tempCalendarEl.children('textarea').val(localStorage.getItem(hourId) || "")

    rootEl.append(tempCalendarEl);
  }
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  $('#root').on('click', '.saveBtn', save);

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  //displays the current date in the header of the page.
  $('#currentDay').text(getDay())
});


function getDay() {
  currentDay = dayjs().format("dddd, MMMM D");
  
  switch(currentDay[currentDay.length - 1]){
    case 1:
      currentDay += "st";
      break;
    case 2:
      currentDay += "nd";
      break;
    case 3:
      currentDay += "rd";
      break;
    default:
      currentDay += "th";
  }

  return currentDay;
}

function save(evt) {
  // sets text to local storage
  var id = $(this).parent('div').attr('id');
  var text = $(this).parent('div').children('textarea').val();

  localStorage.setItem(id, text)
}