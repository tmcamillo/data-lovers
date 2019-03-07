window.onload = function() {
    displayNews(allNews);
    feedDropListDates();
};

const allNews = STEAM["appnews"]["newsitems"]; 
const newsDiv = document.querySelector("#news-container");
const newsChannels = document.querySelector('#newsChannels');
const dropListDate = document.querySelector(".drop-list-date");
const sortList = document.querySelector(".sort-list");
const uniqueDates = [...new Set(allNews.map(word => word.date))];
const totalOfNews= document.querySelector(".total-sum-news");


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
	let newDate = new Date(date*1000);
	let fixed = `${newDate.getFullYear()}-${newDate.getMonth() + 1 }-${newDate.getDate()}+ ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds() < 10 ? '0' + newDate.getSeconds(): newDate.getSeconds()}`;
	return fixed;
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
  let sumFilteredNews = Object.keys(filteredNews).length;
  totalOfNews.innerHTML = `<p>Foram encontrados um total de ${sumFilteredNews} notícias para o seu filtro.</p>`
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
  let channel = newsChannels.value; 
  if(channel){
    let filteredNews = allNews.filter((materia) => {
      return materia.feedname === channel
  });
    displayNews(filteredNews);
  }  
}

sortList.addEventListener("change", sortedByDate);

function sortedByDate() {
	let sortChosen = sortList.value;
	if (sortChosen === "oldest") {
		let upward = allNews.sort((a,b) => new Date(a.date) - new Date(b.date));
		displayNews(upward);
	}
	else if (sortChosen === "latest") {
		let downward = allNews.sort((a,b) => new Date(b.date) - new Date(a.date));
		displayNews(downward);
	}
};


