window.onload = function() {
    displayAllNews();
};

function getAllObj(){
    return STEAM["appnews"]["newsitems"];  
};

function displayAllNews(){
    let newsDiv = document.querySelector("#news-container");
    newsDiv.innerHTML = `${getAllObj().map((materia) => `
    <div class="news-style"> 
        <h2 class="news-title">${materia["title"]} </h2>
        <h3 class="news-date">${new Date(materia["date"]*1000).toDateString()} </h3>
        <p class="news-text"> ${materia["contents"]} </p>
	</div>
  `).join("")}
  `
};

const dateObj = getAllObj().map(word => word.date);
console.log(dateObj);


const newsChannels = document.querySelector('#newsChannels');
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
  let newsDiv = document.querySelector("#news-container");     
  let result = document.createElement('div') 
  let template= `
  <h2>${title}</h2>
  <p>${date}</p>
  <p>${contents}</p>      
  ` 
  result.innerHTML=template;     
  newsDiv.appendChild(result)
}
let dropListDate = document.querySelector(".drop-list-date");
dropListDate.addEventListener("change", loadByDate);

function loadByDate() {
    let dateChosen = parseInt(dropListDate.value);
    let newsDiv = document.querySelector(".news-style");
    //console.log("escolhido", typeof(dateChosen));
    for (data of dateObj) {
        //console.log("iteraçao", typeof(data));
        if (dateChosen === data){ 
    //        console.log("chegou")

        }
    }
};

