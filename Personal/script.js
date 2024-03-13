function StartUp()
{
    document.getElementsByTagName("input")[0].focus();
}

function showMenu()
{
    document.getElementById("menu").classList.toggle("hidden");
}

function search(e)
{
    window.open("https://www.bing.com/search?q=" + e, "_self")
}

document.getElementById("search").addEventListener("keydown", (e) =>
{
    if (e.key == "Enter")
    {
        search(document.getElementById("search").value);
    }
<<<<<<< HEAD
})
=======
})
>>>>>>> f7f710ad75d6f455c62f7e741875914d067d07d8
