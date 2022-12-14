var submitButtonEL = $(":button");
var timeDisplayEl = $("#currentDay");
if (localStorage.getItem("schedule") === null) {
  localStorage.setItem("schedule", JSON.stringify({
    time: ["nine", "ten", "eleven", "twelve", "one", "two", "three", "four"],
    plan: ['', '', '', '', '', '', '', '']
    }))}
var daySchedule = JSON.parse(localStorage.getItem("schedule"))

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
    $('.hour').each(function() {
      if ($(this).attr("data-hour") === dayjs().format('HH')) {
        $(this).parent().addClass("present")
      } else if ($(this).attr("data-hour") < dayjs().format('HH')) {
        $(this).parent().addClass("past")
      } else {
        $(this).parent().addClass("future")
      }
    })
}

$(":button").click(function(event) {
  var specifyButton = $(this).parent().attr("id");
  var content = $(this).siblings("textarea").val();
  for (i = 0; i < daySchedule.time.length; i++) {
    if (daySchedule.time[i] === specifyButton) {
      daySchedule.plan[i] = content;
    }
  }
var stringSchedule = JSON.stringify(daySchedule);
localStorage.setItem("schedule", stringSchedule);
})

init()