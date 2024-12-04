const API_KEY="2e12244ed7b944e2bf25678ad39ec704";
const URL="https://newsapi.org/v2/everything?q=";


window.addEventListener("load",()=>fetchNews("India"));


function reload() {
    window.location.reload();


}

async function fetchNews(query) {

const res= await fetch(`${URL}${query}&apikey=${API_KEY}`);
const data= await res.json();
bindData(data.articles);
    
}

function bindData(articles){
    const cardsContainer=document.getElementById("cardConatiner");
    const newsCardTemplate=document.getElementById("cardTemplate");

    cardsContainer.innerHTML="";

    articles.forEach((article) => {

        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article)
{
    const newsImage=cardClone.querySelector("#news-img");
    const newsTittle=cardClone.querySelector("#news-tittle");
    const newsSource=cardClone.querySelector("#news-source");
    const newsDsc=cardClone.querySelector("#news-dsc");

    newsImage.src=article.urlToImage;
    newsTittle.innerHTML=article.title;
    newsDsc.innerHTML=article.description;

    const newsDate= new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name} · ${newsDate} `;

    cardClone.firstElementChild.addEventListener(("click"),()=>{

        window.open(article.url,"_blank");
    })

   
}
let currSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);

    const  navItem=document.getElementById(id);
    currSelectedNav?.classList.remove("active");
    currSelectedNav=navItem;
    currSelectedNav.classList.add("active");

}

const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("search-text");

searchButton.addEventListener(("click"),() =>
    {
        const query=searchText.value;
        if(!query) return;
        fetchNews(query);
        currSelectedNav?.classList.remove("active");
        currSelectedNav = null;

})