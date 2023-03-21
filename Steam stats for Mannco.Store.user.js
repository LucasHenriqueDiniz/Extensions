// ==UserScript==

// @name         Steam Info for mannco.store
// @namespace    https://github.com/LucasHenriqueDiniz
// @version      1.1
// @description  Provides the Steam info and a link to respective mannco item
// @author       Lucas Diniz
// @license      MIT

// @match        *://mannco.store/item/*
// @grant        GM.xmlHttpRequest
// @icon         https://cdn-icons-png.flaticon.com/512/194/194978.png

// @homepageURL  https://github.com/LucasHenriqueDiniz/Steam-stats-for-Mannco.Store
// @supportURL   https://github.com/LucasHenriqueDiniz/Steam-stats-for-Mannco.Store/issues
// @downloadURL  https://raw.githubusercontent.com/LucasHenriqueDiniz/Steam-stats-for-Mannco.Store/main/Steam%20stats%20for%20Mannco.Store
// @updateURL    https://raw.githubusercontent.com/LucasHenriqueDiniz/Steam-stats-for-Mannco.Store/main/Steam%20stats%20for%20Mannco.Store

// ==/UserScript==

(function() {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //small fixes
    var cardBodies = document.querySelectorAll('.card-body');
    cardBodies.forEach(cardBody => {
        cardBody.style.boxShadow = '3 3 15px rgba(0, 0, 0, 0.3)';
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //CONST's
    const currency = 1 //1 = $ | 2 = £ | 3 Euro | 4 CHLF | 5 py6 | 6 polony | 7 R$
    const itemName = document.querySelector("#page-sidebar > div > div > div.card-item > h2 > span").textContent.trim().replaceAll('#', '%23').replaceAll(`'`, '%27').replaceAll(' ', '%20')
    var appID = window.location.href.match(/(?<=\/)[0-9]{3,6}/g)
    if (appID != 440 && appID != 730 && appID != 252490 && appID != 570) {
        var dt = document.querySelectorAll('dt')
        if (dt[dt.length - 1].textContent === "SKU") {
            appID = 440;
            console.log(appID)
        } else if (dt[dt.length - 2].textContent === "Hero") {
            appID = 570;
            console.log(appID)
        } else if (dt.length === 2) {
            appID = 252490;
            console.log("lenght = 2 - appID = " + appID)
        } else if (dt.length === 4) {
            appID = 730;
            console.log(appID)
        } else {
            console.log("SKU NOT FOUND")
            appID = null;
        }
    }
    var apiLink = `https://steamcommunity.com/market/priceoverview/?appid=${appID}&currency=${currency}&market_hash_name=${itemName}`
    console.log(apiLink)
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //styles
    var title = 'font-weight: 700;font-size: 1.5rem;color: #fff;margin-bottom: 3px;-webkit-text-stroke-width: thin;'
    var text = 'font-weight: 700;font-size: 1.20rem;color: #fff;'
    //css STYLES
    const cssStyles = `
        @keyframes spinner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(1080deg); }
        }
        .back-to-top {
            position: fixed;
            bottom: 20px;
            width: 50px;
            height: 50px;
            right: 1%;
            border: none;
            display: none;
            color: white;
            border-radius: 50%;
            background-color: rgb(50, 51, 81);
            font-size: 20px;
            text-align: center;
            box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.5);
            cursor: pointer;
  	        transform: translateY(0%);
  	        transition: ease-out 250ms;
	        transition-property: transform, background-color, text-decoration, color, display;
        }
	    .back-to-top.show {
	         display: block;
	    }

        .hover-full-button {
	    	transition-property: color,background-color,border-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,font-size;
		    transition-timing-function: cubic-bezier(.4,0,.2,1);
	    	transition-duration: .5s;

	        margin-top: 5%;
	        font-weight: 700;
	        font-size: 22px;
	        line-height: 25px;
	        box-sizing: border-box;
	        padding-bottom: 0.5rem;
	        padding-left: 1rem;
	        padding-right: 1rem;
            padding-top: 3px;
	        text-align-last: center;
	        background-color: rgba(255, 255, 255, 0);
	        text-align: center;
	        color: rgb(255, 255, 255);
	        outline: white;
	        outline-width: thin;
	        outline-style: auto;
	    	cursor: pointer;
            border-radius: 0.4em;
        }
        .hover-full-button:hover {
          background-color: rgba(255, 255, 255, 1);
          color: black;
          font-size: 23px;
        }
    `;

    const backToTopGoogleIcon = `
    font-size: 45;
    transform: rotate(-90deg);
    text-align: center;
    display: flex;
    `
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(cssStyles));
    document.head.appendChild(style);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Create loading circle
    function loadingCircle(element) {

        var loader = document.createElement('div');
        // add the "loader" class to the div element
        loader.classList.add('loader');
        loader.id = 'loadingCircle'

        // set the styles for the loader
        loader.style.margin = 'auto';
        loader.style.border = '5px solid #5ad1e8';
        loader.style.borderRadius = '50%';
        loader.style.borderTop = '5px solid #0f111e';
        loader.style.width = '25px';
        loader.style.height = '25px';
        loader.style.animation = 'spinner 4s linear infinite';
        element.appendChild(loader);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Adicione a fonte do Google Fonts ao documento
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0';
    document.head.appendChild(link);
    //appends an googlefonts icon
    function googleIcon(iconName,IDname , element, cssStyle) {
        //iconName the name of the icon 'navigate_next, navigate_before'
        //iconSize the size of the icon "INT"
        //element = where you want the icon to be appeneded
        const icon = document.createElement('span');
        icon.style.cssText = cssStyle
        icon.classList.add('icon-asset', 'material-symbols-outlined');
        icon.id = IDname
        icon.textContent = iconName.toLowerCase()
        element.appendChild(icon);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //BACK TO THE TOP BUTTON
    const backToTopButton = document.createElement("button");
    backToTopButton.innerHTML = "";
    googleIcon('navigate_next', 'navigateNext', backToTopButton, backToTopGoogleIcon)
    backToTopButton.title = 'go back to the top of the page'
    backToTopButton.classList.add("back-to-top");
    document.body.appendChild(backToTopButton);

    // had a hardtime working with cssstyles so i decided just implemente everything using js fuckit
    backToTopButton.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    backToTopButton.addEventListener('mouseover', () => {
        backToTopButton.style.backgroundColor = 'rgb(90 209 232)'
        backToTopButton.style.color = 'black'
        backToTopButton.style.borderTopStyle = 'outset'
        backToTopButton.style.borderTopColor = 'rgba(255,255,255,0.3)'
        backToTopButton.style.borderTopWidth = 'medium'
        backToTopButton.style.borderBottomStyle = 'outset'
        backToTopButton.style.borderBottomColor = 'rgba(0,0,0,0.5)'
        backToTopButton.style.borderBottomWidht = 'medium'
        backToTopButton.style.boxShadow = '4px 4px 10px rgba(255, 255, 255, 0.3)'
        backToTopButton.style.transform = "translateY(-22%)";

    });
    backToTopButton.addEventListener('mouseout', () => {
        backToTopButton.style.boxShadow = '4px 4px 10px rgba(0, 0, 0, 0.5)'
        backToTopButton.style.backgroundColor = 'rgb(50, 51, 81)'
        backToTopButton.style.border = 'none'
        backToTopButton.style.color = 'white'
        backToTopButton.style.transform = "translateY(0%)";
    });
    window.addEventListener("scroll", function() {
        // Calcula a posição atual da rolagem em relação à altura total da página
        const scrollPosition = window.scrollY;
        const totalHeight = document.body.clientHeight - window.innerHeight;
        const scrollPercentage = scrollPosition / totalHeight * 100;

        // Atualiza a classe do botão com base na posição atual da rolagem
        if (scrollPercentage > 75) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Create card
    const steamSidebar = document.createElement('div');
    steamSidebar.id = 'steam-sidebar';
    steamSidebar.className = 'card-body steam-sidebar';
    steamSidebar.style.cssText = `
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    margin-top: 15px;
    background-image: url("https://cdn.icon-icons.com/icons2/2648/PNG/512/steam_square_icon_160782.png");
    background-size: cover;
    border-radius: 0.5rem;
    background-color: rgba(255, 255, 255, 0.5);
    background-position: center;
    outline-style: solid;
    outline-width: thin;
    `;
    document.querySelector('#page-sidebar').appendChild(steamSidebar);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Create title for card
    const steamtitle = document.createElement('h2');
    steamtitle.className = 'item-name';
    steamtitle.textContent = 'Steam Info';
    steamtitle.style.cssText = 'margin-top: 0.25rem; box-sizing: border-box; font-weight: 700; color: #adaadf; margin-bottom: 15px; text-align: center; color: rgb(255, 255, 255); font-size: 2rem;';
    steamSidebar.appendChild(steamtitle);
    //gearbuttonwithanimation
    /*
    googleIcon('Settings', 'Settings', steamSidebar, 'display: flex; font-color: white; font-size: 35px; position: absolute; right: 7%; transform: rotate(0deg); border-radius: 1.5rem; transition: ease-out 500ms; transition-property: transform, font-size, color')
    const settingsButton = document.querySelector('#Settings')
    settingsButton.addEventListener('mouseover', () => {
        settingsButton.style.color = '#5ad1e8'
        settingsButton.style.transform = 'rotate(180deg)';
    });
    settingsButton.addEventListener('mouseout', () => {
        settingsButton.style.color = 'white'
        settingsButton.style.transform = 'rotate(0deg)';
    });
    */
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Create list items for card
    const itemTitles = ['Lower Price', 'Median Price', 'Volume'];
    const itemDesc = ["The lower price value shows the lowest sale price of the current item on Steam at the moment. This value can be useful for buyers looking for the best deal on the item.", "The median price value represents the middle value of all current sales prices for the item on Steam. This value can be a useful reference point for determining the item's general price range and market value.", "The volume value represents the total quantity of the current item being sold on Steam at the moment. This value can give you an idea of the item's popularity and demand."]
    for (let i = 0; i < itemTitles.length; i++) {
        const dl = document.createElement('div');
        dl.style.cssText = `
        margin-top: 5px;
        align-items: center;
        display: flex;
        flex-direction: column;
        `;
        dl.className = 'dl';
        steamSidebar.appendChild(dl);

        const txt = document.createElement('div');
        const value = document.createElement('div');
        txt.innerHTML = itemTitles[i];
        txt.style = title;
        txt.title = itemDesc[i]
        dl.appendChild(txt);

        value.innerHTML = '';
        value.id = 'sidebar-text'
        value.title = itemDesc[i]
        value.style = text;
        dl.appendChild(value);
        loadingCircle(value);
    }
    var openOnSteamButton = document.createElement('button')
    openOnSteamButton.textContent = 'Open on steam'
    openOnSteamButton.className = 'hover-full-button'
    openOnSteamButton.addEventListener("click", function() {
        Type.alert.success(`a window for ${itemName.replaceAll('%23', '#').replaceAll('%27', `'`).replaceAll('%20', ' ')} was open`,'')
        var SteamSearchLink = `https://steamcommunity.com/market/listings/${appID}/${itemName}`;
        window.open(SteamSearchLink)
        });
    steamSidebar.appendChild(openOnSteamButton)
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //request the steam item
    GM.xmlHttpRequest({
        method: "GET",
        url: apiLink,
        responseType: "json",
        onload: function (response) {
            var obj = JSON.parse(response.responseText);
            console.log(obj, obj.lowest_price, obj.median_price, obj.volume)
            if (obj.lowest_price === undefined) {
                document.querySelectorAll('#sidebar-text')[0].textContent = "❌ Error retrieving value ❌"
                document.querySelectorAll('#sidebar-text')[0].style.fontSize = '1.1rem'
            } else {
                document.querySelectorAll('#sidebar-text')[0].textContent = obj.lowest_price
            }

            if (obj.median_price === undefined) {
                document.querySelectorAll('#sidebar-text')[1].textContent = "❌ Error retrieving value ❌"
                document.querySelectorAll('#sidebar-text')[1].style.fontSize = '1.1rem';
            } else {
                document.querySelectorAll('#sidebar-text')[1].textContent = obj.median_price
            }

            if (obj.volume === undefined) {
                document.querySelectorAll('#sidebar-text')[2].textContent = "❌ Error retrieving value ❌"
                document.querySelectorAll('#sidebar-text')[2].style.fontSize = '1.1rem'
            } else {
                document.querySelectorAll('#sidebar-text')[2].textContent = obj.volume
            }
        }
    });

})();
