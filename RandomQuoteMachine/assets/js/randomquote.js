
function inIframe() {
  try {
    return window.self !== window.top;
  } catch(e) {
    return true;
  }
}

var currentQuote = '', currentAuthor = '';
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var body = document.querySelector("body");

function openURL(url) {
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1, location=0, statusbar=0, menubar=0, resizable=0');
}

function getQuote() {
  var api_url = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json&jsonp=?";

  $.ajax({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: api_url,
    success: function(result) {
      if(typeof result === 'string') {
        result = JSON.parse(result);
      }
      currentQuote = result.quoteText;
      currentAuthor = "- " + result.quoteAuthor;

      $(".quote").animate({
        opacity: 0
      }, 500, function(){
        $(this).animate({
          opacity: 1
        }, 500);
        $(".quote").text(currentQuote);
      });

      $(".author").animate({
        opacity: 0
      }, 500, function() {
        $(this).animate({
          opacity: 1
        }, 500);
        $(".author").text(currentAuthor);
      });

      //TODO: Animate Buttons and background
      var color = Math.floor(Math.random() * colors.length);
      $(".btn").animate({
        backgroundColor: colors[color]
      }, 1000);
    }
  });
}


$(document).ready(function() {
  getQuote();
  $("#newQuote").on("click", getQuote);
  $("#tweet").on("click", function() {
    if(!inIframe()) {
      openURL("https://twitter.com/intent/tweet?hashtags=quotes&related=JSproject&text=" + encodeURIComponent('"' + currentQuote + '"' + currentAuthor));
    }
  });
});