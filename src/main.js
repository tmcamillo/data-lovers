window.onload = function() {
  displayNews(allNews);
	
};

let formatDate = (date) => {
let newDate = new Date(date*1000);
let fixed = `${newDate.getDate()}-${newDate.getMonth() + 1 }-${newDate.getFullYear()}`;
return fixed;
};

const originalObj = STEAM['appnews']['newsitems']; 
let allNews =  originalObj.map(item => {  return {...item, date2: formatDate(item.date)}  })
let uniqueChannels = [...new Set(allNews.map(item => item.feedname))];
const newsDiv = document.querySelector('#news-container');  
const totalOfNews = document.querySelector('.total-sum-news');
const dropListChannel = document.querySelector('.drop-list-channel');
const dropListDate = document.querySelector('.drop-list-date');
const sortList = document.querySelector('.sort-list');
const buttonHome = document.querySelector('.btn-clear-filter');


let displayNews = (filteredNews) => {
  newsDiv.innerHTML = `${filteredNews.map((materia) => `
  <div class="news-style"> 
      <h2 class="news-style">${materia['title']} </h2>
      <h3 class="news-style">${formatDate(materia['date'])} </h3>
      <p class="news-style"> ${materia['contents']} </p>
</div>
`).join('')}
`
  let sumFilteredNews = Object.keys(filteredNews).length;
  totalOfNews.innerHTML = `<p>Foi encontrado um total de ${sumFilteredNews} notícias para seu filtro</p>`  
}; 

let populateDropListDates = (arr) => {
	let filteredNewsDate = arr.filter((materia) => { return materia.date2 });
  let uniqueDates = [...new Set(filteredNewsDate.map(item => item.date2))];
  uniqueDates.unshift('Data');
	dropListDate.innerHTML='';
  
	for (let date of uniqueDates){
		let option = document.createElement('option');
		option.setAttribute('value', date);
		option.setAttribute('class', 'drop-option-date');
		option.textContent = date;
		dropListDate.add(option);
	}   
};

dropListDate.addEventListener('change', loadByDate);

function loadByDate() {
  let dateChosen = dropListDate.value;
  let filteredNews = loadByChannel().filter((materia) => { return materia.date2 === dateChosen; });
  displayNews(filteredNews);
  if(dateChosen != 0) {    
    sortList.disabled = 'disabled';
    sortList.style.display = 'none';   
  }   
};

dropListChannel.addEventListener('change', loadByChannel); 
function loadByChannel() {
  let channel = dropListChannel.value; 
  let filtered = allNews.filter((materia) => { return materia.feedname === channel; });
  
  displayNews(filtered);
  populateDropListDates(filtered);

  if(channel != 0) {    
    sortList.disabled = 'disabled';
    sortList.style.display = 'none';
  }  
  return filtered;
};

<<<<<<< HEAD
let populateDropListDates = (naosei) => {
  let filteredNewsDate = naosei.filter((materia) => { return materia.date2 });
  let uniqueDates = [...new Set(filteredNewsDate.map(item => item.date2))];
  uniqueDates.unshift('Data')
  console.log(uniqueDates)
  dropListDate.innerHTML='';

  for (let date of uniqueDates){
      let option = document.createElement('option');
      option.setAttribute('value', date);
      option.setAttribute('class', 'drop-option-date');
      option.textContent = date;
      dropListDate.add(option);
  }   
};
=======
>>>>>>> 791566b45ab97b63bde2f76a88476ffd8f44aa90

buttonHome.addEventListener('click', home);
function home() {
let channel = dropListChannel.value;
let dateChosen = dropListDate.value;
if (channel != 0 || dateChosen != 0 ){
  channel = 0   
  dateChosen = 0
  sortList.disabled = '';
  sortList.style.display = 'block';
}
displayNews(allNews); 
};

sortList.addEventListener('change', sortedByDate);
function sortedByDate() {
let sortChosen = sortList.value;
if (sortChosen === 'oldest') {
  let upward = allNews.sort((a,b) => new Date(a.date) - new Date(b.date));
  displayNews(upward);
}
else if (sortChosen === 'latest') {
  let downward = allNews.sort((a,b) => new Date(b.date) - new Date(a.date));
  displayNews(downward);
}
};

let countOfOcurrency = allNews.reduce(function(sums,entry){ sums[entry.feedname] = (sums[entry.feedname] || 0) + 1;
return sums;
},{});

let channelKey = Object.keys(countOfOcurrency);
let channelValue = Object.values(countOfOcurrency);
let arr = [['título', 'quantidade']];

for (let index in channelKey){
arr.push([channelKey[index].toUpperCase(),channelValue[index]])
}

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
var data = google.visualization.arrayToDataTable(arr)
var options = {
  title: 'Notícia por Canais',
  is3D: true,
  backgroundColor: 'transparent'
};
var chart = new google.visualization.PieChart(document.getElementById('piechart-3d'));
chart.draw(data, options);
};

