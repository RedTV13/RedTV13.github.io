var booTime = true;

function MySketch()
{
    var intHour;
    var i = 0;
    var j = 0;
    var k = 0;
    var s, m, h;
    var secondCircle, minuteCircle, hourCircle;


    this.setup = function ()
    {
        //69%, 96.3%
        var canvas = createCanvas(windowWidth * 0.705, windowHeight * 0.895);
        canvas.parent("clockSketch");
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
        } else
        {
            intHour = hour() - 1;
        }

        //draw lines
        for (var circleY = 90; circleY <= 700; circleY += 120)
        {
            for (var circleX = 15; circleX <= 1048; circleX += 11)
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
            rect(0, 620, width, 30);
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
            rect(0, 370, width, 20);
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
            rect(0, 130, width, 20);
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
