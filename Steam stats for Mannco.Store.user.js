// ==UserScript==

// @name         Steam Info for mannco.store
// @namespace    https://github.com/LucasHenriqueDiniz
// @version      0.131
// @description  Provides the Steam info and a link to respective mannco item
// @author       Lucas Diniz
// @license      MIT

// @require      https://code.jquery.com/jquery-3.6.1.min.js
// @match        *://mannco.store/item/*
// @grant        GM.xmlHttpRequest
// @icon         https://cdn-icons-png.flaticon.com/512/194/194978.png

// @homepageURL  https://github.com/LucasHenriqueDiniz/Steam-stats-for-Mannco.Store
// @supportURL   https://github.com/LucasHenriqueDiniz/Steam-stats-for-Mannco.Store/issues
// @downloadURL  https://raw.githubusercontent.com/LucasHenriqueDiniz/Steam-stats-for-Mannco.Store/main/Steam%20stats%20for%20Mannco.Store

// ==/UserScript==
var $ = window.jQuery;


var APPID;
var CURRENCY = 1 //1 = $ | 2 = £ | 3 Euro | 4 CHLF | 5 py6 | 6 polony | 7 R$
var ITEMNAME = document.querySelector("#page-sidebar > div > div > div.card-item > h2 > span").textContent.trim().replaceAll('#', '%23').replaceAll(`'`, '%27')

//Need a better way for the future, this one sometimes bugs

APPID = window.location.href.match(/(?<=\/)[0-9]{3,6}/g)

if (APPID != 440 && APPID != 730 && APPID != 252490 && APPID != 570) {

    if ($('dt')[$('dt').length - 1].firstChild.textContent === "SKU") {

        APPID = 440
    } else {

        switch (document.querySelector("#store-game > ul > li.nav-item.active").textContent.trim()) {
            case ('Counter Strike'):
                APPID = 730;
                break;
            case ('Team Fortress 2'):
                APPID = 440;
                break;
            case ('Rust'):
                APPID = 252490;
                break;
            case ('Dota 2'):
                APPID = 570;
                break;
            case ('Physical & Gift Cards'):
                APPID = null;
                break;
        }
    }
}

var Card2 = document.createElement('div')
Card2.id = "cardbody2";
Card2.className = "card-body";
Card2.setAttribute("style", "position: relative;display: flex;flex-direction: column;min-width: 0;word-wrap: break-word;background-color: #323351;background-clip: border-box;border: 1px solid #323351;border-radius: 1rem")
document.querySelector("#page-sidebar").appendChild(Card2);

//

var SteamTitle = document.createElement('text')
SteamTitle.className = 'item-name'
SteamTitle.innerHTML = 'Steam Info'
SteamTitle.style = "margin-top: 0.25rem;box-sizing: border-box;font-weight: 700;color: #adaadf;margin-bottom: 15px;text-align: center;color: rgb(255 255 255);font-size: 2rem;"
document.getElementById("cardbody2").appendChild(SteamTitle);

//

var li1 = document.createElement('div')
li1.className = "li"
document.getElementById("cardbody2").appendChild(li1);

var li2 = document.createElement('div')
li2.className = "li"
document.getElementById("cardbody2").appendChild(li2);

var li3 = document.createElement('div')
li3.className = "li"
document.getElementById("cardbody2").appendChild(li3);

//

var dl1 = document.createElement('div')
dl1.className = 'dl'
document.querySelector("#cardbody2").childNodes[1].appendChild(dl1)

var dl2 = document.createElement('div')
dl2.className = 'dl'
document.querySelector("#cardbody2").childNodes[2].appendChild(dl2)

var dl3 = document.createElement('div')
dl3.className = 'dl'
document.querySelector("#cardbody2").childNodes[3].appendChild(dl3)

//

var Title = 'font-weight: 700;font-size: .75rem;color: #cbcbd3;margin-bottom: 3px;'
var Text = 'font-weight: 700;font-size: 1.75rem;color: #cbcbd3; margin-left: 0;margin-bottom: 7px;color: #fff;'

//

var dtLP = document.createElement('div')
dtLP.innerHTML = 'Lower Price'
dtLP.style = Title
document.querySelector("#cardbody2 > div:nth-child(2) > div").appendChild(dtLP)

var dtMP = document.createElement('div')
dtMP.innerHTML = 'Median Price'
dtMP.style = Title
document.querySelector("#cardbody2 > div:nth-child(3) > div").appendChild(dtMP)

var dtV = document.createElement('div')
dtV.innerHTML = 'Volume'
dtV.style = Title
document.querySelector("#cardbody2 > div:nth-child(4) > div").appendChild(dtV)

//

var ddLP = document.createElement('div')
ddLP.innerHTML = '⏳ loading ⏳'
ddLP.style = Text
document.querySelector("#cardbody2 > div:nth-child(2) > div").appendChild(ddLP)

var ddMP = document.createElement('div')
ddMP.innerHTML = '⏳ loading ⏳'
ddMP.style = Text
document.querySelector("#cardbody2 > div:nth-child(3) > div").appendChild(ddMP)

var ddV = document.createElement('div')
ddV.innerHTML = '⏳ loading ⏳'
ddV.style = Text
document.querySelector("#cardbody2 > div:nth-child(4) > div").appendChild(ddV)

//

var SteamLink = document.createElement('button')
SteamLink.id = "NomeNovo";
SteamLink.textContent = "Open on the steam market"
SteamLink.title = `open ${ITEMNAME} on the steam market`
SteamLink.style = "font-family: inherit;text-align: center;border-radius: 1rem;padding: 0.55rem 1.25rem;font-weight: 600;border: none rgb(255 255 255);background-color: rgb(27, 166, 193);color: rgb(255, 255, 255);font-size: 25px;margin-top: 15px;"
document.querySelector("#cardbody2 > div:nth-child(4) > div").appendChild(SteamLink);

SteamLink.onclick = function newtab(link) {
    var SteamSearchLink = `https://steamcommunity.com/market/listings/${APPID}/${ITEMNAME}`;
    window.open(SteamSearchLink)
}

//

document.querySelector("#page-sidebar > div:nth-child(1) > div > div.item-info > ul")

var apiLink = `https://steamcommunity.com/market/priceoverview/?appid=${APPID}&currency=${CURRENCY}&market_hash_name=${ITEMNAME}`

function GetData() {
    document.querySelector("#cardbody2 > div:nth-child(4) > div > div:nth-child(2)").innerHTML = '⏳'
    document.querySelector("#cardbody2 > div:nth-child(3) > div > div:nth-child(2)").innerHTML = '⏳'
    document.querySelector("#cardbody2 > div:nth-child(2) > div > div:nth-child(2)").innerHTML = '⏳'
    GM.xmlHttpRequest({
        method: "GET",
        url: apiLink,
        responseType: "json",
        onload: function (response) {
            var obj = JSON.parse(response.responseText);

            if (obj.lowest_price === undefined) {
                document.querySelector("#cardbody2 > div:nth-child(2) > div > div:nth-child(2)").innerHTML = "❌ Couldn't get the value ❌"
            } else { document.querySelector("#cardbody2 > div:nth-child(2) > div > div:nth-child(2)").innerHTML = obj.lowest_price }

            if (obj.median_price === undefined) {
                document.querySelector("#cardbody2 > div:nth-child(3) > div > div:nth-child(2)").innerHTML = "❌ Couldn't get the value ❌"
            } else { document.querySelector("#cardbody2 > div:nth-child(3) > div > div:nth-child(2)").innerHTML = obj.median_price }

            if (obj.volume === undefined) {
                document.querySelector("#cardbody2 > div:nth-child(4) > div > div:nth-child(2)").innerHTML = "❌ Couldn't get the Volume ❌"
            } else { document.querySelector("#cardbody2 > div:nth-child(4) > div > div:nth-child(2)").innerHTML = obj.volume }
        }
    });
}

GetData()

var refresh = document.createElement('button')
refresh.id = "refreshButton"
refresh.innerHTML = '↻'
refresh.title = "update the prices"
refresh.style = "display: block;margin-left: auto;margin-right: auto;width: 25%;text-align: center;border-radius: 0.75rem;padding: 0.5rem 1rem;font-weight: 700;border: none rgb(255 255 255);background-color: rgb(27, 166, 193);font-size: 35px;margin-top: 15px;box-align: center;"
document.querySelector("#cardbody2").appendChild(refresh)
refresh.addEventListener("click", GetData);

/*
//maybe a future method to show my local currency | EX Item value = 100$ (500R$)

GM.xmlHttpRequest({
  method: "GET",
  url: 'https://economia.awesomeapi.com.br/json/last/USD-BRL',
  responseType: "json",
  onload: function(response) {
      var obj = JSON.parse(response.responseText);
      document.querySelector("#cardbody2 > div:nth-child(2) > div > div:nth-child(2)").innerHTML = obj.lowest_price
      document.querySelector("#cardbody2 > div:nth-child(3) > div > div:nth-child(2)").innerHTML = obj.median_price
      document.querySelector("#cardbody2 > div:nth-child(4) > div > div:nth-child(2)").innerHTML = obj.volume
  }
});

document.querySelector("#cardbody2 > div:nth-child(2) > div > div:nth-child(2)").innerHTML = ('R$' + (test.replace('$', '') * ${DolarValue}).toFixed(2))

*/

//misc fixes
document.querySelector("#page-sidebar > div.card > div > div.card-item > h2 > span").style = "text-align: center;"