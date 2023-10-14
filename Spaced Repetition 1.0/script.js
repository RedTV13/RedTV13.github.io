
let container = document.getElementById("container");
let navigation = document.getElementById("navigation");
let btnSections = document.getElementById("btnSections");
let btnBoxes = document.getElementById("btnBoxes");
let divSections = document.getElementById("divSections");
let divBoxes = document.getElementById("divBoxes");
let lstSections = document.getElementById("lstSections");
let lstBoxes = document.getElementById("lstBoxes");
let newSection = document.getElementById("newSection");
let modes = document.getElementById("modes");
let spnEdit = document.getElementById("spnEdit");
let spnReview = document.getElementById("spnReview");
let content = document.getElementById("content");
let spnEditMode = document.getElementById("spnEditMode");
let spnReviewMode = document.getElementById("spnReviewMode");
let spnQuestion = document.getElementById("spnQuestion");
let spnAnswer = document.getElementById("spnAnswer");
let btnShowAns = document.getElementById("btnShowAns");
let diffButtons = document.getElementById("spnDiffBtns");
let btnVEasy = document.getElementById("btnSuperEasy");
let btnEasy = document.getElementById("btnEasy");
let btnMed = document.getElementById("btnMed");
let btnHard = document.getElementById("btnHard");
let btnHarder = document.getElementById("btnVeryHard");
let btnVHard = document.getElementById("btnNoClue");
let btnNextQ = document.getElementById("btnNextQ");
let newSecModal = document.getElementById("newSecModal");
let overlay = document.getElementById("fullOverlay");
let iptName = document.getElementById("iptName");
let snackbar = document.getElementById("snackbar");
let iptDifficulty = document.getElementById("iptDifficulty");
let iptQuestion = document.getElementById("iptQuestion");
let iptAnswer = document.getElementById("iptAnswer");
let spnEditQ = document.getElementById("spnQuestionE");
let spnEditA = document.getElementById("spnAnswerE");

let q = 5;
let i = 0;
let n = 0;

let arrBoxes = ["Very Easy", "Easy", "Medium", "Hard", "Harder", "Very Hard"];
let arrQuestions = [];
let arrAnswers = [];
let userInputQ;
let userInputA;
let li;
let t;
let sectionName;
let activeSection;
let sectionIndex;
let sectionCount = 0;
let booSectSelect;

function startUp()
{
    sectionCount = 0;
    booSectSelect = false;
    for (i = 0; i < arrBoxes.length; i++)
    {
        BoxName = arrBoxes[i];
        li = document.createElement("li");
        t = document.createTextNode(arrBoxes[i]);
        li.appendChild(t);
        li.id = i + BoxName;
        lstBoxes.appendChild(li);
    }

    if ((localStorage.getItem("sectionCount") != "NaN") && (localStorage.getItem("sectionCount") != null));
    {
        sectionCount = localStorage.getItem("sectionCount");
    }

    for (i = 0; i <= sectionCount; i++)
    {
        sectionName = localStorage.getItem("section" + (i).toString()).slice(1);
        li = document.createElement("li");
        t = document.createTextNode(sectionName);
        li.appendChild(t);
        li.id = i + sectionName;
        lstSections.appendChild(li);
        arrQuestions[i] = new Array();
        arrAnswers[i] = new Array();
        for (j = 0; j <= localStorage.getItem("questionCount"); j++)
        {
            if (localStorage.getItem("Q" + i + "." + j) != null)
            {
                arrQuestions[i][j] = localStorage.getItem("Q" + i + "." + j);
                arrAnswers[i][j] = localStorage.getItem("A" + i + "." + j);
            }
        }
    }

    console.log(arrQuestions);
    console.log(arrAnswers);
}

//---------------------------------------------------NAVIGATION PANEL-----------------------------------------------------------------------

function showSections()
{
    btnSections.className = "active";
    btnBoxes.className = "inactive";
    divBoxes.className = "hidden";
    divSections.className = "shown";
}

function createNewSection()
{
    newSecModal.className = "shown";
    overlay.className = "shown";
    iptName.focus();
}

function saveSection()
{
    if (iptName.value == "")
    {
        snackbar.innerHTML = "You must write something!";
        snackbar.className = "show";
        setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
    }
    else
    {
        sectionName = iptName.value;
        li = document.createElement("li");
        t = document.createTextNode(sectionName);
        li.appendChild(t);
        li.id = sectionCount + sectionName;
        console.log(li.id);
        lstSections.appendChild(li);
        newSecModal.className = "hidden";
        overlay.className = "hidden";
        iptName.value = "";
        arrQuestions[sectionCount] = new Array();
        arrAnswers[sectionCount] = new Array();
        localStorage.setItem("section" + sectionCount, sectionCount + sectionName);
        localStorage.setItem("sectionCount", sectionCount);
        sectionCount++;
    }
}

iptName.addEventListener("keyup", function(e)
{
    if (e.key === "Enter")
    {
        saveSection(e);
    }
})

function hideModal()
{
    newSecModal.className = "hidden";
    overlay.className = "hidden";
}

function showBoxes()
{
    btnSections.className = "inactive";
    btnBoxes.className = "active";
    divBoxes.className = "shown";
    divSections.className = "hidden";
}

lstSections.addEventListener("click", function(ev)
{
    if (ev.target.id != activeSection)
    {
        if (booSectSelect)
        {
            document.getElementById(activeSection).classList.toggle("active");
        }
        else
        {
            booSectSelect = true;
        }
        ev.target.className = "active";
        activeSection = ev.target.id;
        sectionIndex = activeSection.toString().slice(0, 1);
        n = 0;
        console.log(activeSection);
    }
    else
    {
        ev.target.classList.toggle("active");
        activeSection = "";
        sectionIndex = null;
    }
})

lstBoxes.addEventListener("click", function(ev)
{
    if (ev.target.id != activeBox)
    {
        ev.target.className = "active";
        activeBox = ev.target.id;
        boxIndex = activeBox.toString().slice(0, 1);
        n = 0;
    }
    else
    {
        ev.target.className = "";
        activeSection = "";
        sectionIndex = null;
    }
})

//--------------------------------------------------------EDIT MODE-----------------------------------------------------------------------

function editMode()
{
    spnEdit.className = "active";
    spnReview.className = "inactive";
    spnQuestion.innerHTML = arrQuestions[n];
    spnReviewMode.className = "hidden";
    spnEditMode.className = "shown";
    if (activeSection == null)
    {
        spnEditQ.innerHTML = "please select a section";
        spnEditA.className = "hidden";
    }
}

function saveQuestion()
{
    if (sectionIndex != null)
    {
        console.log(arrQuestions[sectionIndex])
        userInputQ = iptQuestion.value;
        userInputA = iptAnswer.value;
        iptQuestion.value = "";
        iptAnswer.value = "";
        arrQuestions[sectionIndex].push(userInputQ);
        arrAnswers[sectionIndex].push(userInputA);
        localStorage.setItem("Q" + sectionIndex + "." + arrQuestions[sectionIndex].length, userInputQ);
        localStorage.setItem("A" + sectionIndex + "." + arrAnswers[sectionIndex].length, userInputA);
        localStorage.setItem("questionCount", arrQuestions[sectionIndex].length);
        console.log(arrQuestions);
        console.log(arrAnswers);
    }
}

//--------------------------------------------------------REVIEW MODE-----------------------------------------------------------------------

function reviewMode()
{
    spnEdit.className = "inactive";
    spnReview.className = "active";
    spnReviewMode.className = "shown";
    spnEditMode.className = "hidden";
    if (activeSection == null)
    {
        spnQuestion.innerHTML = "no section selected";
    }
    else if (arrQuestions[n] != null)
    {
        spnQuestion.innerHTML = arrQuestions[n];
        spnAnswer.innerHTML = arrAnswers[n];
    }
    else
    {
        spnQuestion.innerHTML = "no questions in selected section";
    }
}

function displayAnswer()
{
    spnAnswer.className = "shown";
    btnNextQ.className = "shown";
    spnDiffBtns.style.display = "inline-block";
}

function setDifficulty()
{
    q = iptDifficulty.value;
}

function nextQ()
{
    n++;
    btnNextQ.className = "hidden";
    spnQuestion.innerHTML = arrQuestions[sectionIndex][n];
    spnAnswer.innerHTML = arrAnswers[sectionIndex][n];
}