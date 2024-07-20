function StartUp()
{
    document.getElementsByTagName("input")[0].focus();
    getSubscriptionKey();
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

getSubscriptionKey = function()
{

    var COOKIE = "bing-autosuggest-api-key";   // name used to store API key in key/value storage

    function findCookie(name)
    {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++)
        {
            var keyvalue = cookies[i].split("=");
            if (keyvalue[0].trim() === name)
            {
                return keyvalue[1];
            }
        }
        return "";
    }

    function getSubscriptionKeyCookie()
    {
        var key = findCookie(COOKIE);
        while (key.length !== 32)
        {
            key = prompt("Enter Bing Autosuggest API subscription key:", "").trim();
            var expiry = new Date();
            expiry.setFullYear(expiry.getFullYear() + 2);
            document.cookie = COOKIE + "=" + key.trim() + "; expires=" + expiry.toUTCString();
        }
        return key;
    }

    function getSubscriptionKeyLocalStorage()
    {
        var key = localStorage.getItem(COOKIE) || "";
        while (key.length !== 32)
            key = prompt("Enter Bing Autosuggest API subscription key:", "").trim();
        localStorage.setItem(COOKIE, key)
        return key;
    }

    function getSubscriptionKey(invalidate)
    {
        if (invalidate)
        {
            try
            {
                localStorage.removeItem(COOKIE);
            } catch (e)
            {
                document.cookie = COOKIE + "=";
            }
        } else
        {
            try
            {
                return getSubscriptionKeyLocalStorage();
            } catch (e)
            {
                return getSubscriptionKeyCookie();
            }
        }
    }

    return getSubscriptionKey;

}();

function bingAutosuggest(query, key)
{
    var endpoint = "https://api.bing.microsoft.com/v7.0/suggestions";

    var request = new XMLHttpRequest();

    try
    {
        request.open("GET", endpoint + "?q=" + encodeURIComponent(query));
    }
    catch (e)
    {
        renderErrorMessage("Bad request");
        return false;
    }

    request.setRequestHeader("Ocp-Apim-Subscription-Key", key);

    request.addEventListener("load", function()
    {
        if (this.status === 200)
        {
            renderSearchResults(JSON.parse(this.responseText));
        }
        else
        {
            if (this.status === 401) getSubscriptionKey(true);
            renderErrorMessage(this.statusText, this.status);
        }
    });

    request.addEventListener("error", function()
    {
        renderErrorMessage("Network error");
    });

    request.addEventListener("abort", function()
    {
        renderErrorMessage("Request aborted");
    });

    request.send();
    return false;
}

function renderSearchResults(results)
{
    console.log(JSON.stringify(results, null, 2));
}

function renderErrorMessage(message, code)
{
    if (code)
        console.error(code + ": " + message);
    else
        console.error(message);
}