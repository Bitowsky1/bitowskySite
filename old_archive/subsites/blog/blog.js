checkIfNewYear2()

const countdown = setInterval(() => {
    checkIfNewYear2()
}, 1000);

function checkIfNewYear2() {
    const newYearDate = new Date('January 1, 2024 00:00:00').getTime();
    //const newYearDate = new Date('December 29, 2023 00:38:40').getTime();

    const now = new Date().getTime();
    const timeLeft = newYearDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    console.log();

    if (timeLeft < 0) {
        document.getElementById("newYearCounter").innerText = "Huh...it appears that 2023 already ended. Oh well, have a good read either way!"
    } else {
        //document.getElementById("newYearCounter").innerText = "Well, to be exact - it will end in " + String(days).padStart(2, '0') + " day(s), " + String(hours).padStart(2, '0') + " hour(s), " + String(minutes).padStart(2, '0') + " minute(s) and " + String(seconds).padStart(2, '0') + " second(s) [According to your timezone]"
        document.getElementById("newYearCounter").innerText = "Well, to be exact - it will end in " + String(days).padStart(2, '0') + ":" + String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0') + " [According to your timezone]"
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