var LanguageList = {
    "EN" : "English",
    "PL" : "Polski",
    "DE" : "Deutsch"
  };

var LanguageList2 = ["EN", "PL", "DE"];

  
  
  // How many Splash Screens are registered?
  var SplashScreenTextCount = 5;
  var langIndex = 0;
  var langIndexMax = 2;
  
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
      
    loadsLanguage("EN");
  }
  
  function loadsLanguage(lang){
    /*fills all the span tags with class=lang pattern*/ 
    $('span[class^="lang"]').each(function(){
      var LangVar = (this.className).replace('lang-','');
      var Text = window["WORDS_"+lang][LangVar];
      $(this).html(Text);     
    });
  }
