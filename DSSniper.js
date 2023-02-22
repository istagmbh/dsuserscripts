// ==UserScript==
// @name         Tribalwars sniper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Tribalwars sniper
// @author       Doomness
// @match        *.staemme.ch/game.php?village=*&screen=place&try=confirm
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// @require      http://cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js
// @run-at       document-end// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.tampermonkey.net/index.php?version=4.18.1&ext=dhdg&updated=true
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    // Your code here...
})();

// Initialize script after document has loaded
// ==/UserScript==
// Add timepicker stylesheet to head and append HTML elements for input fields and button to first table with class "vis"
$(document).ready(function(){
    $("head").append('<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">')
    $($("table.vis")[0]).append(
        '<p style="margin-top:5px; margin-bottom:0px;">Time of arrival:</p>' +
        '<input class="timepicker" style="margin-top:5px; font-size: 13px;">'+
        '<input type="text" class="milidelay" placeholder="miliseconds delay" style="margin-top:5px; font-size: 13px;">'+
        '<input id="snipebtn" type="button" class="btn" value="Snipe" style="width:100px; margin-top:3px;">'
    );
// Initialize timepicker plugin for input field with class "timepicker"
    $("input.timepicker").timepicker({
        timeFormat: 'HH:mm:ss',
        minTime: '00:00:00',
        maxTime: '23:59:59',
        defaultTime: '00:00:00',
        dynamic: false,
        dropdown: false,
        scrollbar: false
    });
   // Add click event listener to "Snipe" button to log and display snipe time, and call snipeTimer function
   $("input#snipebtn").click(function(){
        console.log('Snipe timed at: '+ $("input.timepicker").val() +':'+ parseInt($("input.milidelay").val()));
        $("input#snipebtn").parent().append('<p style="margin-bottom:0px; font-size:13px;"> Snipe gezet op: ' + $("input.timepicker").val() +':'+ parseInt($("input.milidelay").val()) +'</p>');
        snipeTimer()
    });
    // Add event listener to "Confirm" button to call storeTime function when clicked
    $("input.troop_confirm_go").on('click', () => {storeTime();});
})
// Function to check if current time matches snipe time, and call troop_confirm_go click event with delay if it does
function snipeTimer(){
    if($("span.relative_time").text().indexOf($("input.timepicker").val()) >= 0){
        setTimeout(function() {
            $("input.troop_confirm_go").click();
        }, parseInt($("input.milidelay").val()));
    } else {
        setTimeout(snipeTimer, 10);
    }
}

function storeTime(){
    var orders = JSON.parse(sessionStorage.getItem("storedTime"));
    if(orders == null){
        orders = [];
    }
    var orderObject = {
        startCoords : $("#menu_row2").find("b.nowrap").text(),
        startTime : $("span#serverTime").text(),
        endTime : $("span.relative_time").text().substring($("span.relative_time").text().length - 9, 8),
        destination : $("span.village_anchor.contexted").find("a").first().text()
    }
    orders.push(orderObject);
    sessionStorage.setItem("storedTime", JSON.stringify(orders));
}
