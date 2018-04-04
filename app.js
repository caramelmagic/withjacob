//alert('hello');

/**************************
 * Private function
 * arrayからnum個の要素をランダムに重複無しに抜き出して新しい配列を作る
 * Randomly choose num elements of arr without duplicates
 * and create a new array r out of them
 **************************/
function random(arr, num) {
    var a = arr;
    var t = [];
    var r = [];
    var l = a.length;

    for( var i=0 ; i<num ; i++, l--){
        var randNum = Math.random() * l | 0;
        r[i] = t[randNum] || a[randNum];
        t[randNum] = t[l-1] || a[l-1];
    }
    return r;
}


/**************************
 * Constructor
 **************************/
function Card(_cardId, _faceImgSrc, _isFaceDown){
    this.cardId = _cardId;
    this.faceImgSrc = _faceImgSrc;
    this.isFaceDown = _isFaceDown;
}

/**************************
 * Object gamePairs
 **************************/
var gamePairs = {
    numRow : 2,
    numCol : 2,
    backImgSrc : "img/tree.jpg",
    faceOrgImgSrc : [
        "img/mocha1.jpg",
        "img/mocha2.jpg"
    ],
    tableElmt : null,
    rowElmts : [],
    cellElmts : [],
    cards : []  // array of Card objects
}; // end var gamePairs


/* Once all the HTML has been loaded */
window.onload = function() {

    const moment = require('moment')
    const start = new Date();

    setInterval(function(){
        var timeElmt = document.getElementById("time");
        timeElmt.innerHTML = moment(start).fromNow();
    }, 1000 );

    //**** Obtain the number of rows and columns the user has selected ******
    // To be implemented

    // create Card elements
    for(var i=0 ; i<gamePairs.numRow * gamePairs.numCol ; i++){
        gamePairs.cards[i] = new Card(i, 'default image source', true);
    }

    // Give values to gamePairs.cards[*].cardId so that
    // cardId has value [0, 0, 1, 1, 2, 2, ..., numRow*numCol/2 - 1, numRow*numCol/2 - 1]
    for(var i=0 ; i< gamePairs.numRow * gamePairs.numCol/2 ; i++){
        gamePairs.cards[2*i].cardId = i;
        gamePairs.cards[2*i+1].cardId = i;

    }

    // Shuffle the cards
    gamePairs.cards = random( gamePairs.cards, gamePairs.cards.length); //shuffle cards

    // Give each card a face image.
    // Create cell elements.
    for( var i=0; i< gamePairs.numRow * gamePairs.numCol ; i++){
        gamePairs.cards[i].faceImgSrc = gamePairs.faceOrgImgSrc[gamePairs.cards[i].cardId]; // set face image
        gamePairs.cellElmts[i] = document.createElement("td");  // create cell element
        // assign each cell element a cellIndex so that the program can tell which cell is clicked
        gamePairs.cellElmts[i].setAttribute("cellIndex", i);
    }


    gamePairs.tableElmt = document.getElementById("table1");
    gamePairs.tableElmt.setAttribute("border","1");

    //Insert rows and cells in the table
    for(var i=0; i<gamePairs.numRow; i++){

        // create and insert the i-th row element
        gamePairs.rowElmts[i] = gamePairs.tableElmt.insertRow();

        // for each cell in the row i .....
        for(var j=0; j<gamePairs.numCol; j++){
            var idx = gamePairs.numCol*i+j; // index of cell at row i, column j
            gamePairs.rowElmts[i].appendChild(gamePairs.cellElmts[idx]); // insert a cell element
            var cardImgElmt = document.createElement("img");    // create an img element
            cardImgElmt.setAttribute("src", gamePairs.backImgSrc);    // "img/tree.jpg"
            cardImgElmt.setAttribute("width","100");
            gamePairs.cellElmts[idx].appendChild(cardImgElmt);  // insert the img element as a child of cell element

        }  // end for
    } // end for

    // If a cell is clicked, flip the card
    for(var i=0; i<gamePairs.numRow*gamePairs.numCol; i++){
        gamePairs.cellElmts[i].addEventListener('click', function(){
            // Cannot replace this variable by i because  a cell is clicked
            // only after the for loop is over, at which time i is always numRow * numCol
            var nth = parseInt(this.getAttribute("cellIndex"));
            console.log("nth = "+ nth);
            console.log(this.childNodes[0]);
            if( gamePairs.cards[nth].isFaceDown ){
                this.childNodes[0].setAttribute("src", gamePairs.cards[nth].faceImgSrc);
                gamePairs.cards[nth].isFaceDown = false;

            }else{
                this.childNodes[0].setAttribute("src", gamePairs.backImgSrc);
                gamePairs.cards[nth].isFaceDown = true;
            }

        }); // end cellElmts[i].addEventListener
    } //end for
} // end window.onload
