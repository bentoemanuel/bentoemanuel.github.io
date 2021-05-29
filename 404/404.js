var human = 1,
    comp = 0;
var level = 2;
var moves = 0;

var magicsquare = [2, 7, 6, 9, 5, 1, 4, 3, 8];

// bot[], player1[] and player2[] stores the magic number of corresponding move of bot, player1 and player2 respectively
var bot = [];
var player1 = [];
var player2 = [];
var occupied = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var flag = 0;
var flag1 = 0;

// clears the play area
function emptyAll() {
    "use strict";
    var x;
    for (var i = 1; i <= 9; i += 1) {
        x = document.getElementById(i);
        x.innerHTML = '';
    }
    for (var i = 0; i < 10; i += 1) {
        occupied[i] = 0;
    }
    bot = [];
    player1 = [];
    player2 = [];
}

// resets everything to default, when the restart button is clicked
function restartClicked() {
    "use strict";
    emptyAll();
    moves = 0;
    human = 1;
    flag = 0;
	flag1 = 0;
    comp = 0;
    var x = document.getElementById("button-o"),
        y = document.getElementById("button-x");
    x.style.backgroundColor = "#A9A9A9";
    y.style.backgroundColor = "deepPink";
}

// checks if there are three consecutive X's or O's
function winCondition(list) {
    "use strict";
    for (var i = 0; i < list.length - 2; i += 1) {
        for (var j = i + 1; j < list.length - 1; j += 1) {
            for (var k = j + 1; k < list.length; k += 1) {
                if (list[i] + list[j] + list[k] === 15) {
                    return 1;
                }
            }
        }
    }
    return 0;
}

// returns index of a magic number, or -1 if it does not exist
function magicToIndex(n) {
    "use strict";
    for (var i = 0; i < 9; i += 1) {
        if (n === magicsquare[i]) {
            return i;
        }
    }
    return -1;
}

// returns the position, whereupon placing an X or O, player/bot can win the game
function trioCheck(list) {
    "use strict";
    var z;
    for (var i = 0; i < list.length - 1; i++) {
        for (var j = i + 1; j < list.length; j++) {
            z = 15 - (list[i] + list[j]);
            if (magicToIndex(z) !== -1 && !occupied[magicToIndex(z)]) {
                return magicToIndex(z) + 1;
            }
        }
    }
    return 0;
}

// returns any random position
function randomPosition() {
    "use strict";
    var available = [],
        item;
    for (var i = 0; i < 9; i += 1) {
        if (occupied[i] === 0) {
            available.push(i);
        }
    }
    item = available[Math.floor(Math.random() * available.length)];
    return item + 1;

}

// returns 1, 3, 7, 9
function randomExtPosition() {
    "use strict";
    var available = [],
        item;
    for (var i = 0; i < 9; i += 2) {
        if (occupied[i] === 0) {
            available.push(i);
        }
        if (i === 2) {
            i = 4;
        }
    }
    item = available[Math.floor(Math.random() * available.length)];
    return item + 1;
}

// returns 2, 4, 6, 8
function randomMidPosition() {
    "use strict";
    var available = [],
        item;
    for (var i = 1; i < 8; i += 2) {
        if (occupied[i] === 0) {
            available.push(i);
        }
    }
    item = available[Math.floor(Math.random() * available.length)];
    return item + 1;
}

function vsPlayer(i) {
    "use strict";
    var x = document.getElementById("button-o"),
        y = document.getElementById("button-x");
    if (moves % 2 === 1) {
        player1.push(magicsquare[i - 1]);
        x.style.backgroundColor = "deepPink";
        y.style.backgroundColor = "#A9A9A9";
    } else {
        player2.push(magicsquare[i - 1]);
        x.style.backgroundColor = "#A9A9A9";
        y.style.backgroundColor = "deepPink";
    }
    if (winCondition(player1)) {
        setTimeout(function () {
            alert("Player 1 Wins!!");
            restartClicked();
        }, 1);
        return;
    }
    if (winCondition(player2)) {
        setTimeout(function () {
            alert("Player 2 Wins!!");
            restartClicked();
        }, 1);
        return;
    }
    if (moves === 9) {
        setTimeout(function () {
            alert("It's a Tie!!");
            restartClicked();
        }, 1);
    }
}

function easy() {
    "use strict";
    if (trioCheck(bot)) {
        return trioCheck(bot);
    }
    return randomPosition();
}

function medium() {
    "use strict";
    if (trioCheck(bot)) {
        return trioCheck(bot);
    }
    if (trioCheck(player1)) {
        return trioCheck(player1);
    }
    return randomPosition();
}

// Player plays first in impossible mode
function hardSecond() {
    "use strict";
    if (trioCheck(bot)) {
        return trioCheck(bot);
    }
    if (trioCheck(player1)) {
        return trioCheck(player1);
    }
    var r = Math.round(Math.random());
    if (moves === 1) {
        var first = player1[0];
        if (first === 5) {
            return randomExtPosition();
        } else if (first === 2 || first === 4 || first === 6 || first === 8) {
            return 5;
        } else {
            flag = 1;
            if (r === 0) {
                if (first === 7) {
                    return 1;
                } else if (first === 1) {
                    return 3;
                } else if (first === 3) {
                    return 7;
                } else if (first === 9) {
                    return 1;
                }
            } else {
                if (first === 7) {
                    return 3;
                } else if (first === 1) {
                    return 9;
                } else if (first === 3) {
                    return 9;
                } else if (first === 9) {
                    return 7;
                }
            }
        }
    } else if (moves === 3) {
        if (flag === 1) {
            return 5;
        } else if (bot[0] === 5) {
            if (player1[1] == 7 || player1[1] == 9 || player1[1] == 1 || player1[1] == 3) {
                var m = magicToIndex(10 - player1[1]);
                occupied[m] = 1;
                var x = randomMidPosition();
                occupied[m] = 0;
				flag1 = 1;
                return x;
				
            }
            return randomMidPosition();
        }
        return randomExtPosition();
    } else {
		if (flag1 === 1){
				var x = magicToIndex(player1[0]);
				if (occupied[8-x] == 0) {
					return 8-x+1;
			}
		}
        return randomPosition();
    }
}

// Bot plays first in impossible mode
function hardFirst() {
    "use strict";
    if (trioCheck(bot)) {
        return trioCheck(bot);
    }
    if (trioCheck(player1)) {
        return trioCheck(player1);
    }
    var r = Math.round(Math.random());
    if (moves === 0) {
        if (r) {
            return randomExtPosition();
        } else {
            return 5;
        }
    } else if (moves === 2) {
        if (!occupied[4]) {
            return 5;
        } else {
            return randomExtPosition();
        }
    } else {
        return randomPosition();
    }
}

// Bot plays first
function vsBotFirst() {
    var k;
    "use strict";
    k = medium();
    var x = document.getElementById(k);
    document.getElementById(k).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="90px" viewBox="55.27599999999998 -205.824 1726.448 2459.648"><path d="M 1637.0,242.0 Q 1637.0,142.0 1563.5,71.0 Q 1490.0,0.0 1388.0,0.0 L 449.0,0.0 Q 347.0,0.0 273.5,71.0 Q 200.0,142.0 200.0,242.0 L 200.0,1803.0 Q 200.0,1906.0 273.5,1977.0 Q 347.0,2048.0 449.0,2048.0 L 1388.0,2048.0 Q 1490.0,2048.0 1563.5,1977.0 Q 1637.0,1906.0 1637.0,1803.0 L 1637.0,242.0 M 746.0,365.0 L 1090.0,365.0 Q 1152.0,365.0 1196.5,409.5 Q 1241.0,454.0 1241.0,516.0 L 1241.0,1505.0 Q 1241.0,1566.0 1196.5,1609.0 Q 1152.0,1652.0 1090.0,1652.0 L 746.0,1652.0 Q 685.0,1652.0 640.5,1609.0 Q 596.0,1566.0 596.0,1505.0 L 596.0,516.0 Q 596.0,454.0 640.5,409.5 Q 685.0,365.0 746.0,365.0" fill="#000000" stroke="#000000" stroke-width="2.048"/></svg>';
    occupied[k - 1] = 1;
    moves += 1;
    bot.push(magicsquare[k - 1]);
    if (winCondition(bot)) {
        setTimeout(function () {
            alert("Bot Wins!!");
            restartClicked();
        }, 1);
        return;
    }
    if (moves === 9) {
        setTimeout(function () {
            alert("It's a Tie!!");
            restartClicked();
        }, 1);
    }
}

// Player plays first
function vsBotSecond() {
    "use strict";
    var k;
    if (winCondition(player1)) {
        setTimeout(function () {
            alert("Player Wins!!");
            restartClicked();
        }, 1);
        return;
    }

    if (moves === 9) {
        setTimeout(function () {
            alert("It's a Tie!!");
            restartClicked();
        }, 1);
        return;
    }
    k = medium();

    var x = document.getElementById(k);
    x.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="90px" viewBox="55.27599999999998 -205.824 1726.448 2459.648"><path d="M 1637.0,242.0 Q 1637.0,142.0 1563.5,71.0 Q 1490.0,0.0 1388.0,0.0 L 449.0,0.0 Q 347.0,0.0 273.5,71.0 Q 200.0,142.0 200.0,242.0 L 200.0,1803.0 Q 200.0,1906.0 273.5,1977.0 Q 347.0,2048.0 449.0,2048.0 L 1388.0,2048.0 Q 1490.0,2048.0 1563.5,1977.0 Q 1637.0,1906.0 1637.0,1803.0 L 1637.0,242.0 M 746.0,365.0 L 1090.0,365.0 Q 1152.0,365.0 1196.5,409.5 Q 1241.0,454.0 1241.0,516.0 L 1241.0,1505.0 Q 1241.0,1566.0 1196.5,1609.0 Q 1152.0,1652.0 1090.0,1652.0 L 746.0,1652.0 Q 685.0,1652.0 640.5,1609.0 Q 596.0,1566.0 596.0,1505.0 L 596.0,516.0 Q 596.0,454.0 640.5,409.5 Q 685.0,365.0 746.0,365.0" fill="#000000" stroke="#000000" stroke-width="2.048"/></svg>';
    occupied[k - 1] = 1;
    moves += 1;
    bot.push(magicsquare[k - 1]);
    if (winCondition(bot)) {
        setTimeout(function () {
            alert("Bot Wins!!");
            restartClicked();
        }, 1);
        return;
    }
}

function playareaClicked(i) {
    "use strict";
    if (occupied[i - 1]) {
        return;
    }
    occupied[i - 1] = 1;
    moves += 1;
    var x = document.getElementById(i);

        document.getElementById(i).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="45.17599999999999 -205.824 1727.6480000000001 2459.648" height="90px"><path d="M 887.0,0.0 L 190.0,1072.0 L 190.0,1652.0 L 983.0,1652.0 L 983.0,2048.0 L 1379.0,2048.0 L 1379.0,1652.0 L 1628.0,1652.0 L 1628.0,1255.0 L 1379.0,1255.0 L 1379.0,0.0 L 887.0,0.0 M 983.0,610.0 L 983.0,1255.0 L 568.0,1255.0 L 983.0,610.0" fill="#000000" stroke="#000000" stroke-width="2.048"/></svg>';
        document.getElementById(i).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="45.17599999999999 -205.824 1727.6480000000001 2459.648" height="90px"><path d="M 887.0,0.0 L 190.0,1072.0 L 190.0,1652.0 L 983.0,1652.0 L 983.0,2048.0 L 1379.0,2048.0 L 1379.0,1652.0 L 1628.0,1652.0 L 1628.0,1255.0 L 1379.0,1255.0 L 1379.0,0.0 L 887.0,0.0 M 983.0,610.0 L 983.0,1255.0 L 568.0,1255.0 L 983.0,610.0" fill="#000000" stroke="#000000" stroke-width="2.048"/></svg>';
        console.log(document.getElementById(i).innerHTML);
        player1.push(magicsquare[i - 1]);
        if (human === 1) {
            vsBotSecond();
        } else if (human === 0) {
            if (winCondition(player1)) {
                setTimeout(function () {
                    alert("Player Wins!!");
                    restartClicked();
                }, 1);
                return;
            }
            vsBotFirst();
        }
}

function hover() {
    "use strict";
    var y = document.getElementById("levels");
    y.style.opacity = 1;
    y.style.visibility = "visible";
    if (level <= 0) {
        var x = document.getElementById("button1");
        x.style.backgroundColor = "#808080";
    }
    else {
        var x = document.getElementById("button1");
        x.style.backgroundColor = "#C71585";
    }
}

function notHover() {
    "use strict";
    var y = document.getElementById("levels");
    y.style.opacity = 0;
    y.style.visibility = "hidden";
    if (level <= 0) {
        var x = document.getElementById("button1");
        x.style.backgroundColor = "#A9A9A9";
    }
    else {
        var x = document.getElementById("button1");
        x.style.backgroundColor = "deepPink";
    }
}

function hoverB2() {
    if (level === 0) {
        var x = document.getElementById("button2");
        x.style.backgroundColor = "#C71585";
    }
    else {
        var x = document.getElementById("button2");
        x.style.backgroundColor = "#808080";
    }
}

function notHoverB2() {
    if (level === 0) {
        var x = document.getElementById("button2");
        x.style.backgroundColor = "deepPink";
    }
    else {
        var x = document.getElementById("button2");
        x.style.backgroundColor = "#A9A9A9";
    }
}

function hoverR() {
    var x = document.getElementById("button3");
    x.style.backgroundColor = "#C71585";
}

function notHoverR() {
    var x = document.getElementById("button3");
    x.style.backgroundColor = "deepPink";
}

function easyClicked() {
    "use strict";
    restartClicked();
    var x = document.getElementById("button1"),
        y;
    x.innerHTML = "Easy";
    y = document.getElementById("levels");
    y.style.opacity = 0;
    y.style.visibility = "hidden";
    level = 1;
    x = document.getElementById("button2");
    x.style.backgroundColor = "#A9A9A9";
    y = document.getElementById("button1");
    y.style.backgroundColor = "deepPink";
    if (human === 0) {
        vsBotFirst();
    }
}

function mediumClicked() {
    "use strict";
    restartClicked();
    var x = document.getElementById("button1"),
        y;
    x.innerHTML = "Medium";
    y = document.getElementById("levels");
    y.style.opacity = 0;
    y.style.visibility = "hidden";
    level = 2;
    x = document.getElementById("button2");
    x.style.backgroundColor = "#A9A9A9";
    y = document.getElementById("button1");
    y.style.backgroundColor = "deepPink";
    if (human === 0) {
        vsBotFirst();
    }
}

function hardClicked() {
    "use strict";
    restartClicked();
    var x = document.getElementById("button1"),
        y;
    x.innerHTML = "Impossible";
    y = document.getElementById("levels");
    y.style.opacity = 0;
    y.style.visibility = "hidden";
    level = 3;
    x = document.getElementById("button2");
    x.style.backgroundColor = "#A9A9A9";
    y = document.getElementById("button1");
    y.style.backgroundColor = "deepPink";
    if (human === 0) {
        vsBotFirst();
    }
}

function initVsPlayer() {
    "use strict";
    restartClicked();
    level = 0;
    var x = document.getElementById("button2"),
        y = document.getElementById("button1");
    x.style.backgroundColor = "deepPink";
    y.style.backgroundColor = "#A9A9A9";
    y.innerHTML = "Vs Bot";
}

function switchXO(i) {
    "use strict";
    if (moves > 0) {
        return;
    }
    if (level <= 0) {
        return;
    }
    var x, y;
    if (i === 0) {
        human = 0;
        x = document.getElementById("button-o");
        y = document.getElementById("button-x");
        x.style.backgroundColor = "deepPink";
        y.style.backgroundColor = "#A9A9A9";

        vsBotFirst();
    } else {
        human = 1;
        x = document.getElementById("button-o");
        y = document.getElementById("button-x");
        x.style.backgroundColor = "#A9A9A9";
        y.style.backgroundColor = "deepPink";
    }
}

if (document.images) {
    img1 = new Image();
    img2 = new Image();
    img3 = new Image();

    img1.src = "0.png";
    img2.src = "1.png";
    img3.src = "back.jpg";
}

function alert(a) {
    document.getElementById("alert").innerHTML = a.toUpperCase();
    setTimeout(function() {
        document.getElementById("alert").innerHTML = '';
    },3000);
}