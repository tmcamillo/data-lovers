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

//let dropMenu = document.getElementById("drop-menu-categorias");
//dropMenu.addEventListener("change", loadOptionsMenu);
//
// 

