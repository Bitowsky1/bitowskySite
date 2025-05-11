console.log("%cCongratulations! You have succesfully sticked your nose into somebody else's business!", "color: #00ff00; font-size: 24px");
// And you even spectate the source code! Are you eager to give your chimney some coal this year?

function goToLinktree () {
    window.location.replace("https://linktr.ee/bitowsky");
}

function goToSheet () {
    window.location.replace("https://docs.google.com/spreadsheets/d/1HWvzUHsKtbPbg2ii4mshJOYiWLwO8Ppgs2K8DHMT7UM/edit?usp=sharing");
}

function goToDrive () {
    window.location.replace("http://drive.google.com/drive/folders/13YPsj65yKY4pYFmfjqz3ew4zgpUaRuIr?usp=sharing");
}

function goToBlog(link) {
    window.location.href = "./subsites/blog/" + link
}

function goToLink(link) {
    window.open(link, '_blank').focus();
}

function goToPage(link) {
    window.location.href = link
}