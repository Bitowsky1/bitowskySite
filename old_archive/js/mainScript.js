var LanguageList = {
    "EN" : "English",
    "PL" : "Polski",
    "DE" : "Deutsch",
    "FR" : "Francais"
  };

var LanguageList2 = ["EN", "PL", "DE", "FR"];

var GlobalTexts = [WORDS_EN, WORDS_PL, WORDS_DE]


  
  // How many Splash Screens are registered?
  var SplashScreenTextCount = 5;
  var langIndex = 0;
  var langIndexMax = 3;
  
  function langChooseLeft() {
    if (langIndex > 0) {
        langIndex--;
    } else {
        langIndex = langIndexMax;
    }
    console.log(langIndex);
    loadsLanguage(LanguageList2[langIndex]);
  } 

  function langChooseRight() {
    if (langIndex < langIndexMax) {
        langIndex++;
    } else {
        langIndex = 0;
    }
    console.log(langIndex);
    loadsLanguage(LanguageList2[langIndex]);
  } 
  
  // For Translations

  window.onload = initialize;
  
  function initialize() {
    var $dropdown = $("#country_select");    
    $.each(LanguageList, function(key, value) {
      $dropdown.
        append($("<option/>").
        val(key).
        text(value));
      });

      var langLoopIndex = 0;

    if (localStorage.getItem("SAVE_LANG") == null) {
      localStorage.setItem("SAVE_LANG", "EN");
      loadsLanguage("EN");
    } else {
      loadsLanguage(localStorage.getItem("SAVE_LANG"));
      LanguageList2.forEach(langName => {
        if (langName == localStorage.getItem("SAVE_LANG")) {
          langIndex = langLoopIndex
        }
        langLoopIndex++;
      });
    }
    
  }
  
  function loadsLanguage(lang){
    localStorage.setItem("SAVE_LANG", lang);
    /*fills all the span tags with class=lang pattern*/ 
    $('span[class^="lang"]').each(function(){
      var LangVar = (this.className).replace('lang-','');
      var Text = window["WORDS_"+lang][LangVar];
      $(this).html(Text);     
    });


  }


/*
function discordNameHover() {
  document.getElementsByClassName("mainCardBottomSectionsTab3Over")[0].hidden = false;
  document.getElementsByClassName("lang-copied")[0].innerHTML = GlobalTexts[langIndex]["copyPrompt"]
}

function discordNameUnhover() {
  document.getElementsByClassName("mainCardBottomSectionsTab3Over")[0].hidden = true;
  document.getElementsByClassName("lang-copied")[0].innerHTML = GlobalTexts[langIndex]["copyPrompt"]
  document.getElementsByClassName("lang-copied")[0].classList.add("lang-copyPrompt")
  document.getElementsByClassName("lang-copied")[0].classList.remove("lang-copied")
}*/

function discordNameCopy() {
  promptMessage("promptCopied")
  var copyText = document.getElementsByClassName("discordName")[0].textContent;
  navigator.clipboard.writeText(copyText);
  document.getElementsByClassName("lang-copyPrompt")[0].classList.add("lang-copied")
  document.getElementsByClassName("lang-copyPrompt")[0].classList.remove("lang-copyPrompt")
  document.getElementsByClassName("lang-copied")[0].innerHTML = GlobalTexts[langIndex]["copied"] 
}

var promptTimeoutSet = 400;
var promptTimeout = 0;


setInterval(() => {
  if (promptTimeout > 0) {
    promptTimeout--;
  }

  if (promptTimeout <= 0) {
    document.getElementsByClassName("promptMessage")[0].classList.add("promptMessageHide")
    document.getElementsByClassName("promptMessage")[0].classList.remove("promptMessageShow")
  }
}, 10);

function promptMessage(text, forceLANG) {
  promptTimeout = promptTimeoutSet
  var langForceIndex = 0;

  if (forceLANG != undefined) {
    LanguageList2.forEach(langName => {
      if (langName == forceLANG) {
        document.getElementsByClassName("promptMessage")[0].innerHTML = GlobalTexts[langForceIndex][text]
        //document.getElementsByClassName("promptMessageClose")[0].innerHTML = GlobalTexts[langForceIndex]["promptClose"] 
      }
      langForceIndex++;
    });
  } else {
    document.getElementsByClassName("promptMessage")[0].innerHTML = GlobalTexts[langIndex][text] 
    //document.getElementsByClassName("promptMessageClose")[0].innerHTML = GlobalTexts[langIndex]["promptClose"] 
  }
  
  document.getElementsByClassName("promptMessage")[0].classList.remove("promptMessageHide")
  document.getElementsByClassName("promptMessage")[0].classList.add("promptMessageShow")
  document.getElementsByClassName("promptMessage")[0].innerHTML += "<br><span class='lang-promptClose promptMessageClose' onClick='promptMessageClose()'>[CLOSE]</span>"
  
  
}

function promptMessageClose() {
  promptTimeout = 0;
}



function discGifOver() {
  document.getElementsByClassName("discImgImg")[0].hidden = true;
  document.getElementsByClassName("discImgGif")[0].hidden = false;
}

function discGifLeave() {
  document.getElementsByClassName("discImgImg")[0].hidden = false;
  document.getElementsByClassName("discImgGif")[0].hidden = true;
}