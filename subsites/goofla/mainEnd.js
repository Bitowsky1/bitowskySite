order = [
    "intro",
    "definitions",
    "getting-started",
    "import-movies",
    "export-movies",
    "animation",
    "errors"
]

const docs = {}

document.getElementById("mainText").innerHTML = ""

async function loadInOrder() {
  const container = document.getElementById("mainText");

  for (const file of order) {
    const response = await fetch(`pages/${file}.txt`);
    const returned = await response.text();
    container.innerHTML += formatText(returned, file);
  }
}

loadInOrder();

function formatText(defText, cat) {
    let final = ""
    text = defText.split("\n")

    sectionIndex = 0

    let sections = []

    let splitSymbol = "==="

    text.forEach(line => {

        //console.log(line.split(splitSymbol))
        if ((line.split(splitSymbol))[0] == "title") {
            final += "<span style='font-size:40px; color: #4444FF;'>" + (line.split(splitSymbol))[1] + "</span>"
            document.getElementById("list").innerHTML += "<a href='#MAIN-" + cat + "'>" + (line.split(splitSymbol))[1] + "</a><br>"
        } else if ((line.split(splitSymbol))[0] == "img") {
            final += "<img src='img/" + (line.split(splitSymbol))[1] + "' class='mainImg' style='" + (line.split(splitSymbol))[2] + "'>"
            if ((line.split(splitSymbol))[3] != undefined) {
              final += "<br><span class='imgDesc'>" + (line.split(splitSymbol))[3] + "</span>"
            }
        } else if ((line.split(splitSymbol))[0] == "section") {
            final += "<span id='MAIN-" + cat + "-" + sectionIndex + "' style='font-size:36px; color: #0000a5ff;'>" + (line.split(splitSymbol))[1] + "</span>"
            sections.push(line.split(splitSymbol)[1])
            sectionIndex += 1
        } else if ((line.split(splitSymbol))[0] == "section2") {
            final += "<span id='MAIN-" + cat + "-" + sectionIndex + "' style='font-size:32px; color: #00005B;'>" + (line.split(splitSymbol))[1] + "</span>"
        }
        
        
        else if ((line.split(splitSymbol))[0] == "important") {
            final += "<div class='mainWarning'><div style='float: left; width: 5%; margin: 1%'><img src='img/icon_warning.svg' style='width:100%;'></div><div style='float: left; width: 93%;'>" + (line.split(splitSymbol))[1] + "</div></div>"
        } else if ((line.split(splitSymbol))[0] == "warning") {
            final += "<div class='mainWarning2'><div style='float: left; width: 5%; margin: 1%'><img src='img/icon_warning2.svg' style='width:100%;'></div><div style='float: left; width: 93%;'>" + (line.split(splitSymbol))[1] + "</div></div>"
        }
        
        
        
        else {
            final += "<span style='font-size:20px;'>" + line + "</span>"
        }

        final += "<br>"
    });

    //console.log(sections)

    sectionList = ""

    y = 0
    sections.forEach(x => {
        sectionList += "<li style='font-size: 20px;'><a href='#MAIN-" + cat + "-" + y + "'>" + x + "</li>"
        y += 1
    });

    document.getElementById("list").innerHTML += "<ul>" + sectionList + "</ul><hr>"

    return("<span class='MAIN-ARTICLE' id='MAIN-" + cat + "'><p>‎</p>" + final + "</span><br>")
}

/*
const container = document.getElementById("MAIN-TEXT");
const items = document.querySelectorAll(".MAIN-ARTICLE");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("Currently at:", entry.target.id);
      }
    });
  },
  {
    root: container,
    threshold: 0.6
  }
);

items.forEach(item => observer.observe(item));*/