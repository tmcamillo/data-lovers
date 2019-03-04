window.onload = function() {
    displayNews(allNews);
    feedDropListDates();
};

const allNews = STEAM["appnews"]["newsitems"]; 
const newsDiv = document.querySelector("#news-container");
const newsChannels = document.querySelector('#newsChannels');
const dropListDate = document.querySelector(".drop-list-date");
const uniqueDates = [...new Set(allNews.map(word => word.date))];

let feedDropListDates = () => {
    for (date of uniqueDates){
        let option = document.createElement("option");
        option.setAttribute("value", date);
        option.setAttribute("class", "drop-option-date");
        option.textContent = formatDate(date);
        dropListDate.appendChild(option);
    }
};
    
let formatDate = (date) => {
    return new Date(date*1000).toDateString();
};

let displayNews = (filteredNews) => {
    newsDiv.innerHTML = `${filteredNews.map((materia) => `
    <div class="news-style"> 
        <h2 class="news-title">${materia["title"]} </h2>
        <h3 class="news-date">${formatDate(materia["date"])} </h3>
        <p class="news-text"> ${materia["contents"]} </p>
	</div>
  `).join("")}
  `
};

dropListDate.addEventListener("change", loadByDate);

function loadByDate() {
    let dateChosen = parseInt(dropListDate.value);
    if (dateChosen){
        let filteredNews = allNews.filter((materia) => {
            return materia.date === dateChosen
        });
        displayNews(filteredNews);
    }
    else {
        displayNews(allNews);
    }
};

newsChannels.addEventListener('change', filter); 

function filter(){ 
  let newsDiv = document.querySelector("#news-container");  
  newsDiv.innerHTML='';
  let channel = newsChannels.value;  
  let filteringChannel = STEAM.appnews['newsitems'];  
  for (let subjectMatter of filteringChannel){    
    if(channel===subjectMatter.feedname){     
      let title=subjectMatter.title
      let date= new Date((subjectMatter.date)*1000).toDateString()
      let contents=subjectMatter.contents
      print( title, date, contents);
    }
  }
} 

function print(title, date, contents){    
    let result = document.createElement('div') 
    let template= `
    <h2>${title}</h2>
    <p>${date}</p>
    <p>${contents}</p>      
    ` 
    result.innerHTML=template;     
    newsDiv.appendChild(result)
}