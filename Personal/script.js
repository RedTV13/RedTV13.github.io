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
})

document.getElementsByTagName("body")[0].addEventListener("click", (e) =>
{
    if (e.target.tagName != "svg")
    {
        document.getElementById("menu").classList.add("hidden");
    }
})
