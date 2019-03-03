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
