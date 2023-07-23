var booTime = true;
var full = false;

function MySketch()
{
    var intHour;
    var i = 0;
    var j = 0;
    var k = 0;
    var s, m, h;
    var secondCircle, minuteCircle, hourCircle;
    var divHeight = document.getElementById("rightDiv").offsetHeight;
    var divWidth = document.getElementById("rightDiv").offsetWidth;

    this.setup = function ()
    {
        //69%, 96.3%
        var canvas = createCanvas(divWidth, divHeight);
        canvas.parent("clockSketch");
        document.getElementById("toggleText").checked = true;
    };

    this.draw = function ()
    {
        //background(164, 195, 178);

        noStroke();
        textAlign(CENTER);

        //put hours into 12h time
        if (hour() > 12)
        {
            intHour = hour() - 13;
        }
        else
        {
            intHour = hour() - 1;
        }

        //draw lines
        for (var circleY = 90; circleY <= height - 9; circleY += 120)
        {
            for (var circleX = 15; circleX <= width - 9; circleX += 11)
            {
                fill(255);
                circle(circleX, circleY, 10);
            }
        }

        //draw seconds
        for (i; i < second(); i++)
        {
            s = 20 + i * (width / 60);
            circle(s, 630, 10);
        }

        if (second() == 59)
        {
            fill(200, 219, 209);
            rect(0, 620, width - 10, 30);
        }
        fill(255);
        secondCircle = 20 + second() * (width / 60);
        circle(secondCircle, 630, 10);
        fill(200, 219, 209);
        rect((width / 2) - 30, 715, 60, 60);
        fill(255);
        textSize(50);
        textFont("DM Serif Display");

        //draw minutes
        for (j; j < minute(); j++)
        {
            m = 20 + j * (width / 60);
            circle(m, 388, 10);
        }

        if (minute() == 59 && second() < 1)
        {
            fill(200, 219, 209);
            rect(0, 370, width, 30);
        }
        fill(255);
        minuteCircle = 20 + minute() * (width / 60);
        circle(minuteCircle, 388, 10);
        fill(200, 219, 209);
        rect((width / 2) - 30, 490, 60, 60);
        fill(255);
        textSize(50);
        textFont("DM Serif Display");

        //draw hours
        for (k; k < intHour; k++)
        {
            h = 20 + k * (width / 12);
            circle(h, 150, 10);
        }

        if (intHour == 12 && second() < 1)
        {
            fill(200, 219, 209);
            rect(0, 130, width, 30);
        }
        fill(255);
        hourCircle = 20 + intHour * (width / 12);
        circle(hourCircle, 150, 10);
        fill(200, 219, 209);
        rect((width / 2) - 30, 240, 60, 60);
        fill(255);
        textSize(50);
        textFont("DM Serif Display");

        if (booTime)
        {
            text(intHour + 1, width / 2, 285);
            text(minute(), width / 2, 525);
            text(second() + 1, width / 2, 760);
        }
    };
}

var canvas1 = document.getElementById("clockCanvas");
var clockSketch = new p5(MySketch);
var canvas2 = document.getElementById("canvas2");
var secondSketch = new p5(MySketch, canvas2);

function showText()
{
    booTime = document.getElementById("toggleText").checked;

}

function fullScreen()
{
    if (full == false)
    {
        document.getElementById("leftDiv").style.display = "none";
        document.getElementById("navBar").style.display = "none";
        document.getElementById("rightDiv").style.height = "95.5vh";
        document.getElementById("rightDiv").style.width = "97vw";
        document.getElementById("rightDiv").style.marginTop = "0.4%";
        document.getElementById("fullScreenBtn").src = "Assets/exitFullscreen.png";
        document.getElementById("fullScreenBtn").style.marginLeft = "96.5%";
        document.getElementById("content").style.height = "95.5vh";
        document.getElementById("content").style.width = "97vw";
        document.getElementById("content").style.margin = "none";
        document.getElementById("content").style.marginTop = "none";
        document.getElementById("content").style.marginLeft = "0.5%";
        full = true;
    }
    else
    {
        document.getElementById("leftDiv").style.display = "inline-block";
        document.getElementById("navBar").style.display = "inline-block";
        document.getElementById("rightDiv").style.height = "96.3%";
        document.getElementById("rightDiv").style.width = "69%";
        document.getElementById("rightDiv").style.marginTop = "0";
        document.getElementById("fullScreenBtn").src = "Assets/fullscreen.png";
        document.getElementById("fullScreenBtn").style.marginLeft = "95%";
        document.getElementById("content").style.height = "90%";
        document.getElementById("content").style.width = "99%";
        document.getElementById("content").style.marginTop = "0.4%";
        document.getElementById("content").style.margin = "auto";
        full = false;
    }
    divHeight = document.getElementById("rightDiv").offsetHeight;
    divWidth = document.getElementById("rightDiv").offsetWidth;
    document.getElementById("clockSketch").style.height = "100%";
    document.getElementById("clockSketch").style.width = "100%";
    resizeCanvas(divWidth, divHeight);
    drawLines();
}

function drawLines()
{
    //seconds
    for (i; i < second(); i++)
    {
        s = 20 + i * (width / 60);
        circle(s, 630, 10);
    }

    //minutes
    for (j; j < minute(); j++)
    {
        m = 20 + j * (width / 60);
        circle(m, 388, 10);
    }

    //hours
    for (k; k < intHour; k++)
    {
        h = 20 + k * (width / 12);
        circle(h, 150, 10);
    }
}