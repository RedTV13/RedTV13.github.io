
var btnSections = document.getElementById("btnSections");
var btnNewSection = document.getElementById("newSection");
var ulSections = document.getElementById("lstSections");

var newSectionModal = document.getElementById("newSecModal");
var iptName = document.getElementById("iptName");
var overlay = document.getElementById("fullOverlay");

var btnBoxes = document.getElementById("btnBoxes");
var ulBoxes = document.getElementById("lstBoxes");

var btnReview = document.getElementById("spnReview");
var spnReview = document.getElementById("spnReviewMode");
var spnQuestion = document.getElementById("spnQuestion");
var spnAnswer = document.getElementById("spnAnswer");
var btnShowAns = document.getElementById("btnShowAns");
var difficultyButtons = document.getElementById("spnDiffBtns");

var btnEdit = document.getElementById("spnEdit");
var spnEdit = document.getElementById("spnEditMode");
var btnEditCards = document.getElementById("btnEditCard");
var spnEditQuestion = document.getElementById("spnQuestionE");
var spnEditAns = document.getElementById("spnAnswerE");
var iptQuestion = document.getElementById("iptQuestion");
var iptAnswer = document.getElementById("iptAnswer");
var btnSaveCard = document.getElementById("btnSaveCard");
var btnDeleteCard = document.getElementById("btnDeleteCard");
var btnNext = document.getElementById("btnNext");
var btnBack = document.getElementById("btnBack");

var divSettings = document.getElementById("settingsModal");
var divHelp = document.getElementById("helpModal");

var drawInterval;

var sectionName;
var sections = {};
var activeSection;
var a;
var boxes = ["late", "today", "tomorrow", "other"];
var activeBox;

let arrCards = [];
let arrSections = [];

//Counters
var intSection = 0;
var intCard = 0;

var EF = 2.5;

function startUp()
{
    if (activeSection == undefined)
    {
        spnQuestion.innerHTML = "no section selected";
        spnEditQuestion.innerHTML = "no section selected";
        btnShowAns.className = "hidden";
        spnEditAns.className = "hidden";
        iptAnswer.className = "hidden";
        iptQuestion.className = "hidden";
        btnSaveCard.className = "hidden";
        btnEditCards.className = "hidden";
        btnDeleteCard.className = "hidden";
        btnNext.className = "hidden";
        btnBack.className = "hidden";
    }

    if (localStorage.length > 1)
    {
        intSection = parseInt(localStorage.getItem("sectionCount"));
        for (let i = 0; i < intSection + 1; i++)
        {
            sectionName = localStorage.getItem("section" + i);
            li = document.createElement("li");
            t = document.createTextNode(sectionName);
            li.appendChild(t);
            li.id = sectionName;
            lstSections.appendChild(li);
            sections[sectionName] = {};
            sections[sectionName].index = i;
        }

        Object.keys(sections).forEach(section =>
        {
            for (let i = 0; i < localStorage.getItem(section + "-cards"); i++)
            {
                sections[section]["card" + i] = {};
                sections[section]["card" + i].question = localStorage.getItem(section + "-card" + i + "-question");
                sections[section]["card" + i].answer = localStorage.getItem(section + "-card" + i + "-answer");
                sections[section]["card" + i].dateCreated = new Date(localStorage.getItem(section + "-card" + i + "-dateCreated"));
                sections[section]["card" + i].ef = parseFloat(localStorage.getItem(section + "-card" + i + "-ef"));
                sections[section]["card" + i].n = parseInt(localStorage.getItem(section + "-card" + i + "-n"));
                sections[section]["card" + i].nextInterval = new Date(localStorage.getItem(section + "-card" + i + "-nextInterval"));
                sections[section]["card" + i].reviewTime = parseInt(localStorage.getItem(section + "-card" + i + "-reviewTime"));
            }
        })

        Object.keys(sections).forEach(a => 
        {
            Object.keys(sections[a]).forEach(b => 
            {
                if (b != "index")
                {
                    sections[a][b].reviewTime = subtractDays(new Date(), sections[a][b].dateCreated);
                    calcBox(sections[a][b]);
                }
            })
        })
    }

    boxes.forEach(e => 
    {
        li = document.createElement("li");
        t = document.createTextNode(e);
        li.appendChild(t);
        li.id = e;
        lstBoxes.appendChild(li);
    });
}

function showSections()
{
    btnSections.className = "active";
    btnBoxes.className = "";
    divBoxes.className = "hidden";
    divSections.className = "";
    btnNewSection.className = "";
    if (activeSection == undefined)
    {
        spnQuestion.innerHTML = "no section selected";
    }
}

function showBoxes()
{
    if (btnReview.className == "active")
    {
        btnBoxes.className = "active";
        btnSections.className = "";
        divBoxes.className = "";
        divSections.className = "hidden";
        btnNewSection.className = "hidden";
        if (activeBox == undefined)
        {
            spnQuestion.innerHTML = "no box selected";
        }
    }
    else
    {
        snackbar.innerHTML = "You can't view boxes in edit mode";
        snackbar.className = "show";
        setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
    }
}

ulSections.addEventListener("click", (ev) =>
{
    Object.keys(sections).forEach(e => 
    {
        if (ev.target.id == e)
        {
            activeSection = e;
        }
    })

    Object.keys(sections).forEach(e =>
    {
        if (e == activeSection)
        {
            document.getElementById(activeSection).className = "active";
        }
        else
        {
            document.getElementById(e).className = "";
        }
    })

    if (sections[activeSection].card0 != undefined)
    {
        spnQuestion.innerHTML = sections[activeSection].card0.question;
        spnAnswer.innerHTML = sections[activeSection].card0.answer;
        btnShowAns.className = "";
    }
    else
    {
        spnQuestion.innerHTML = "No cards in this section";
    }
    spnEditQuestion.innerHTML = "Question:";
    spnEditAns.className = "";
    iptAnswer.className = "";
    iptQuestion.className = "";
    btnSaveCard.className = "";
    btnEditCards.className = "";
    intCard = 0;
})

ulBoxes.addEventListener("click", (ev) =>
{
    arrCards = [];
    arrSections = [];
    boxes.forEach(e => 
    {
        if (ev.target.id == e)
        {
            activeBox = e;
        }
    })

    boxes.forEach(e =>
    {
        if (e == activeBox)
        {
            document.getElementById(activeBox).className = "active";
        }
        else
        {
            document.getElementById(e).className = "";
        }
    })

    Object.keys(sections).forEach(a =>
    {
        Object.keys(sections[a]).forEach(b =>
        {
            if (sections[a][b].box == activeBox)
            {
                arrSections.push(a);
                arrCards.push(b.slice(4));
            }
        })
    })

    if (arrCards.length > 0)
    {
        spnQuestion.innerHTML = sections[arrSections[0]]["card" + arrCards[0]].question;
        spnAnswer.innerHTML = sections[arrSections[0]]["card" + arrCards[0]].answer;
        btnShowAns.className = "";
    }
    else
    {
        spnQuestion.innerHTML = "no cards in this box";
    }
    intCard = 0;
})

function editCards()
{
    btnSaveCard.onclick = (e) => saveCard();
    btnEditCards.onclick = (e) => editMode();
    btnEditCards.innerHTML = "Add cards";
    btnDeleteCard.className = "";
    btnNext.className = "";
    btnBack.className = "";
    intCard = 0;
    btnBack.style.color = "rgb(179, 179, 179)";
    iptQuestion.value = sections[activeSection]["card" + intCard].question;
    iptAnswer.value = sections[activeSection]["card" + intCard].answer;
}

function saveCard()
{
    sections[activeSection]["card" + intCard].question = iptQuestion.value;
    sections[activeSection]["card" + intCard].answer = iptAnswer.value;
}

function back()
{
    if (intCard > 0)
    {
        intCard--;
        iptQuestion.value = sections[arrSections[intCard]]["card" + arrCards[intCard]].question;
        iptAnswer.value = sections[arrSections[intCard]]["card" + arrCards[intCard]].answer;
    }
}

var timer = setInterval(function()
{
    if (activeSection != undefined)
    {
        if (intCard <= 0)
        {
            btnBack.style.color = "rgb(180, 180, 180)";
        }
        else
        {
            btnBack.style.color = "rgb(0, 0, 0)";
        }

        if (intCard >= Object.keys(sections[activeSection]).length - 2)
        {
            btnNext.style.color = "rgb(180, 180, 180)";
        }
        else
        {
            btnNext.style.color = "rgb(0, 0, 0)";
        }
    }
})

function next()
{
    if (intCard < Object.keys(sections[activeSection]).length - 2)
    {
        intCard++;
        iptQuestion.value = sections[activeSection]["card" + intCard].question;
        iptAnswer.value = sections[activeSection]["card" + intCard].answer;
    }
}

function deleteCard()
{
    delete sections[activeSection]["card" + intCard];
    snackbar.innerHTML = "Card deleted";
    snackbar.className = "show";
    intCard--;
    iptQuestion.value = sections[activeSection]["card" + intCard].question;
    iptAnswer.value = sections[activeSection]["card" + intCard].answer;
    setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
    reIndexCards();
}

function reIndexCards()
{
    let i = 0;
    Object.keys(sections[activeSection]).forEach(e =>
    {
        if (parseInt(e.slice(4)) != i)
        {
            a = sections[activeSection][e];
            sections[activeSection]["card" + i] = {
                question: a.question,
                answer: a.answer,
                dateCreated: a.dateCreated,
                ef: a.ef,
                n: a.n,
                nextInterval: a.nextInterval,
                reviewTime: a.reviewTime
            }

            localStorage.setItem(activeSection + "-" + "cards", i);
            localStorage.setItem(activeSection + "-" + "card" + i + "-" + "question", iptQuestion.value);
            localStorage.setItem(activeSection + "-" + "card" + i + "-" + "answer", iptAnswer.value);
            localStorage.setItem(activeSection + "-" + "card" + i + "-" + "dateCreated", a.dateCreated.toDateString());
            localStorage.setItem(activeSection + "-" + "card" + i + "-" + "ef", a.ef);
            localStorage.setItem(activeSection + "-" + "card" + i + "-" + "n", a.n);
            localStorage.setItem(activeSection + "-" + "card" + i + "-" + "nextInterval", a.nextInterval);
            localStorage.setItem(activeSection + "-" + "card" + i + "-" + "reviewTime", a.reviewTime);
        }
        i++;
    })
}

function createNewSection()
{
    newSectionModal.className = "";
    overlay.className = "";
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
        iptName.value = "";
        hideModal(newSectionModal);
        li = document.createElement("li");
        t = document.createTextNode(sectionName);
        li.appendChild(t);
        li.id = sectionName;
        lstSections.appendChild(li);
        sections[sectionName] = {};
        sections[sectionName].index = intSection;
        localStorage.setItem("section" + intSection, sectionName);
        localStorage.setItem(sectionName + "-" + "index", intSection);
        localStorage.setItem("sectionCount", intSection);
        intSection++;
    }
}

iptName.addEventListener("keyup", (e) => 
{
    if (e.key == "Enter")
    {
        saveSection();
    }
})

function hideModal(element)
{
    element.className = "hidden";
    overlay.className = "hidden";
    iptName.value = "";
    //document.getElementsByTagName("input").value = "";
}

// function hideModal()
// {
//     newSectionModal.className = "hidden";
//     divSettings.className = "hidden";
//     divHelp.className = "hidden";
//     overlay.className = "hidden";
//     iptName.value = "";
// }

function reviewMode()
{
    btnReview.className = "active";
    btnEdit.className = "";
    spnEdit.className = "hidden";
    spnReview.className = "";
    if (sections[activeSection].card0 != undefined)
    {
        spnQuestion.innerHTML = sections[activeSection].card0.question;
        spnAnswer.innerHTML = sections[activeSection].card0.answer;
        btnShowAns.className = "";
    }
    else
    {
        spnQuestion.innerHTML = "No cards in this section";
    }
}

function editMode()
{
    if (btnSections.className == "active")
    {
        btnReview.className = "";
        btnEdit.className = "active";
        spnEdit.className = "";
        spnReview.className = "hidden";
        btnSaveCard.onclick = (e) => saveQuestion();
        btnEditCards.onclick = (e) => editCards();
        btnEditCards.innerHTML = "Edit cards";
        btnDeleteCard.className = "hidden";
        btnNext.className = "hidden";
        btnBack.className = "hidden";
        iptQuestion.value = "";
        iptAnswer.value = "";
    }
    else
    {
        snackbar.innerHTML = "You can't edit cards in box mode";
        snackbar.className = "show";
        setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
    }
}

function displayAnswer()
{
    spnAnswer.className = "";
    difficultyButtons.className = "";
    btnShowAns.className = "hidden";
}

function nextQ()
{
    if (intCard < Object.keys(sections[activeSection]).length - 1)
    {
        intCard++;
        spnQuestion.innerHTML = sections[activeSection]["card" + intCard].question;
        spnAnswer.innerHTML = sections[activeSection]["card" + intCard].answer;
        btnShowAns.innerHTML = "Display answer";
        btnShowAns.onclick = (e) => displayAnswer();
        btnShowAns.className = "";
        spnAnswer.className = "hidden";
        difficultyButtons.className = "hidden";
    }
    else
    {
        spnQuestion.innerHTML = "You have finished reviewing this section!";
        btnShowAns.className = "";
        btnShowAns.innerHTML = "restart";
        btnShowAns.onclick = (e) => restartSection();
        spnAnswer.className = "hidden";
        difficultyButtons.className = "hidden";
    }
}

function restartSection()
{
    intCard = 0;
    spnQuestion.innerHTML = sections[activeSection]["card" + intCard].question;
    spnAnswer.innerHTML = sections[activeSection]["card" + intCard].answer;
    btnShowAns.innerHTML = "Display answer";
    btnShowAns.onclick = (e) => displayAnswer();
    btnShowAns.className = "";
    spnAnswer.className = "hidden";
    difficultyButtons.className = "hidden";
}

function saveQuestion()
{
    if (iptQuestion.value != "" && iptAnswer.value != "")
    {
        a = sections[activeSection]["card" + intCard];
        a = {
            question: iptQuestion.value,
            answer: iptAnswer.value,
            dateCreated: new Date(),
            ef: 2.5,
            n: 1,
            nextInterval: addDays(new Date, repetitionInterval(1, 2.5)),
            reviewTime: subtractDays(new Date(), new Date)
        };

        localStorage.setItem(activeSection + "-" + "cards", intCard);
        localStorage.setItem(activeSection + "-" + "card" + intCard + "-" + "question", iptQuestion.value);
        localStorage.setItem(activeSection + "-" + "card" + intCard + "-" + "answer", iptAnswer.value);
        localStorage.setItem(activeSection + "-" + "card" + intCard + "-" + "dateCreated", a.dateCreated.toDateString());
        localStorage.setItem(activeSection + "-" + "card" + intCard + "-" + "ef", a.ef);
        localStorage.setItem(activeSection + "-" + "card" + intCard + "-" + "n", a.n);
        localStorage.setItem(activeSection + "-" + "card" + intCard + "-" + "nextInterval", a.nextInterval);
        localStorage.setItem(activeSection + "-" + "card" + intCard + "-" + "reviewTime", a.reviewTime);
        iptQuestion.value = "";
        iptAnswer.value = "";
        intCard++;

        snackbar.innerHTML = "Card saved";
        snackbar.className = "show";
        setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
    }
    else
    {
        snackbar.innerHTML = "You must write something!";
        snackbar.className = "show";
        setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
    }
}

function addDays(date, days)
{
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function subtractDays(date1, date2)
{
    var oneDay = 1000 * 60 * 60 * 24;
    var differenceMs = Math.abs(date1 - date2);
    return Math.round(differenceMs / oneDay);
}

iptAnswer.addEventListener("keyup", (e) => 
{
    if (e.key == "Enter")
    {
        saveQuestion();
    }
})

iptQuestion.addEventListener("keyup", (e) => 
{
    if (e.key == "Enter")
    {
        saveQuestion();
    }
})

function repetitionInterval(n, e)
{
    if (n > 2)
    {
        return repetitionInterval(n - 1, e) * e;
    }
    else if (n == 2)
    {
        return 6;
    }
    else if (n == 1)
    {
        return 1;
    }
}

function easinessFactor(q)
{
    if (q < 3)
    {
        sections[activeSection]["card" + intCard].n = 0;
    }
    EF = EF + (0.1 + (5 - q) * (0.08 + (5 - q) * 0.02));
    if (EF < 1.3)
    {
        EF = 1.3;
    }
    return EF;
}

difficultyButtons.addEventListener("click", (e) =>
{
    e.target.className = "active";
    for (let i = 0; i < 6; i++)
    {
        if (e.target.id == "spn" + i)
        {
            let a = sections[activeSection]["card" + intCard];
            a.n++;
            a.q = i;
            a.ef = easinessFactor(a.q);
            a.nextInterval = addDays(a.dateCreated, repetitionInterval(a.n, a.ef));
            nextQ();
        }
        else
        {
            document.getElementById("spn" + i).className = "";
        }
    }
})

function calcBox(obj)
{
    let now = noTime(new Date());
    obj.nextInterval = noTime(obj.nextInterval);
    if (obj.nextInterval.toDateString() == now.toDateString())
    {
        obj.box = "today";
    }
    else if (obj.nextInterval.toDateString() == addDays(now, 1).toDateString())
    {
        obj.box = "tomorrow";
    }
    else if (obj.nextInterval.toDateString() < now.toDateString())
    {
        obj.box = "late";
    }
    else
    {
        obj.box = "other";
    }
}

function noTime(d)
{
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}

function showSettings()
{
    divSettings.className = "";
    overlay.className = "";
}

function showHelp()
{
    divHelp.className = "";
    overlay.className = "";
}