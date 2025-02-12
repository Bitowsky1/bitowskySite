string = "<tr class='recordTop'><th>Level Name</th><th>Least Time</th><th>Achiever</th><th>Date</th><th>Comment</th><th>Video</th></tr>";

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

        string += "<tr class='record' style='background-color: rgba(" + wog2chapters[level.chapterIndex].bgColorRGB + ", 0.5);'><td>" + level.levelname + "</td>"
        
        if (!level.disable) {
            if (lessTimeIndex != -1) {

                stats_attemptedlevels += 1;

                timetxt = Math.floor(wog2[lessTimeIndex].time / 60) + ":" + String(wog2[lessTimeIndex].time % 60).padStart(2, '0')
                string += "<td class='" + isTheRecordGolden(wog2[lessTimeIndex].time) + "'>" + timetxt + "</td><td>" + wog2achievers[achieverIndex].name + "</td><td>" + wog2[lessTimeIndex].date + "</td>";
                
                stats_totaltime += wog2[lessTimeIndex].time

                if (wog2[lessTimeIndex].comment != "") {
                    string += "<td>" + wog2[lessTimeIndex].comment + "</td>";
                } else {
                    string += "<td class='noComment'>(no comment)</td>"
                }

                if (wog2[lessTimeIndex].video) {
                    string += "<td><a href='" + wog2[lessTimeIndex].video + "'><img class='videoAvailable' src='video.svg' alt='Video Available'></a><br>"
                
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

wog2.forEach(data => {

    if (data.video) {
        switch (data.proofType) {
            case "discord":
                //alert(videoclass)
                //document.getElementsByClassName("videoAvailable")[videoclass].classList.add("videoAvailableDiscord");
                videoclass += 1;
                break;
            case "youtube":
                //document.getElementsByClassName("videoAvailable")[videoclass].classList.add("videoAvailableYoutube");
                videoclass += 1;
                break;
        }
        //alert(videoclass)
        
    }
});

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