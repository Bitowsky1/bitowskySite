string = "<tr class='recordTop'><th title='Name of the level.'>Level Name</th><th title='The current least amount of time that took to beat this level.'>Least Time</th><th title='Name of the person, who got this record.'>Achiever</th><th title='Date, on which the record was achieved.'>Date</th><th title='Additional comments from the person, who got the record.'>Comment</th><th title='Click on the icon, to get the footage of getting the record.'>Video</th></tr>";

var stats_totaltime = 0;
var stats_attemptedlevels = 0
var stats_bannedlevels = 0

function isTheRecordGolden(time) {
    if (time == 0) {
        return "goldenRecord";
    } else {
        return "";
    }
}

function doesCoverImageExists(tag, wantedValueToReturn) {
    const img = new Image();
    img.src = "img/" + tag + ".png";

    if (img.complete) {
        //alert(true)
        console.log(wantedValueToReturn)
        return "a";
      } else {
        img.onload = () => {
            //alert(true)
            console.log(wantedValueToReturn)
            return "a";
        };
        
        img.onerror = () => {
          //alert(false)
          console.log(false)
          return "";
        };
      }
}

var playerPersStats = new Array;

wog2achievers.forEach(player => {
    
    /*
    0 - Active Records Count
    1 - Total Time (Active Records)
    2 - Total Time
    */

    playerPersStats.push([0, 0, 0])
});

videoImageClassIndex = 0;



var level_pointToRecord = new Array;


wog2levels.forEach(level => {
    
    if (!level.isChapter) {
        lessTime = 99999;
        lessTimeIndex = -1;
        currIndex = 0;

        
        achieverIndex = -1;

        wog2.forEach(data => {
            if (level.leveltag == data.leveltag) {
                if (data.time < lessTime) {
                    lessTime = data.time;
                    lessTimeIndex = currIndex;

                    achieverIndexCurr = 0;

                    wog2achievers.forEach(ach => {
                        if (ach.achieverTag == data.achieverTag) {
                            achieverIndex = achieverIndexCurr;
                        }
                        achieverIndexCurr += 1;
                    });
                }
            }
            currIndex += 1;
        });

        //string += "<tr class='record' style='background-color: rgba(" + wog2chapters[level.chapterIndex].bgColorRGB + ", 0.5);'><td>" + level.levelname + "</td>"
        //string += "<tr class='record' style='background-image: url(img/" + level.leveltag + ".png); background-color: rgba(" + wog2chapters[level.chapterIndex].bgColorRGB + ", 0.5);'><td>" + level.levelname + "</td>"
        
        string += "<tr class='record' title='" + (level.disable ? "This level is not eligible for the realTAS leaderboard!" : "") + (lessTimeIndex != -1 && wog2[lessTimeIndex].time == 0 ? "This is a GOLDEN RECORD. You cannot get a better score than 0 seconds!" : "") + "' style='background-image: url(img/" + level.leveltag + ".png); background-color: rgba(" + wog2chapters[level.chapterIndex].bgColorRGB + ", 0.7); " + (level.customColor ? "-webkit-text-stroke-color: " + level.customColor + ";" : "") + " " + (lessTimeIndex != -1 && wog2[lessTimeIndex].time == 0 ? "border-color: yellow;" : "") + "'><td>" + level.levelname + "</td>"
        
        if (!level.disable) {
            if (lessTimeIndex != -1) {

                level_pointToRecord.push(lessTimeIndex)

                stats_attemptedlevels += 1;

                timetxt = Math.floor(wog2[lessTimeIndex].time / 60) + ":" + String(wog2[lessTimeIndex].time % 60).padStart(2, '0')
                string += "<td class='" + isTheRecordGolden(wog2[lessTimeIndex].time) + "'>" + timetxt + "</td><td>" + wog2achievers[achieverIndex].name + "</td><td>" + wog2[lessTimeIndex].date + "</td>";
                
                playerPersStats[achieverIndex][0] += 1;
                playerPersStats[achieverIndex][1] += wog2[lessTimeIndex].time;

                stats_totaltime += wog2[lessTimeIndex].time

                if (wog2[lessTimeIndex].comment != "") {
                    string += "<td>" + wog2[lessTimeIndex].comment + "</td>";
                } else {
                    string += "<td class='noComment'>(no comment)</td>"
                }

                // wog2[lessTimeIndex].video

                if (wog2[lessTimeIndex].video) {
                    string += "<td><a href='" + wog2[lessTimeIndex].video + "'><img id='videoClass" + lessTimeIndex + "' class='videoAvailable' src='video.svg' alt='Video Available'></a><br>"
                
                    videoImageClassIndex += 1;

                    switch(wog2[lessTimeIndex].proofType) {
                        case "discord":
                            string += "Discord Video";
                            break;
                        case "youtube":
                            string += "Youtube Video";
                            break;
                        default:
                            string += "Unknown Type";
                            break;
                    }
                
                    string += "</td>"
                
                } else {
                    string += "<td>No Video</td>"
                }
    
            } else {
                level_pointToRecord.push(-1)
                string += "<td>---</td><td>---</td><td>---</td><td>---</td><td>---</td>";
            }
        } else {
            string += "<td class='levDisabled' colspan='5'>LEVEL NOT ELIGIBLE FOR realTAS</td>"
            stats_bannedlevels += 1
        }

        string += "</tr>"
    } else {
        //alert(level.bgimage)
        string += "<tr><td colspan='6' class='chapterName " + level.addclass + "' style='background-image: url(" + level.bgimage + "); color: " + level.color + "; -webkit-text-stroke-color: " + level.bgcolor + ";'>" + level.levelname + "</td></tr>"
    }

});

document.getElementById("recs").innerHTML = string;


var videoclass = 0;

console.log(level_pointToRecord)

levelIndex = 0;

wog2levels.forEach(level => {

    if (level_pointToRecord[levelIndex] != -1 && level_pointToRecord[levelIndex] != undefined) {
        console.log(level_pointToRecord[levelIndex])
        console.log("proof: " + wog2[level_pointToRecord[levelIndex]].proofType)
        switch (wog2[level_pointToRecord[levelIndex]].proofType) {
            case "discord":
                console.log("vid " + level_pointToRecord[levelIndex])
                document.getElementById("videoClass" + level_pointToRecord[levelIndex]).classList.add("videoAvailableDiscord");
                //videoclass += 1;
                break;
            case "youtube":
                console.log("vid " + level_pointToRecord[levelIndex])
                document.getElementById("videoClass" + level_pointToRecord[levelIndex]).classList.add("videoAvailableYoutube");
                //videoclass += 1;
                break;
        
        }
        //videoclass += 1;
    }

    levelIndex += 1;

    /*

    if (data.video) {
        switch (data.proofType) {
            case "discord":
                console.log(videoclass)
                document.getElementById("videoClass" + videoclass).classList.add("videoAvailableDiscord");
                videoclass += 1;
                break;
            case "youtube":
                document.getElementById("videoClass" + videoclass).classList.add("videoAvailableYoutube");
                videoclass += 1;
                break;
        }
        //alert(videoclass)
        
    }

    */
});


// PLAYER STATS

var playerStatsSTR = "<tr class='playerStatsTop'><th title='Name of the player'>Player Name</th><th title='Amount of attempted runs in general'>Run Count</th><th title='Amount of records, that are currently on the leaderboard.'>Active Records Count</th><th title='Total amount of time summed from the records, that are currently on the leaderboard.'>Total Time (Active Records)</th><th title='Total amount of time summed from all of the attempted records.'>Total Time</th><th title='Amount of Golden Times (0 seconds) achieved in general by the player.'>Golden Times</th></tr>"

playerIndex = 0
wog2achievers.forEach(player => {
    

    runCount = 0;
    goldCount = 0;
    
    recordCount = 0;

    lastRecordIndexCurr = 0;
    lastRecordIndex = -1;
    lastRecordLevelName = ""

    wog2.forEach(data => {
        if (data.achieverTag == player.achieverTag) {
            runCount += 1;
            playerPersStats[playerIndex][2] += data.time;
            if (data.time == 0) {
                goldCount += 1;
            }
            lastRecordIndex = lastRecordIndexCurr
            wog2levels.forEach(level => {
                if (level.leveltag == data.leveltag) {
                    lastRecordLevelName = level.levelname
                    
                }
            });
        }

        lastRecordIndexCurr += 1
    });




    playerStatsSTR += "<tr style='background: linear-gradient(to right, " + player.profileColor + ", " + player.profileColor2 + ");'><td>" + player.name + "</td><td>" + runCount + "</td><td>" + playerPersStats[playerIndex][0] + "</td><td>" + Math.floor(playerPersStats[playerIndex][1] / 60) + ":" + String(playerPersStats[playerIndex][1] % 60).padStart(2, '0') + "</td><td>" + Math.floor(playerPersStats[playerIndex][2] / 60) + ":" + String(playerPersStats[playerIndex][2] % 60).padStart(2, '0') + "</td><td>" + goldCount + "</td></tr>"
    //<td>" + wog2[lastRecordIndex].date + "<br>(" + lastRecordLevelName + ")</td>

    playerIndex += 1
});

document.getElementById("playerStats").innerHTML = playerStatsSTR







// STATS

var statsSTR = "";


// Golden Runs

var stats_goldenruns = 0;

wog2.forEach(data => {
    if (data.time == 0) {
        stats_goldenruns += 1;
    }
});

statsSTR += "Golden Times: " + stats_goldenruns + "<br>";

// Total Time

statsSTR += "Total Time: " + Math.floor(stats_totaltime / 60) + ":" + String(stats_totaltime % 60).padStart(2, '0') + "<br>";

// Run Count

statsSTR += "All Runs Count: " + (wog2.length) + "<br>";

// Attempted Levels

statsSTR += "Attempted Levels: " + stats_attemptedlevels + "/" + (wog2levels.length - 5 - stats_bannedlevels) + "<br>";


document.getElementById("stats").innerHTML = statsSTR;
//document.getElementsByClassName("recordTop")[0].classList.add("recordTopSticky")



document.getElementById("wog2Foot").innerHTML = "Leaderboard and website hosted by <a href='https://linktr.ee/Bitowsky'>Bitowsky</a>; 2025<br><a href='https://worldofgoo2.com'>World Of Goo 2</a> made by <a href='https://2dboy.com'>2D BOY</a> and <a href='https://tomorrowcorporation.com'>Tomorrow Corporation</a><br><br>Last site update: 13.02.2025"