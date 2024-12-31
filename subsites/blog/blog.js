checkIfNewYear2()



const countdown = setInterval(() => {
    checkIfNewYear2()
}, 1000);

function checkIfNewYear2() {
    const newYearDate = new Date('January 1, ' + (currYear + 1) + ' 00:00:00').getTime();
    //alert(newYearDate)
    //const newYearDate = new Date('December 28, 2024 15:21:30').getTime();

    const now = new Date().getTime();
    const timeLeft = newYearDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    console.log(currYear)

    if (timeLeft < 0) {
        document.getElementById("sectionMain2").innerHTML = currYear + " is <s>almost</s> over!"
        document.getElementById("newYearCounter").innerHTML = "<h3 style='font-size: 48px; -webkit-transform: perspective(2000px) rotateX(30deg);'><div class='newyearcolors'>Happy New Year " + (currYear + 1) + "!</div> This new adventure has been on for " + String(Math.abs(days + 1)).padStart(2, '0') + ":" + String(Math.abs(hours + 1)).padStart(2, '0') + ":" + String(Math.abs(minutes + 1)).padStart(2, '0') + ":" + String(Math.abs(seconds + 1)).padStart(2, '0') + "!</h3>"
    } else {
        document.getElementById("sectionMain2").innerHTML = currYear + " is almost over!"
        var mess = "";
        var fontmodConst = 120;
        var fontmod = 120;
        if (days == 0 && hours == 0 && minutes == 0) {
            document.getElementById("newYearCounter").classList.add("counterFlash")
            mess = String(seconds)
            fontmod = fontmodConst + ((60 - seconds) * 2)
        } else if (days == 0 && hours == 0) {
            mess = String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0')
        } else if (days == 0) {
            mess = String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0')
        } else {
            mess = String(days).padStart(2, '0') + ":" + String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0')
        }

        document.getElementById("newYearCounter").innerHTML = "Well, to be exact - it will end in\n<h3 id='newYearCounterTimer' class='counter counterWiggle' style='font-size:" + fontmod + "px'>" + mess + "</h3>\n[According to timezone in Poland]"
        //document.getElementById("newYearCounter").classList.remove("counterWiggle")
        if (days == 0 && hours == 0 && minutes == 0) {
            document.getElementById("newYearCounterTimer").classList.add("counterFlash")
        }

    }
}

function checkIfNewYear() {
    
    const date = new Date

    console.log(Date.now())
    if (Date.now() < 1704063600000) {
        leftDays = 31 - date.getDate()
        leftHours = date.getUTCHours() - 22
        leftMinutes = 60 - date.getUTCMinutes()
        leftSeconds = 60 - date.getUTCSeconds()

        document.getElementById("newYearCounter").innerText = "Well, to be exact - it will end in " + String(leftDays).padStart(2, '0') + " day(s), " + String(leftHours).padStart(2, '0') + " hour(s), " + String(leftMinutes).padStart(2, '0') + " minute(s) and " + String(leftSeconds).padStart(2, '0') + " second(s) [Polish Timezone +1]"
    } else {
        leftDays = date.getDate() * date.getMonth()
        leftHours = 22 - date.getUTCHours()
        leftMinutes = 60 - date.getUTCMinutes()
        leftSeconds = 60 - date.getUTCSeconds()
        document.getElementById("newYearCounter").innerText = "Huh...it appears that 2023 already ended. Oh well, have a good read either way!"
    }
}
