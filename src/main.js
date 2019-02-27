window.onload = function() {
    displayAllNews();
};

function getAllNews(){
    return STEAM["appnews"]["newsitems"]; 
};

// function getNFixDate(){
//     let date = new Date(STEAM["appnews"]["newsitems"]["date"]*1000);
//     console.log(date);
//     //let day = date.getDate().toString();
    
//     // let month = date.getMonth().toString();
//     // let year = date.getFullYear().toString();
//     // let dateFixed = day + month + year;
//     // return dateFixed;
// };

//console.log(getNFixDate());

function displayAllNews(){
    let newsDiv = document.getElementById("news-list");
    newsDiv.innerHTML = `${getAllNews().map((materia) => `
    <div class="news-style"> 
        <h2 class="news-title">${materia["title"]} </h2>
        <h3 class="news-date">${new Date(materia["date"]*1000)} </h3>
        <p class="news-text"> ${materia["contents"]} </p>
	</div>
  `).join("")}
  `
}



//let dropMenu = document.getElementById("drop-menu-categorias");
//dropMenu.addEventListener("change", loadOptionsMenu);
//
// 

