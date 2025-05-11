// Articles

var articles = new Array();

articles[0] = {
    title: "Thank you for 2023!",
    desc: "2023 is almost reaching its end. But there are still some 'thanks' and 'yous' from me to say!",
    date: "31.12.2023",
    link: "thank_you_for_2023.html",
    isBlog: true
}

articles[1] = {
    title: "Thank you for 2024!",
    desc: "This year is ending pretty fast, isn't it? Well, let's hope I'll get to say some 'thanks' and 'yous' before that happens!",
    date: "31.12.2024",
    link: "thank_you_for_2024.html",
    isBlog: true
}

articles[2] = {
    title: "Interview by Gamerland!",
    desc: "I've had a pleasure of sharing some cool info about me and my work in the Interview directed by GamerLand! It's a good read, believe me!",
    date: "22.01.2025",
    link: "https://medium.com/@GamerlandInterviewer/interview-with-bitowsky-6d988da1674b",
    isBlog: false
}



// Articles Script

let l = articles.length - 1;
let maxArticleShort = Math.min(3, articles.length);

if (pageType == "main") {
    let articlesShort = "";

    for (let i = 0; i < maxArticleShort; i++) {
        let article = articles[l - i];
        let linkFn = article.isBlog ? "goToBlog" : "goToLink";
        let link = `'${article.link}'`;

        articlesShort += `
            <div class='mainSection myUpdatesArticle' onclick="${linkFn}(${link})">
                <p class='articleText articleTitle'>${article.title}</p>
                <hr>
                <p class='articleDesc articleText'>${article.desc}</p>
                <p class='articleDate articleText'>${article.date}</p>
            </div>`;
    }

    document.getElementById("articlesShort").innerHTML = articlesShort;
    if (l > maxArticleShort - 1) {
        document.getElementById("articlesShortSeemore").innerHTML = "<a href='/subsites/articles.html'><p>(View all posts)</p></a>"
    }
}

// Full page

if (pageType == "articles") {
    let articlesFull = "";
    maxYear = 9999

    for (let i = 0; i <= l; i++) {
        let article = articles[l - i];
        let linkFn = article.isBlog ? "goToBlog" : "goToLink";
        let link = `'${article.link}'`;

        articleYear = parseInt((article.date).split(".")[2])

        if (articleYear < maxYear) {
            maxYear = articleYear
            articlesFull += "<br><h1>" + articleYear + "</h1><hr>"    
        }

        articlesFull += `
            <div class='mainSection myUpdatesArticle' onclick="${linkFn}(${link})">
                <p class='articleText articleTitle'>${article.title}</p>
                <hr>
                <p class='articleDesc articleText'>${article.desc}</p>
                <p class='articleDate articleText'>${article.date}</p>
            </div>`;
    }

    document.getElementById("articlesFull").innerHTML = articlesFull;
}