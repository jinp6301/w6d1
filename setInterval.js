function printTime() {
  var dateObject = new Date();
  var readableTime = dateObject.toLocaleTimeString();
  var timeArray = readableTime.split(":");
  var hours = parseInt(timeArray[0] ,10);
  var minutes = parseInt(timeArray[1] ,10);
  var seconds = parseInt(timeArray[2].split(" ")[0] ,10);

  setInterval(function() {
    seconds += 5;
    if (seconds >= 60) {
      seconds = (seconds) % 60;
      minutes += 1;
    };
    if (minutes >= 60) {
      minutes = minutes % 60;
      hours += 1;
    };
    if (hours >= 12) {
      hours = hours % 12;
    };
    console.log(hours + ": " + minutes + ": " + seconds);
  },5000);
}

printTime();