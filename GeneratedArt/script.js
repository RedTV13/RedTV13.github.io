var canvasX, canvasY;
var canvas, canvasController;
var loopController;
var intColour;
var colourArray = ["#fec5bb", "#FCD5CE", "#FAE1DD", "#D8E2DC", "#ECE4DB", "#FFE5D9", "#FFD7BA", "#FEC89A", "#E8E8E4"];//pastel
var intXPos, intYPos, intSize;
var intNumberofShapes;
var intLineX, intLineY;
var intRandomNumber;
var intTimer = 0;
var Day = new Date();
var backgroundColour = "#F8EDEB";
var imgFlower = new Image();
var intFlowerPosX;
var intFlowerPosY;
var intRabbit;
var EasterEgg = ["You must do the things you think you cannot do", "The wound is the place where the light enters you", "Sometimes the grass is greener because it's fake", "Remember to look up at the stars and not down at your feet", "If you never bleed you're never gonna grow", "A friend is one of the nicest things you can have, and one of the best things you can be.", "Life isn't about trying to survive the storm, It's about learning to dance in the rain"];
var EasterEgg2 = ["-Elanor Roosavelt", "-Rumi", "-David Wolfe", "-Steven Hawking", "-Taylor Swift", "-Douglas Pagels", "-Vivian Greene"];

function Startup()
{
    canvas = document.getElementById("HTMLCanvas");
    canvasController = canvas.getContext("2d");

    canvasX = 1000;
    canvasY = 1000;
    canvas.width = canvasX;
    canvas.height = canvasY;
    document.getElementById("Button").style.display = "none";
    canvasController.font = "bold 40px PT Serif";

    if (Day.getDay() == 6)//Blue
    {
        colourArray[0] = "#03045E";
        colourArray[1] = "#023E8A";
        colourArray[2] = "#0077B6";
        colourArray[3] = "#0096C7";
        colourArray[4] = "#00B4D8";
        colourArray[5] = "#48CAE4";
        colourArray[6] = "#90E0EF";
        colourArray[7] = "#ADE8F4";
        colourArray[8] = "#CAF0F8";
        backgroundColour = "#E8F9FC";
    }
    else if (Day.getDay() == 1)//Yellow
    {
        colourArray[0] = "#001219";
        colourArray[1] = "#005F73";
        colourArray[2] = "#0A9396";
        colourArray[3] = "#94D2BD";
        colourArray[4] = "#E9D8A6";
        colourArray[5] = "#EE9B00";
        colourArray[6] = "#CA6702";
        colourArray[7] = "#BB3E03";
        colourArray[8] = "#AE2012";
        backgroundColour = "#F7F1DE";
    }
    else if (Day.getDay() == 2)//Green
    {
        colourArray[0] = "#D9ED92";
        colourArray[1] = "#B5E48C";
        colourArray[2] = "#99D98C";
        colourArray[3] = "#76C893";
        colourArray[4] = "#52B69A";
        colourArray[5] = "#34A0A4";
        colourArray[6] = "#168AAD";
        colourArray[7] = "#1A759F";
        colourArray[8] = "#1E6091";
        backgroundColour = "#F1F9D8";
    }
    else if (Day.getDay() == 5)//Red
    {
        colourArray[0] = "#590D22";
        colourArray[1] = "#800F2F";
        colourArray[2] = "#A4133C";
        colourArray[3] = "#C9184A";
        colourArray[4] = "#FF4D6D";
        colourArray[5] = "#FF758F";
        colourArray[6] = "#FF8FA3";
        colourArray[7] = "#FFB3C1";
        colourArray[8] = "#FFCCD5";
        backgroundColour = "#FFF0F3";
    }
    else if (Day.getDay() == 4)//Beige
    {
        colourArray[0] = "#CB997E";
        colourArray[1] = "#DCBBA8";
        colourArray[2] = "#EDDCD2";
        colourArray[3] = "#FFF1E6";
        colourArray[4] = "#DDBEA9";
        colourArray[5] = "#CFB8A2";
        colourArray[6] = "#C1B29B";
        colourArray[7] = "#A5A58D";
        colourArray[8] = "#B7B7A4";
        backgroundColour = "#F0EFEB";
    }
    else if (Day.getDay() == 3)//Galaxy
    {
        colourArray[0] = "#f72585";
        colourArray[1] = "#B5179E";
        colourArray[2] = "#7209B7";
        colourArray[3] = "#560BAD";
        colourArray[4] = "#480CA8";
        colourArray[5] = "#3A0CA3";
        colourArray[6] = "#3F37C9";
        colourArray[7] = "#4361EE";
        colourArray[8] = "#4895EF";
        backgroundColour = "#140042";
    }
    else if(Day.getDay() == 0)//Pastel
    {
        colourArray[0] = "#fec5bb";
        colourArray[1] = "#FCD5CE";
        colourArray[2] = "#FAE1DD";
        colourArray[3] = "#D8E2DC";
        colourArray[4] = "#ECE4DB";
        colourArray[5] = "#FFE5D9";
        colourArray[6] = "#FFD7BA";
        colourArray[7] = "#FEC89A";
        colourArray[8] = "#E8E8E4";
        backgroundColour = "#F8EDEB";
    }
    

    canvasController.fillStyle = backgroundColour;
    canvasController.fillRect(0, 0, canvasX, canvasY); 
    intColour = 0;
    document.getElementById("Body").style.background = backgroundColour;
    document.getElementById("Button").style.background = backgroundColour;
    if (Day.getDay() == 3)
    {
    document.getElementById("Button").style.color = "#ffffff";
    }
    else
    {
        document.getElementById("Button").style.color = "#000000";
    }

    intNumberofShapes = Math.ceil(Math.random() * 100);
    intSize = Math.ceil(Math.random() * 100);
    loopController = setInterval(loopStuff, 50);
    intRandomNumber = Math.ceil(Math.random() * 100);
    intXPos = Math.ceil(Math.random() * canvasX);
    intYPos = Math.ceil(Math.random() * canvasY);
    intRabbit = Math.ceil(Math.random() * 1000);
    if (intRandomNumber < 15)
    {
        intRandomNumber += 15;
    }
}

function loopStuff()
{   
    intLineX = Math.ceil(Math.random() * canvasX);
    intLineY = Math.ceil(Math.random() * canvasY);
    intNumberofShapes -= 1;
    if (intTimer >= intRandomNumber)
    {
        clearInterval(loopController);
        Startup()
    }
    else
    {
        if(intNumberofShapes <= 0)
        {
            intNumberofShapes = Math.ceil(Math.random() * 100);
            intSize = Math.ceil(Math.random() * 100);
                intXPos = Math.ceil(Math.random() * canvasX);
            intYPos = Math.ceil(Math.random() * canvasY);
            intRandomNumber = Math.ceil(Math.random() * 100);
            intTimer += 1;
        }
        else
        {
            intSize -= 3;
            if(intColour < colourArray.length)
            {
                intColour += 1;
            }
            else
            {
            intColour = 0;
            }    
            canvasController.beginPath();
                canvasController.arc(intXPos, intYPos, intSize, 0, 2 * Math.PI);
                canvasController.fillStyle = colourArray[intColour];
                canvasController.fill();
            canvasController.closePath();
            var calculateTime = new Date();
            if (calculateTime.getSeconds() <= 15)
            {
                intXPos += 10;
                intYPos += 10;
            }
            else if ((calculateTime.getSeconds() <= 30) && (calculateTime.getSeconds() > 15))
            {
                intXPos -= 10;
                intYPos += 10;
            }
            else if ((calculateTime.getSeconds() <= 45) && (calculateTime.getSeconds() > 30))
            {
                intXPos += 10;
                intYPos -= 10;
            }
            else
            {
                intXPos -= 10;
                intYPos -= 10;
            }

            if(intYPos > canvasY)
            {
                intYPos = Math.ceil(Math.random() * canvasY);
            }
            else if (intYPos < 0)
            {
                intYPos = Math.ceil(Math.random() * canvasY);
            }

            if(intXPos > canvasX)
            {   
                intXPos = Math.ceil(Math.random() * canvasX);
            }
            else if(intXPos < 0)
            {
                intXPos = Math.ceil(Math.random() * canvasX);
            }

            intFlowerPosX = Math.ceil(Math.random() * canvasX);
            intFlowerPosY = Math.ceil(Math.random() * canvasY);

            if (Day.getDay() == 3)
            {
            canvasController.beginPath();
                canvasController.arc(intLineX, intLineY, 2, 0, 2 * Math.PI);
                canvasController.strokeStyle = "#FFFFFF";
                canvasController.fillStyle = "#FFFFFF";
                canvasController.fill();
                canvasController.stroke();
            canvasController.closePath();
            }
            else
            {
            canvasController.beginPath();
                canvasController.moveTo(intLineX, intLineY);
                canvasController.lineTo(intLineX + Math.ceil(Math.random() * 10), intLineY + Math.ceil(Math.random() * 10));
                canvasController.strokeStyle = colourArray[Math.floor(Math.random() * colourArray.length)];
                canvasController.lineWidth = Math.ceil(Math.random() * 20);
                canvasController.stroke();
            canvasController.closePath();
            canvasController.drawImage(imgFlower, intFlowerPosX, intFlowerPosY, 20, 20);
            }
        }
    }
}
function FinalTextBox()
{
    canvasController.fillStyle = backgroundColour;
        canvasController.strokeStyle = colourArray[1];
        canvasController.lineWidth = 5;
        canvasController.fillRect((canvasX/2) - 200, (canvasY/2) - 250, 445, 550);
        canvasController.strokeRect((canvasX/2) - 200, (canvasY/2) - 250, 445, 550);
        if (Day.getDay() == 3)
        {
            canvasController.fillStyle = "#FFFFFF";
        }
        else 
        {
            canvasController.fillStyle = "#000000";
        }
        canvasController.font = "bold 40px PT Serif";
        canvasController.fillText("Circles all the way down", (canvasX/2) - 195, (canvasY/2) - 220);
        canvasController.font = "bold 20px PT Serif";
        canvasController.fillText("Hannah McGinness", (canvasX/2) - 195, (canvasY/2) - 200)
        canvasController.font = "20px Calibri";
        canvasController.fillText("The colour scheme is chosen based on the day,", (canvasX/2) - 195, (canvasY/2) - 183);
        canvasController.fillText("this is acheived by creating a variable which is", (canvasX/2) - 195, (canvasY/2) - 165);
        canvasController.fillText("assigned the date, an if statement is then used", (canvasX/2) - 195, (canvasY/2) - 148);
        canvasController.fillText("to determine the colour scheme (which is held", (canvasX/2) - 195, (canvasY/2) - 130);
        canvasController.fillText("within an array) for that day. The 'cones' are", (canvasX/2) - 195, (canvasY/2) - 113);
        canvasController.fillText("created by starting a loop which runs at an", (canvasX/2) - 195, (canvasY/2) - 95);
        canvasController.fillText("interval of 0.05 seconds. Every time the loop runs", (canvasX/2) - 195, (canvasY/2) - 75);
        canvasController.fillText("a circle is generated at a random point on the", (canvasX/2) - 195, (canvasY/2) - 55);
        canvasController.fillText("canvas, the point is then assigned to two", (canvasX/2) - 195, (canvasY/2) - 35);
        canvasController.fillText("variables (one for the X axis and one for the Y ", (canvasX/2) - 195, (canvasY/2) - 15);
        canvasController.fillText("axis) and 5px are added or subtracted from", (canvasX/2) - 195, (canvasY/2) + 5);
        canvasController.fillText("each variable each time the loop runs, and another", (canvasX/2) - 195, (canvasY/2) + 25);
        canvasController.fillText("circle is generated at that point.", (canvasX/2) - 195, (canvasY/2) + 43);

        canvasController.fillText("The circles stop generating when a variable", (canvasX/2) - 195, (canvasY/2) + 65);
        canvasController.fillText("reaches a randomised number. The size and", (canvasX/2) - 195, (canvasY/2) + 83);
        canvasController.fillText("coordinates of the circle as well as the", (canvasX/2) - 195, (canvasY/2) + 100);
        canvasController.fillText("direction of the 'cone' are all controlled by", (canvasX/2) - 195, (canvasY/2) + 117);
        canvasController.fillText("random numbers. The direction is controlled ", (canvasX/2) - 195, (canvasY/2) + 135);
        canvasController.fillText("by the time, a variable gets the time and ", (canvasX/2) - 195, (canvasY/2) + 153);
        canvasController.fillText("then an if statement is used to control", (canvasX/2) - 195, (canvasY/2) + 170);
        canvasController.fillText("whether the interval is increased or decreased,", (canvasX/2) - 195, (canvasY/2) + 187);
        canvasController.fillText("which changes the direction of the cone.", (canvasX/2) - 195, (canvasY/2) + 205);
        canvasController.fillText("The border is created by placing an image at", (canvasX/2) - 195, (canvasY/2) + 225);
        canvasController.fillText("15, 15 and increasing the x or y coordinates", (canvasX/2) - 195, (canvasY/2) + 245);
        canvasController.fillText("by 15. An if statement is used to determine", (canvasX/2) - 195, (canvasY/2) + 265);
        canvasController.fillText("which coordinate to increase.", (canvasX/2) - 195, (canvasY/2) + 285);
        if (intRabbit < 20)
        {
            canvasController.font = "30px Zilla Slab Highlight";
            canvasController.strokeStyle = colourArray[Math.floor(Math.random() * colourArray.length)];
            canvasController.fillText(EasterEgg[Day.getDay()], 10, 30);
            canvasController.fillText(EasterEgg2[Day.getDay()], 10, 60);
        }
}