//alert('hello');

/**************************
 * Private function
 * arrayからnum個の要素をランダムに重複無しに抜き出して新しい配列を作る
 **************************/
function random(array, num) {
    var a = array;
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
 *
 **************************/
var gamePairs = {
    numRow : 2,
    numCol : 2,
    backImgSrc : "img/tree.jpg",
    faceOrgImgSrc : [
        "img/mocha1.jpg",
        "img/mocha2.jpg"
    ],
    faceImgSrc : [],    // numRow*numCol face images rearranged randomly
    rowElmt : [],
    indices : []
}; // end var gamePairs

var desk;
// var cardImg = [];
var cardImgElmt;
var cellElmt;

window.onload = function() {

    const moment = require('moment')
    const start = new Date();

    setInterval(function(){
        var timeElmt = document.getElementById("time");
        timeElmt.innerHTML = moment(start).fromNow();
    }, 1000 );

    //**** Obtain the number of rows and columns the user has selected ******
    // To be implemented

    /* Set values to gamePairs.indices so that
       It has value [0, 0, 1, 1, 2, 2, ..., numRow*numCol/2 - 1, numRow*numCol/2 - 1]
     */
    for(var i=0 ; i< gamePairs.numRow * gamePairs.numCol/2 ; i++){
        gamePairs.indices[2*i] = i;
        gamePairs.indices[2*i+1] = i;
        //gamePairs.faceImgSrc[2*i] = gamePairs.faceOrgImgSrc[i];
        //gamePairs.faceImgSrc[2*i+1] = gamePairs.faceOrgImgSrc[i];
    }

    // Randomly rearrange the order within gamePairs.indices
    // in order to decide which face goes to which position
    gamePairs.indices = random( gamePairs.indices, gamePairs.indices.length); //indicesを並び替える
    console.log("gamePairs.indices: " + gamePairs.indices);
    for( var i=0; i< gamePairs.numRow * gamePairs.numCol ; i++){
        gamePairs.faceImgSrc[i] = gamePairs.faceOrgImgSrc[gamePairs.indices[i]];
    }

    //gamePairs.faceImgSrc = random( gamePairs.faceImgSrc, gamePairs.faceImgSrc.length ); //faceImgSrcを並び替える
    console.log("gamePairs.faceImgSrc: " + gamePairs.faceImgSrc );



    desk = document.getElementById("desk");
    desk.setAttribute("border","1");

    for(var i=0; i<gamePairs.numRow; i++){

        // create and insert the i-th row element
        gamePairs.rowElmt[i] = desk.insertRow();
        //cardImg[i] = [];

        // for each cell in the row i .....
        for(var j=0; j<gamePairs.numCol; j++){

            cellElmt = gamePairs.rowElmt[i].insertCell(0);   // create and insert a cell element
            cellElmt.setAttribute("cardState", "back");     // face is down

            cardImgElmt = document.createElement("img");    // create an img element
            cardImgElmt.setAttribute("src", gamePairs.backImgSrc);    // "img/tree.jpg"
            cardImgElmt.setAttribute("width","100");
            cellElmt.appendChild(cardImgElmt);  // insert the img element as a child of cell element


            // there's something wrong here
            // set card face
            cellElmt.setAttribute("cardFaceSrc", gamePairs.faceImgSrc[gamePairs.numCol*i+j]);
            console.log("Row:"+ i +", Col:" + j + " " + cellElmt.getAttribute("cardFaceSrc"));





            // If this cell is clicked, flip the card
            cellElmt.addEventListener('click', function(){
                console.log(this.childNodes[0]);
                if(this.getAttribute("cardState")=="back"){
                    this.childNodes[0].setAttribute("src",this.getAttribute("cardFaceSrc"));
                    this.setAttribute("cardState","face");
                }else{
                    this.childNodes[0].setAttribute("src","img/tree.jpg");
                    this.setAttribute("cardState","back");

                }

            }); // end cellElmt.addEventListener

        }  // end for
    } // end for

} // end window.onload
