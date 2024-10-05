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
    window.open("https://www.bing.com/search?q=" + e, "_self");
}

document.getElementById("search").addEventListener("keydown", (e) =>
{
    if (e.key == "Enter")
    {
        search(document.getElementById("search").value);
    }
    else
    {
        bingAutosuggest(document.getElementById("search").value, getSubscriptionKey());
    }
})

document.getElementsByTagName("body")[0].addEventListener("click", (e) =>
{
    if (e.target.id != "icon")
    {
        document.getElementById("menu").classList.add("hidden");
    }

    if (e.target.id != "search")
    {
        document.getElementById("suggestions").classList.add("hidden");
    }
});

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
            }
            catch (e)
            {
                document.cookie = COOKIE + "=";
            }
        }
        else
        {
            try
            {
                return getSubscriptionKeyLocalStorage();
            }
            catch (e)
            {
                return getSubscriptionKeyCookie();
            }
        }
    }

    return getSubscriptionKey;

}();

let lastSuggestion = new Date();
let prevVal = "";
var request;
let queryTimeout;
function bingAutosuggest(query, key)
{
    let now = new Date();
    if (now.getTime() - lastSuggestion.getTime() > 400)
    {
        var endpoint = "https://api.bing.microsoft.com/v7.0/suggestions";

        request = new XMLHttpRequest();

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
        lastSuggestion = new Date();
        return false;
    }
    else
    {
        queryTimeout = setTimeout(() =>
        {
            bingAutosuggest(query, key);
        }, 100);
    }
}

function renderSearchResults(results)
{
    let s = document.getElementById("suggestions");

    if (document.getElementById('search').value == '')
    {
        s.classList.add('hidden');
    }
    else
    {
        s.classList.remove('hidden');
        s.innerHTML = "";
        let suggestions = results.suggestionGroups[0].searchSuggestions;

        if (suggestions.length > 5)
        {
            suggestions.splice(5, suggestions.length - 5);
        }

        suggestions.forEach(el =>
        {
            let li = document.createElement('li');
            let a = document.createElement('a');
            li.classList.add('suggestion');
            a.innerHTML = el.displayText;
            a.href = el.url;
            li.addEventListener('mouseover', () =>
            {
                prevVal = document.getElementById("search").value;
                document.getElementById("search").value = el.displayText;
            })

            li.addEventListener('mouseout', () =>
            {
                document.getElementById("search").value = prevVal;
            })
            li.append(a);
            s.append(li);
        });
    }
}

function renderErrorMessage(message, code)
{
    if (code)
        console.error(code + ": " + message);
    else
        console.error(message);
}