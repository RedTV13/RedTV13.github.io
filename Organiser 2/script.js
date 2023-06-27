//VARIABLES
{
    var snackbar = document.getElementById("snackbar");
    var myNodelist = document.getElementsByTagName("LI");
    var close = document.getElementsByClassName("close");
    var list = document.getElementById("myUL");
    var input = document.getElementById("myInput");
    var elem = document.documentElement;
    var clock = document.getElementById("clockSketch")
    var timer = document.getElementById("pomodoro")
    var i;

    //POMODORO VARIABLES
    var hours = 0; //user selected hours
    var minutes = 0; //user selected minutes
    var timeLeft = 0; //amount of time left on overarching timer
    var stopPushed = false; //if timer has been paused
    var stopDiff = 0; //amount of time since stop was pushed
    var displayTime = [0, 0, 0] //hour, minute, second values that will appear to user
    var workCount = 0; //amount of work periods that have passed
    var intBreaks = 0; //amount of breaks that will happen with selected amount of time
    var mode;

    var workTime = 25; //length of work period
    var workTimeLeft;
    var sbTime = 5; //length of short break
    var sbTimeLeft;
    var lbTime = 10; //length of long break
    var lbTimeLeft;

    //Dates
    var now; //the current date
    var timeStop; //the time that stop is pushed
    var endTime; //Time when the whole timer stops (time that timer is counting down to)

    var workEnd; //Time when work timer stops
    var sbEnd; //Time when short-break ends
    var lbEnd; //Time when long-break ends

    //Timers
    var timer; //overarching timer
    var stopTimer; //starts when stop is pushed

    var wTimer; //work timer
    var sbTimer; //short break timer
    var lbTimer; //long break timer
}

function startUp()
{

}

//-------------------------------------------------------------NavBar---------------------------------------------------------------------//
{
    function showClock()
    {
        clock.style.display = "inline-block";
        timer.style.display = "none";
    }

    function showTimer()
    {
        timer.style.display = "inline-block";
        clock.style.display = "none";
    }
}
//-------------------------------------------------------------TO-DO-LIST---------------------------------------------------------------------//
{
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
        close[i].onclick = function () 
        {
            var div = this.parentElement;
            div.remove();
        }
    }

    // Add a "checked" symbol when clicking on a list item
    list.addEventListener('click', function (ev) 
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
            snackbar.innerHTML = "You must write something!";
            snackbar.className = "show";
            setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
            //alert("You must write something!");
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
            close[i].onclick = function () 
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
    })
}
//-------------------------------------------------------------POMODORO---------------------------------------------------------------------//
{
    function settings()
    {
        document.getElementById("settings").style.display = "block";
        document.getElementById("studyMinutes").value = workTime;
        document.getElementById("breakMinutes").value = sbTime;
        document.getElementById("lBreakMinutes").value = lbTime;
    }

    function changeH()
    {
        //store the selected hours in a variable every time the selection changes
        hours = document.getElementById("hours").value
        //update the hour value on the page
        document.getElementById("hrs").innerHTML = hours;

        //if the selected time isn't 0 show the start button
        if (!(hours == 0 && minutes == 0))
        {
            document.getElementById("start").style.display = "inline-block";
            intBreaks = Math.round((((hours * 60) + parseInt(minutes, 8)) / ((workTime * 4) + (sbTime * 3) + lbTime))) * 4
            if (intBreaks < 2)
            {
                document.getElementById("pomText").innerHTML = "you'll have " + intBreaks + " break."
            }
            else
            {
                document.getElementById("pomText").innerHTML = "you'll have " + intBreaks + " breaks."
            }
        }
        else
        {
            document.getElementById("start").style.display = "none";
            intBreaks = 0;
            document.getElementById("pomText").innerHTML = "you'll have " + intBreaks + " breaks."
        }
        document.getElementById("pomText").innerHTML = "you'll have " + intBreaks + " breaks."
    }

    function changeM()
    {
        //store the selected minutes in a variable every time the selection changes
        minutes = document.getElementById("minutes").value;
        //update the minute value on the page
        if (minutes.length < 2)
        {
            document.getElementById("mins").innerHTML = "0" + minutes;
        }
        else
        {
            document.getElementById("mins").innerHTML = minutes;
        }
        document.getElementById("pomText").innerHTML = "you'll have " + intBreaks + " breaks."

        //if the selected time isn't 0 show the start button
        if (hours != 0)
        {
            document.getElementById("start").style.display = "inline-block";
            intBreaks = Math.round((((hours * 60) + parseInt(minutes, 8)) / ((workTime * 4) + (sbTime * 3) + lbTime))) * 4
            if (intBreaks < 2)
            {
                document.getElementById("pomText").innerHTML = "you'll have " + intBreaks + " break.";
            }
            else
            {
                document.getElementById("pomText").innerHTML = "you'll have " + intBreaks + " breaks.";
            }
        }
        else
        {
            document.getElementById("start").style.display = "none";
            intBreaks = 0;
            document.getElementById("pomText").innerHTML = "you'll have " + intBreaks + " breaks."
        }
    }

    function start()
    {
        //if the timer is starting again after being paused stop counting time since stop was pressed
        clearInterval(stopTimer)

        //hide the start button
        document.getElementById("start").style.display = "none";
        //show the stop button
        document.getElementById("stop").style.display = "inline-block";
        //hide reset button
        document.getElementById("reset").style.display = "none";
        //hide text
        document.getElementById("pomText").style.display = "block";
        //hide dropdowns
        document.getElementById("dropdowns").style.display = "none";

        //check if the timer is restarting after being paused
        if (stopPushed == false)
        {
            //get the current date
            now = new Date()
            //add selected hours and minutes to current time to get finish time
            //parse to int because otherwise it just adds the number onto the end of the other one
            //e.g. 17 + 3 = 173
            hours = parseInt(now.getHours()) + parseInt(hours);
            minutes = parseInt(now.getMinutes()) + parseInt(minutes);
            //set end time for overall timer
            endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, now.getSeconds())
        }

        //run the work timer
        workTimer()

        timer = setInterval(function ()
        {
            now = new Date()
            document.getElementById("pomText").innerHTML = mode;
            //check if now is past the end time
            if (now > endTime + stopDiff)
            {
                //if now is past the end time stop the timer
                clearInterval(timer)
                clearInterval(stopTimer)
                clearInterval(wTimer)
                clearInterval(sbTimer)
                clearInterval(lbTimer)
                document.getElementById("pomText").innerHTML = "Time's Up!";
                document.getElementById("pomText").style.display = "block";
            }
            else
            {
                if (stopPushed == false)
                {
                    //if this is the first time start is pressed time left is the finish time minus the current time
                    timeLeft = endTime - now;
                }
                else
                {
                    //if the timer has been paused then add the amount of time it was paused for, to the time left
                    timeLeft = endTime - now + stopDiff;
                }
                displayTime[0] = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));//convert time left to hours
                displayTime[1] = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));//minutes
                displayTime[2] = Math.floor((timeLeft % (1000 * 60)) / 1000);//seconds

                //making display times look nice
                {
                    if (displayTime[0] < 10)
                    {
                        document.getElementById("hrs").innerHTML = "0" + displayTime[0]
                    }
                    else
                    {
                        document.getElementById("hrs").innerHTML = displayTime[0]
                    }

                    if (displayTime[1] < 10)
                    {
                        document.getElementById("mins").innerHTML = "0" + displayTime[1]
                    }
                    else
                    {
                        document.getElementById("mins").innerHTML = displayTime[1]
                    }

                    if (displayTime[2] < 10)
                    {
                        document.getElementById("secs").innerHTML = "0" + displayTime[2]
                    }
                    else
                    {
                        document.getElementById("secs").innerHTML = displayTime[2]
                    }
                }
                //console.log("time left: " + (Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))) + ":" + (Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))) + ":" + (Math.floor((timeLeft % (1000 * 60)) / 1000)))
            }

            if (mode == "work")
            {
                document.getElementById("pomText").innerHTML = "Next break in " + Math.floor((workTimeLeft % (1000 * 60 * 60)) / (1000 * 60)) + " minutes.";
            }
            else if (mode == "short break")
            {
                document.getElementById("pomText").innerHTML = "Break ends in " + Math.floor((sbTimeLeft % (1000 * 60 * 60)) / (1000 * 60)) + " minutes.";
            }
            else if (mode == "pause")
            {
                document.getElementById("pomText").innerHTML = "Timer paused";
            }
            else
            {
                document.getElementById("pomText").innerHTML = "Break ends in " + Math.floor((lbTimeLeft % (1000 * 60 * 60)) / (1000 * 60)) + " minutes.";
            }
        }, 1000)
    }

    function stop()
    {
        clearInterval(timer) //stop timer
        //show the start button
        document.getElementById("start").style.display = "inline-block";
        //hide the stop button
        document.getElementById("stop").style.display = "none";
        //show the reset button
        document.getElementById("reset").style.display = "inline-block";

        mode = "pause";
        stopPushed = true; //record that timer is paused
        timeStop = new Date() //record time that stop is pushed
        timeStop = timeStop.getTime() - stopDiff; //subtract stopDiff for when timer is paused more than once (I don't know how it works, it just does)
        now = new Date() //current time
        stopDiff = now - timeStop; //calculate time since stop was pressed
        stopTimer = setInterval(function ()
        {
            now = new Date() //current time
            stopDiff = now.getTime() - timeStop; //calculate time since stop was pressed
        }, 1000)
    }

    function reset()
    {
        //stop all timers
        clearInterval(timer)
        clearInterval(stopTimer)
        //change display time to 0
        document.getElementById("hrs").innerHTML = "00";
        document.getElementById("mins").innerHTML = "00";
        document.getElementById("secs").innerHTML = "00";

        //show text
        document.getElementById("pomText").style.display = "block";

        //reset displayed buttons
        document.getElementById("start").style.display = "none";
        document.getElementById("stop").style.display = "none";
        document.getElementById("reset").style.display = "none";

        //reset dropdowns
        document.getElementById("hours").value = "00";
        document.getElementById("minutes").value = "00";
        document.getElementById("dropdowns").style.display = "block";

        //reset variables
        hours = 0;
        minutes = 0;
        endTime = 0;
        timeLeft = 0;
        stopPushed = false;
        timeStop = 0;
        stopDiff = 0;
        displayTime[0] = 0;
        displayTime[1] = 0;
        displayTime[2] = 0;
        workCount = 0;
    }

    function hide()
    {
        document.getElementById("settings").style.display = "none";
    }

    function workTimer()
    {
        //set the work end time to desired minutes after now
        workEnd = new Date()
        workEnd.setMinutes(now.getMinutes() + workTime)
        workCount++;
        wTimer = setInterval(function ()
        {
            //subtract finish time from now to get amount of time left in work period
            workTimeLeft = workEnd - now;
            mode = "work";
            if (workTimeLeft <= 0)
            {
                clearInterval(wTimer)
                if (workCount > 3)
                {
                    workCount = 0;
                    longBreakTimer()
                }
                else
                {
                    shortBreakTimer()
                }
            }
        }, 1000)
    }

    function shortBreakTimer()
    {
        sbEnd = new Date()
        sbEnd.setMinutes(now.getMinutes() + sbTime)
        mode = "short break"
        sbTimer = setInterval(function ()
        {
            sbTimeLeft = sbEnd - now;
            if (sbTimeLeft <= 0)
            {
                clearInterval(sbTimer)
                workTimer()
            }
        }, 1000)
    }

    function longBreakTimer()
    {
        lbEnd = new Date()
        lbEnd.setMinutes(now.getMinutes() + lbTime)
        mode = "long break"
        lbTimer = setInterval(function ()
        {
            lbTimeLeft = lbEnd - now;
            if (lbTimeLeft <= 0)
            {
                clearInterval(lbTimer)
                workTimer()
            }
        }, 1000)
    }

    function saveSettings()
    {
        if (document.getElementById("studyMinutes").value != 0)
        {
            workTime = document.getElementById("studyMinutes").value;
        }

        if (document.getElementById("breakMinutes").value != 0)
        {
            sbTime = document.getElementById("breakMinutes").value;
        }

        if (document.getElementById("lBreakMinutes").value != 0)
        {
            lbTime = document.getElementById("lBreakMinutes").value;
        }

        document.getElementById("settings").style.display = "none";
    }
}