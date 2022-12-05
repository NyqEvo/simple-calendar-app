// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var submitButtonEL = $(":button");
var timeDisplayEl = $("#currentDay");
if (localStorage.getItem("schedule") === null) {
  localStorage.setItem("schedule", JSON.stringify({
    time: ["nine", "ten", "eleven", "twelve", "one", "two", "three", "four"],
    plan: ['', '', '', '', '', '', '', '']
    }))}
var daySchedule = JSON.parse(localStorage.getItem("schedule"))
// var daySchedule = {
//   time: ["nine", "ten", "eleven", "twelve", "one", "two", "three", "four"],
//   plan: ['', '', '', '', '', '', '', '']
// };

function init() {
  currentTime()
  checkTime()
  $('textarea').each(function(i) {
    $(this).text(daySchedule.plan[i]);
  })
}

function currentTime() {
  setInterval(function () {
    var time = dayjs().format('h:mmA');
    var date = dayjs().format('MMMM DD, YYYY')
    $("#currentDay").text(date + "\n" + time)
  }, 1000)
}

function checkTime() {
  setInterval(function(){
    $('.hour').each(function() {
      if ($(this).text() === dayjs().format('hA')) {
        $(this).parent().removeClass("past future")
        $(this).parent().addClass("present")
      } else if (parseInt($(this).attr(".data-hour")) > parseInt(dayjs().format("H"))) {
        $(this).parent().removeClass("future present")
        $(this).parent().addClass("past")
      } else {
        $(this).parent().removeClass("present past")
        $(this).parent().addClass("future")
      }
    })
  },1000)
}

$(":button").click(function(event) {
  var specifyButton = $(this).parent().attr("id");
  var content = $(this).siblings("textarea").val();
  console.log(content);
  for (i = 0; i < daySchedule.time.length; i++) {
    if (daySchedule.time[i] === specifyButton) {
      daySchedule.plan[i] = content;
    }
  }
var stringSchedule = JSON.stringify(daySchedule);
localStorage.setItem("schedule", stringSchedule);
})

init()


// $(function () {
//   // TODO: Add a listener for click events on the save button. This code should
//   // use the id in the containing time-block as a key to save the user input in
//   // local storage. HINT: What does `this` reference in the click listener
//   // function? How can DOM traversal be used to get the "hour-x" id of the
//   // time-block containing the button that was clicked? How might the id be
//   // useful when saving the description in local storage?
//   //
//   // TODO: Add code to apply the past, present, or future class to each time
//   // block by comparing the id to the current hour. HINTS: How can the id
//   // attribute of each time-block be used to conditionally add or remove the
//   // past, present, and future classes? How can Day.js be used to get the
//   // current hour in 24-hour time?
//   //
//   // TODO: Add code to get any user input that was saved in localStorage and set
//   // the values of the corresponding textarea elements. HINT: How can the id
//   // attribute of each time-block be used to do this?
//   //
//   // TODO: Add code to display the current date in the header of the page.
// });