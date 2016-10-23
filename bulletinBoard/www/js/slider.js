var SECONDS = 3;

var milliseconds = SECONDS * 1000;
var slideIndex = 1;
var x = document.getElementsByClassName("PremiumPosts");
var timer;
var playPause = 0;
var playPauseButton = document.getElementById("playPause");


function plusDivs(n) {
  showDivs(slideIndex += n);
  clearInterval(timer);
}
function plusDivs() {
  showDivs(slideIndex += 1);

}

function showDivs(n) {
  var i;
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
	 x[i].style.display = "none";  
  }
  if(x.length != 0)
    x[slideIndex-1].style.display = "block";  
}

function stopResumeSlider(){
  playPauseButton.removeAttribute("class");

  if(playPause){
    playPauseButton.setAttribute("class","icon ion-pause");
    timer = setInterval(plusDivs,milliseconds);
    playPause = 0;
  }
  else{
    playPauseButton.setAttribute("class","icon ion-play");
    clearInterval(timer);
    playPause = 1;
  }
}

showDivs(slideIndex);

timer = setInterval(plusDivs,milliseconds);

