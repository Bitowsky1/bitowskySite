var divPrepare = "";
var listSortPrepare = "";
var currSortType = "any";
var globalPinLocalization = "../img/pins/"
var sortingIndex = 0;
var selectedIndex = 0;

var displayOption = 1


function pins_insertLIST(pindata) {
    divPrepare += "<div class='pins_pinList' onClick='pins_clicked(" + sortingIndex + ")' style='background-color: #" + pindata.colorCode + "88;'><p class='pins_pinTextList text'>" + pindata.name + "</p></div>"
    foundIndex++;
}

function pins_insertCELL(pindata) {
    console.log("INSERT CELL")
    
    divPrepare += "<div class='pins_pinCell' onClick='pins_clicked(" + sortingIndex + ")'><img src='" + globalPinLocalization + pindata.filename + "' loading='lazy'><p class='pins_pinText text'>" + pindata.name + "</p></div>"
    foundIndex++;
    console.log(divPrepare)
}



pins_sortBy('any')

function pins_sortBy(type) {
    listSortPrepare = "";
    currSortType = type;
    if (type == "any") {
        document.getElementsByClassName("sortByList")[0].innerHTML = "<option>---</option>";
        document.getElementsByClassName("sortByList")[0].disabled = true;
    } else {
        document.getElementsByClassName("sortByList")[0].disabled = false;
        if (type == "official") {
            pinsOfficial.forEach((pinCharData) => {
                listSortPrepare += "<option value='" + pinCharData.matchname + "'>" + pinCharData.charname + "" + countElementsList('official', pinCharData.matchname) + "</option>"
            })
            document.getElementsByClassName("sortByList")[0].innerHTML = listSortPrepare;
        } else if (type == "fanmade") {
            pinsFanmade.forEach((pinFanData) => {
                listSortPrepare += "<option value='" + pinFanData.matchname + "'>" + pinFanData.charname + "" + countElementsList('fanmade', pinFanData.matchname) + "</option>"
            })
            document.getElementsByClassName("sortByList")[0].innerHTML = listSortPrepare;
        } else if (type == "artist") {
            pinsArtist.forEach((pinArtData) => {
                listSortPrepare += "<option value='" + pinArtData.matchartistname + "'>" + pinArtData.artistname + "" + countElementsList('artist', pinArtData.matchartistname) + "</option>"
            })
            document.getElementsByClassName("sortByList")[0].innerHTML = listSortPrepare;
        }
        
    }
    pins_sorting(type)
}



function pins_sorting(sortType) {

    divPrepare = "";
    sortingIndex = 0;
    foundIndex = 0;
    
    if (currSortType == "any") {

        // FOR REVERSE ORDER: pins.slice().reverse().forEach

        pins.forEach((pindata) => {
            if (displayOption == 0) {
                pins_insertLIST(pindata)
                //divPrepare += "<div class='pins_pinList' onClick='pins_clicked(" + sortingIndex + ")' style='background-color: #" + pindata.colorCode + "88;'><p class='pins_pinTextList text'>" + pindata.name + "</p></div>"
            } else {
                pins_insertCELL(pindata)
                //divPrepare += "<div class='pins_pinCell' onClick='pins_clicked(" + sortingIndex + ")'><img src='" + globalPinLocalization + pindata.filename + "' loading='lazy'><p class='pins_pinText text'>" + pindata.name + "</p></div>"
            }
            sortingIndex++;
            //foundIndex++;
            
        })

        
    } else if (currSortType == "official") {
        pins.forEach((pindata) => {
            //console.log("all" + " == " + document.getElementsByClassName('sortByList')[0][document.getElementsByClassName('sortByList')[0].selectedIndex].value)
            
            if (document.getElementsByClassName('sortByList')[0][document.getElementsByClassName('sortByList')[0].selectedIndex].value == "all") {
                if (pindata.generalgroup == "official") {
                    pins_insertCELL(pindata)
                    //divPrepare += "<div class='pins_pinCell' onClick='pins_clicked(" + sortingIndex + ")'><img src='" + globalPinLocalization + pindata.filename + "' loading='lazy'><p class='pins_pinText text'>" + pindata.name + "</p></div>"
                    
                }
                
            } else {
                //console.log(pindata.matchname + " == " + document.getElementsByClassName('sortByList')[0][document.getElementsByClassName('sortByList')[0].selectedIndex].value)
                if (pindata.generalgroup == "official") {
                    if (pindata.matchname == document.getElementsByClassName('sortByList')[0][document.getElementsByClassName('sortByList')[0].selectedIndex].value) {
                        pins_insertCELL(pindata)
                        //divPrepare += "<div class='pins_pinCell' onClick='pins_clicked(" + sortingIndex + ")'><img src='" + globalPinLocalization + pindata.filename + "' loading='lazy'><p class='pins_pinText text'>" + pindata.name + "</p></div>"
                    }
                }
                
            }
            sortingIndex++;
        })
    } else if (currSortType == "fanmade") {
        pins.forEach((pindata) => {
            
            
            if (document.getElementsByClassName('sortByList')[0][document.getElementsByClassName('sortByList')[0].selectedIndex].value == "all") {
                if (pindata.generalgroup == "fanmade") {
                    pins_insertCELL(pindata)
                    //divPrepare += "<div class='pins_pinCell' onClick='pins_clicked(" + sortingIndex + ")'><img src='" + globalPinLocalization + pindata.filename + "' loading='lazy'><p class='pins_pinText text'>" + pindata.name + "</p></div>"
                }
                
            } else {
                console.log("all" + " == " + document.getElementsByClassName('sortByList')[0][document.getElementsByClassName('sortByList')[0].selectedIndex].value)
                if (pindata.generalgroup == "fanmade") {
                    if (pindata.matchname == document.getElementsByClassName('sortByList')[0][document.getElementsByClassName('sortByList')[0].selectedIndex].value) {
                        pins_insertCELL(pindata)
                        //divPrepare += "<div class='pins_pinCell' onClick='pins_clicked(" + sortingIndex + ")'><img src='" + globalPinLocalization + pindata.filename + "' loading='lazy'><p class='pins_pinText text'>" + pindata.name + "</p></div>"
                    }
                }
            }
            sortingIndex++;
        })
    } else if (currSortType == "artist") {
        pins.forEach((pindata) => {
            //console.log(pindata.matchartistname + " == " + document.getElementsByClassName('sortByList')[0][document.getElementsByClassName('sortByList')[0].selectedIndex].value)
            if (pindata.matchartistname == document.getElementsByClassName('sortByList')[0][document.getElementsByClassName('sortByList')[0].selectedIndex].value) {
                pins_insertCELL(pindata)
                //divPrepare += "<div class='pins_pinCell' onClick='pins_clicked(" + sortingIndex + ")'><img src='" + globalPinLocalization + pindata.filename + "' loading='lazy'><p class='pins_pinText text'>" + pindata.name + "</p></div>"
            }
            sortingIndex++;
        })
    }
    /*
    else if (currSortType == "fanmade") {
        pins.forEach((pindata) => {
            if (pindata.matchname == document.getElementsByClassName('sortByList')[0][document.getElementsByClassName('sortByList')[0].selectedIndex].value) {
                divPrepare += "<div class='pins_pinCell'><img src='../img/pins/" + pindata.filename + "'><p class='pins_pinText text'>" + pindata.name + "</p></div>"
            }
            
        })
    } else if (currSortType == "artist") {
        pins.forEach((pindata) => {
            if (pindata.matchname == document.getElementsByClassName('sortByList')[0][document.getElementsByClassName('sortByList')[0].selectedIndex].value) {
                divPrepare += "<div class='pins_pinCell'><img src='../img/pins/" + pindata.filename + "'><p class='pins_pinText text'>" + pindata.name + "</p></div>"
            }
            
        })
    }*/
    
    
}


setInterval(() => {
    if (currSortType == "any") {
        if (sortingIndex == pins.length) {
            finalInsert()
        }
    } else if (currSortType == "official") {
        if (foundIndex == countElements('official')) {
            finalInsert()
        }
    } else if (currSortType == "fanmade") {
        if (foundIndex == countElements('fanmade')) {
            finalInsert()
        }
    } else if (currSortType == "artist") {
        console.log(foundIndex)
        console.log(countElements('artist'))
        if (foundIndex == countElements('artist')) {
            finalInsert()
        }
    }
}, 100);

function finalInsert() {
    document.getElementsByClassName("pins_mainRight")[0].innerHTML = divPrepare;
}

var pins_show_showcase_ISMOUSEOVERBOX = false;


function pins_show_showcase_ON() {
    document.getElementsByClassName("pins_show")[0].classList.add("pins_show_bs")
    document.getElementsByClassName("pins_show")[0].classList.remove("pins_show_bs_before")
    document.getElementsByClassName("pins_show_box")[0].classList.add("pins_show_box_show")
    document.getElementsByClassName("pins_show_box")[0].classList.remove("pins_show_box_hide")
    document.getElementsByClassName("pinsALL")[0].classList.add("pinsALL_hide")
    document.getElementsByClassName("pinsALL")[0].classList.remove("pinsALL_show")
}

function pins_show_showcase_OFF() {
    document.getElementsByClassName("pins_show")[0].classList.add("pins_show_bs_before")
    document.getElementsByClassName("pins_show")[0].classList.remove("pins_show_bs")
    document.getElementsByClassName("pins_show_box")[0].classList.add("pins_show_box_hide")
    document.getElementsByClassName("pins_show_box")[0].classList.remove("pins_show_box_show")
    document.getElementsByClassName("pinsALL")[0].classList.add("pinsALL_show")
    document.getElementsByClassName("pinsALL")[0].classList.remove("pinsALL_hide")
}

function pins_show_bg_clicked() {

    console.log(document.getElementsByClassName("pins_show")[0].classList) 

    if (document.getElementsByClassName("pins_show")[0].classList[1] == "pins_show_bs" && !pins_show_showcase_ISMOUSEOVERBOX) {
        pins_show_showcase_OFF()
    }
}

var imgW, imgH;

function pins_setsizedata(w, h) {
    imgW = w.toString();
    imgH = h.toString();
}


function pins_clicked(pinIndex) {


    console.log(`Selected pin index: ${pinIndex}`)
    selectedIndex = pinIndex;
    document.getElementById("pins_show_box_title").scrollIntoView();
    setTimeout(function pins_clicked_showbgsecton() {
        pins_show_showcase_ON()
    }, 10)
    

    const img = new Image();
    img.onload = function() {
        pins_setsizedata(this.width, this.height)
        //<div class='pins_show_box_left_arrow'><img src='../img/arrowLeft.svg'></div>
        document.getElementsByClassName("pins_show_box_left")[0].innerHTML = "<img src='" + globalPinLocalization + pins[pinIndex].filename + "' loading='lazy'><p class='text text2 pins_show_box_size'>Size: " + imgW + "x" + imgH + "</p>"
    }
    img.src = globalPinLocalization + pins[pinIndex].filename;

    

    
    document.getElementsByClassName("pins_show_box_title")[0].innerText = pins[pinIndex].name;
    
    if (pinsNotes[pins[pinIndex].noteID] === undefined) {
        document.getElementsByClassName("pins_show_box_notes_text")[0].innerText = pinsNotes[0].note
    } else {
        document.getElementsByClassName("pins_show_box_notes_text")[0].innerHTML = pinsNotes[pins[pinIndex].noteID].note
    }

    document.getElementsByClassName("pins_show_box_buttons_all")[0].innerHTML = "<a href='" + globalPinLocalization + pins[pinIndex].filename + "' download><div class='pins_show_box_buttons_downGIF' onClick='pinsDownloadGIF()'><p class='text text2'>GIF</p></div></a><div class='pins_show_box_buttons_downFRM'><p class='text text2'>???</p></div>"
    

    document.getElementsByClassName("pins_show_box_info__animation")[0].innerText = "Bitowsky";
    pinsArtist.forEach(index => {
        if (index.matchartistname == pins[pinIndex].matchartistname) {
            document.getElementsByClassName("pins_show_box_info__static")[0].innerHTML = "<a href='" + index.socialmedia + "' target='_blank'>" + index.artistname + "</a>";
        }
    });

    if (pins[pinIndex].generalgroup == "official") {
        document.getElementsByClassName("pins_show_box_info__isofficial")[0].innerHTML = "Official Static Design";
        document.getElementsByClassName("pins_show_box_info__isofficial")[0].style.color = "lightgreen";
    } else {
        document.getElementsByClassName("pins_show_box_info__isofficial")[0].innerText = "Unofficial Static Design";
        document.getElementsByClassName("pins_show_box_info__isofficial")[0].style.color = "lightcoral";
    }
    
    document.getElementsByClassName("pins_show_box_info__date")[0].innerText = pins[pinIndex].uploadDate;
    
    //document.getElementsByClassName("pins_show_box_info__static")[0].innerText = pinsArtist[pin]

}

function pinsDownloadGIF() {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = globalPinLocalization + pins[selectedIndex].filename;
    link.download = globalPinLocalization + pins[selectedIndex].filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    //window.location.href = globalPinLocalization + pins[selectedIndex].filename;
}
/*
function pins_disc_showcase_ON() {
    document.getElementsByClassName("pins_disc")[0].classList.add("pins_disc_bs")
    document.getElementsByClassName("pins_disc")[0].classList.remove("pins_disc_bs_before")
    document.getElementsByClassName("pins_disc_box")[0].classList.add("pins_disc_box_show")
    document.getElementsByClassName("pins_disc_box")[0].classList.remove("pins_disc_box_hide")
    document.getElementsByClassName("pinsALL")[0].classList.add("pinsALL_show")
    document.getElementsByClassName("pinsALL")[0].classList.remove("pinsALL_hide")
}

function pins_disc_showcase_OFF() {
    document.getElementsByClassName("pins_disc")[0].classList.add("pins_disc_bs_before")
    document.getElementsByClassName("pins_disc")[0].classList.remove("pins_disc_bs")
    document.getElementsByClassName("pins_disc_box")[0].classList.add("pins_disc_box_hide")
    document.getElementsByClassName("pins_disc_box")[0].classList.remove("pins_disc_box_show")
    document.getElementsByClassName("pinsALL")[0].classList.add("pinsALL_hide")
    document.getElementsByClassName("pinsALL")[0].classList.remove("pinsALL_show")
}

function pins_disc_bg_clicked() {
    setTimeout(function pins_disc_clicked_showbgsecton() {
        pins_disc_showcase_ON()
    }, 10)
}
*/

function countElements(type) {
    var countResult = 0;
    switch (type) {
        case 'any':
            pins.forEach(pinCount => {
                countResult++;
            });
            break;
        case 'official':
            pins.forEach(pinCount => {
                if (pinCount.generalgroup == 'official') {
                    countResult++;
                }
            });
            break;
        case 'fanmade':
            pins.forEach(pinCount => {
                if (pinCount.generalgroup == 'fanmade') {
                    countResult++;
                }
            });
            break;
        case 'artist':
            pins.forEach(pinCount => {
                if (pinCount.matchartistname == document.getElementsByClassName('sortByList')[0][document.getElementsByClassName('sortByList')[0].selectedIndex].value) {
                    countResult++;
                }
            })
            break;
    }

    return(countResult)
}



document.getElementsByClassName("sortByOption1")[0].innerHTML += " (" + countElements('any') + ")"

document.getElementsByClassName("sortByOption2")[0].innerHTML += " (" + countElements('official') + ")"

document.getElementsByClassName("sortByOption3")[0].innerHTML += " (" + countElements('fanmade') + ")"

function countElementsListCOUNTING(group, matchname) {
    if (matchname != "all") {
        console.log(group + "|" + matchname)

        var countResult = 0;

        if (group == "artist") {
            pins.forEach(pinCount => {
                if (pinCount.matchartistname == matchname) {
                    countResult++;
                }
            });
        } else {
            pins.forEach(pinCount => {
                if (pinCount.matchname == matchname && pinCount.generalgroup == group) {
                    countResult++;
                }
            });
        }

        return(countResult)
    } else {
        return(-1)
    }
}

function countElementsList(group, matchname) {

    if (countElementsListCOUNTING(group, matchname) != -1) {
        return(" (" + countElementsListCOUNTING(group, matchname) + ")")
    } else {
        return("")
    }
    
}