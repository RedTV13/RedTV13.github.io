var myNodelist = document.getElementsByTagName("LI");
var i;
var close = document.getElementsByClassName("close");
var list = document.getElementById("myUL");
var input = document.getElementById("myInput");
var timer;
var intTime = 0;
var intSecondsCount = 0;
var intMinutesCount = 0;
var intHoursCount = 0;
var arrHours = [0,1,2,3,4,5]
var arrMinutes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]
var arrSeconds = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]
var elem = document.documentElement;

function StartUp()
{
  document.getElementById("myInput").focus();
  document.getElementById("pause").style.display = "none";
  document.getElementById("reset").style.display = "none";
}

//create close button
for (i = 0; i < myNodelist.length; i++) 
{
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
    
for (i = 0; i < close.length; i++) 
{
    close[i].onclick = function() 
    {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
    
list.addEventListener('click', function(ev) 
{
    if (ev.target.tagName === 'LI') 
    {
        ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() 
{
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') 
    {
        alert("You must write something!");
    } 
    else 
    {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) 
    {
        close[i].onclick = function() 
        {
        var div = this.parentElement;
        div.style.display = "none";
        }
    }
}

//create new list item when enter is pressed
input.addEventListener("keyup", function (e) 
{
    if (e.key === "Enter") 
    {  
        newElement(e);
    }
});

//--------------------------------------------------------------------------------------------------------------------------------//
function OneSecondTimer()
{
    if (intHoursCount == arrHours [intHours] && 
        intMinutesCount == arrMinutes [intMinutes] &&
        intSecondsCount == arrSeconds [intSeconds])
    {
        clearInterval(IntervalTimer);
        document.getElementById("overlay").style.display = "block";
        document.getElementById("start").style.display = "inline-block";
        document.getElementById("pause").style.display = "none";
        document.getElementById("stop").style.display = "none";
    }
    intTime -= 1;
    intSecondsCount +=1;
    if (intSecondsCount == 60)
    {
        intMinutesCount += 1;
        intSecondsCount = 0;
    }
    else if (intMinutesCount == 60)
    {
        intHoursCount += 1;
        intMinutesCount = 0;
    }
    document.getElementById("countdown").innerHTML = intHoursCount + ":" + intMinutesCount + ":" + intSecondsCount;
}

function start()
{
    IntervalTimer = setInterval(OneSecondTimer, 1000);
    document.getElementById("pause").style.display = "inline-block";
    document.getElementById("start").style.display = "none";
    if (intSecondsCount == 0 &&
        intMinutesCount == 0 &&
        intHoursCount == 0)
    {
        intHours = document.getElementById("hours").value;
        intMinutes = document.getElementById("minutes").value;
        intSeconds = document.getElementById("seconds").value;
    }
}

function off() 
{
    document.getElementById("overlay").style.display = "none";
    clearInterval(IntervalTimer);
    document.getElementById("countdown").innerHTML = "0:0:0";
    document.getElementById("reset").style.display = "none";
    document.getElementById("start").style.display = "inline-block"
    document.getElementById("seconds").value = 0;
    document.getElementById("minutes").value = 0;
    document.getElementById("hours").value = 0;
    intSecondsCount = 0;
    intMinutesCount = 0;
    intHoursCount = 0;
}

function pause()
{
    clearInterval(IntervalTimer);
    document.getElementById("pause").style.display = "none";
    document.getElementById("start").style.display = "inline-block";
    document.getElementById("reset").style.display = "inline-block";
}

function reset()
{
  clearInterval(IntervalTimer);
  document.getElementById("countdown").innerHTML = "0:0:0";
  document.getElementById("reset").style.display = "none";
  document.getElementById("start").style.display = "inline-block";
  document.getElementById("seconds").value = 0;
  document.getElementById("minutes").value = 0;
  document.getElementById("hours").value = 0;
  intSecondsCount = 0;
  intMinutesCount = 0;
  intHoursCount = 0;
}

/* View in fullscreen */
function openFullscreen() 
{
  if (elem.requestFullscreen) 
  {
    elem.requestFullscreen();
  } 
  else if (elem.webkitRequestFullscreen) 
  { /* Safari */
    elem.webkitRequestFullscreen();
  } 
  else if (elem.msRequestFullscreen) 
  { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() 
{
  if (document.exitFullscreen) 
  {
    document.exitFullscreen();
  } 
  else if (document.webkitExitFullscreen) 
  { /* Safari */
    document.webkitExitFullscreen();
  } 
  else if (document.msExitFullscreen) 
  { /* IE11 */
    document.msExitFullscreen();
  }
}
