let selectedLevel = -1;
//selectedLevel = 14
canGuessAmount = 6
guess = 1

liststr = ""
listIndex = 0
levels.forEach(level => {
    liststr += "<option class='fromChapter" + level.chapter + "_" + (listIndex % 2) + "' value='" + level.codename + "'>" + level.name + "</option>"

    listIndex += 1;
});
document.getElementById("answer").innerHTML = liststr

function checkAnswer() {
    let correct = true

    answerTag = document.getElementById("answer").value

    levels.forEach(level => {
        if (level.codename == answerTag) {

            document.getElementById(guess + "0").innerText = level.name
            document.getElementById(guess + "0").classList.add("boardCellName")
            
            // Chapter

            document.getElementById(guess + "1").innerText = level.chapter
            if (level.chapter > levels[selectedLevel].chapter) {
                correct = false;
                document.getElementById(guess + "1").classList.add("boardCellLower")
            } else if (level.chapter < levels[selectedLevel].chapter) {
                correct = false;
                document.getElementById(guess + "1").classList.add("boardCellHigher")
            } else {
                document.getElementById(guess + "1").classList.add("boardCellCorrect")
            }


            // Goal

            document.getElementById(guess + "2").innerText = level.goal
            if (level.goal > levels[selectedLevel].goal) {
                correct = false;
                document.getElementById(guess + "2").classList.add("boardCellLower")
            } else if (level.goal < levels[selectedLevel].goal) {
                correct = false;
                document.getElementById(guess + "2").classList.add("boardCellHigher")
            } else {
                document.getElementById(guess + "2").classList.add("boardCellCorrect")
            }


            // OCD

            document.getElementById(guess + "3").innerText = level.ocd
            if (level.ocd > levels[selectedLevel].ocd) {
                correct = false;
                document.getElementById(guess + "3").classList.add("boardCellLower")
            } else if (level.ocd < levels[selectedLevel].ocd) {
                correct = false;
                document.getElementById(guess + "3").classList.add("boardCellHigher")
            } else {
                document.getElementById(guess + "3").classList.add("boardCellCorrect")
            }


            // Signposts

            document.getElementById(guess + "4").innerText = level.signposts
            if (level.signposts > levels[selectedLevel].signposts) {
                correct = false;
                document.getElementById(guess + "4").classList.add("boardCellLower")
            } else if (level.signposts < levels[selectedLevel].signposts) {
                correct = false;
                document.getElementById(guess + "4").classList.add("boardCellHigher")
            } else {
                document.getElementById(guess + "4").classList.add("boardCellCorrect")
            }


            // Goo Count

            document.getElementById(guess + "5").innerText = level.gooCount
            if (level.gooCount > levels[selectedLevel].gooCount) {
                correct = false;
                document.getElementById(guess + "5").classList.add("boardCellLower")
            } else if (level.gooCount < levels[selectedLevel].gooCount) {
                correct = false;
                document.getElementById(guess + "5").classList.add("boardCellHigher")
            } else {
                document.getElementById(guess + "5").classList.add("boardCellCorrect")
            }
        }
    });

    if (!correct && guess == canGuessAmount) {
        document.getElementById("comment").innerHTML = "<span style='font-size: 36px;'><span style='font-size: 36px; color: rgb(255, 0, 0);'>You lost!</span> The correct answer was <span style='font-size: 36px; color: rgb(255, 0, 0);'>" + levels[selectedLevel].name + "</span></span><br>(Chapter: " + levels[selectedLevel].chapter + ", Required Value: " + levels[selectedLevel].goal + ", OCD Value: " + levels[selectedLevel].ocd + ", Amount of Signposts: " + levels[selectedLevel].signposts + ", Amount of Balls: " + levels[selectedLevel].gooCount + ")"
    }

    guess += 1
}

function answerUpdateSelect() {
    sel = document.getElementsByClassName("selectColorMe")[0]

    levels.forEach(level => {
        if (level.codename == sel.value) {
            for (let i = 1; i <= 5; i++) {
                sel.classList.remove("fromChapter" + i + "_0")
                sel.classList.remove("fromChapter" + i + "_1")
            }
            sel.classList.add("fromChapter" + level.chapter + "_0")
        }
    });
}

answerUpdateSelect()

function reset() {
    guess = 1
    let boardText = "<tr><th class='boardName1'>Level Name</th><th class='boardName2'>Chapter</th><th class='boardName2'>Required value</th><th class='boardName2'>OCD value</th><th class='boardName2'>Amount of Signposts</th><th class='boardName2'>Amount of Balls</th></tr>"
    for (let i = 1; i <= canGuessAmount; i++) {

        boardText += "<tr>"
    
        for (let j = 0; j < 6; j++) {
            boardText += "<td id='" + i + "" + j + "'></td>"
        }
    
        boardText += "</tr>"
          
    }
    document.getElementById("board").innerHTML = boardText

    selectedLevel = Math.floor(Math.random() * levels.length)
}

reset()