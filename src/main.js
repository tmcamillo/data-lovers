window.onload = function() {
    displayAllNews();
};

function getAllNews(){
    return STEAM["appnews"]["newsitems"]; 
};

function displayAllNews(){
    let newsDiv = document.querySelector("#news-container");
    newsDiv.innerHTML = `${getAllNews().map((materia) => `
    <article class="news-style"> 
        <h2 class="news-title">${materia["title"]} </h2>
        <h3 class="news-date">${new Date(materia["date"]*1000).toDateString()} </h3>
        <p class="news-text"> ${materia["contents"]} </p>
	</article>
  `).join("")}
  `
}

const newsChannels = document.querySelector('#newsChannels');
newsChannels.addEventListener('change', filter); 

function filter(){
  let newsDiv = document.querySelector("#news-container");
  newsDiv.innerHTML='';
  let channel = newsChannels.value;
  console.log('vamos ver', channel)
  let seila = STEAM.appnews['newsitems'];
  console.log(seila)
  for (let assunto of seila){    
    if(channel===assunto.feedname){ 
     
      let divalgumacoisa= document.createElement('div') 
      let template= `
      <p>${assunto.title}</p>
      <p>${assunto.date}</p>
      <p>${assunto.contents}</p>      
      ` 
      divalgumacoisa.innerHTML=template;     
      newsDiv.appendChild(divalgumacoisa)    
    }
  }
} 