import Glide from "@glidejs/glide";

var $;
$ = require("jquery");

var groupId;
var uId;

//Timestamps of swiping slides
var swipeTimer = [];

var glide;

//surveylinks in an array so they can be retrieved by the groupId number
var surveyLinks = [
  "https://userpage.fu-berlin.de/~wieseoli/umfrage/limesurvey/index.php/92142?lang=en",
  "https://userpage.fu-berlin.de/~wieseoli/umfrage/limesurvey/index.php/15242?lang=en"
];

//Run all initially needed functions to set groupId, uniqueId und correct images 
document.addEventListener(
  "DOMContentLoaded",
  function() {
    createGlide();
    assignRandomGroup();
    assignUId();
    setPrototype(groupId);
  },
  false
);

//Call resize for glide centering bug, collect first timestamp
window.addEventListener(
  "load",
  function() {
    callResize();
    addTimerSet();
  },
  false
);

// Init glide lib 
function createGlide() {
  glide = new Glide(".glide", {
    type: "slider",
    rewind: false,
    startAt: 0,
    perView: 1,
    focusAt: "center",
    gap: 0
  });
  window.dispatchEvent(new Event("resize"));
  glide.on("run.after", function() {
    var slideTimer = {
      time: Date.now(),
      index: glide.index
    };
    swipeTimer.push(slideTimer);
  });
  glide.mount();
}

// generates random group id and asign in current session
function assignRandomGroup() {
    var amountOfGroups = 2;
  groupId = (Math.round(Math.random() * 100) % amountOfGroups) + 1;
}

// generate random unique id and asigns to current session
function assignUId() {
  var number = Math.random();
  number.toString(36);
  uId = number.toString(36).substr(2, 9);
}

// sets the prototype and sets image tages to display resulting images
function setPrototype(groupId) {
  var imgElements = document.getElementsByTagName("img");
  for (let i = 0; i < 7; i++) {
    imgElements[i].setAttribute("src", "assets/" + "EmptyMockup.png");//+ groupId + "/" + i + ".png");
  }
}

// add current time and slide index to data array
function addTimerSet() {
  var slideTimer = {
    time: Date.now(),
    index: glide.index
  };
  swipeTimer.push(slideTimer);
}

//Fixes wierd centering issue of glide
function callResize() {
  window.dispatchEvent(new Event("resize")); 
}


// sends data as json to backend
function sendData() {
  addTimerSet();
  var sendData = {
    id: uId,
    groupId: groupId,
    swipeTimes: swipeTimer,
    platformData: getPlatformData()
  };
  var success = false;
  $.ajax({
    url: "./post_receiver.php",
    method: "POST",
    dataType: "text",
    contentType: "application/json",
    data: JSON.stringify(sendData),
  })
    .done(function() {
      console.log("Success sending data");
      success = true;
    })
    .fail(function(xhr) {
      success = false;
      alert(xhr.statusText);
      console.log("Text Status" + xhr.status + ": " + xhr.statusText);
    })
    .always(function() {
      var link =
        surveyLinks[groupId - 1] + "&UID=" + uId + "&DataSuccess=" + success;
      console.log(link);
      window.location.href = link;
    });
}

window.sendData = sendData;

// collect ussers platform data
function getPlatformData() {
  var platformData = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenHeight: window.screen.availHeight,
    screenWidth: window.screen.availWidth
  };
  return platformData;
}
