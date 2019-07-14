let allNews = [];

let loadData = () => {
	fetch(`https://us-central1-datalovers-affd5.cloudfunctions.net/app/news`)
		.then(response => response.json())
		.then(response => {
			allNews = response.appnews.newsitems.map(item => {
				return { ...item, date: formatDate(item.date), dateTimestamp: item.date };
			});
			populateDropListChannel(allNews);
			countOfNewsByChannel();
			displayNews();

		})
		.catch((e) => {
			console.log(e)
		})
}

loadData();

const dropListDate = document.querySelector(".drop-list-date");
let populateDropListDates = news => {
	let datesFormated = [];
	news.map((item) => {
		datesFormated.push(item.date);
	})
	let uniqueDates = [...new Set(datesFormated.map(item => item))];

	dropListDate.innerHTML = `<option value="" selected>DATA</option>`

	uniqueDates.map((date) => {
		let option = document.createElement("option");
		option.setAttribute("value", date);
		option.setAttribute("class", "drop-option-date");
		option.textContent = date;
		dropListDate.add(option);
	})
};

const dropListChannel = document.querySelector(".drop-list-channel");
let populateDropListChannel = news => {
	let uniqueChannels = [...new Set(news.map(item => item.feedname))];

	uniqueChannels.map((channel) => {
		let option = document.createElement("option");
		option.setAttribute("value", channel);
		option.setAttribute("class", "drop-option-channel");
		option.textContent = channel.toUpperCase();
		dropListChannel.appendChild(option);
	})
};

const resetBtn = document.querySelector("#clear");
resetBtn.addEventListener('click', () => {
	dropListChannel.value = ''
	dropListDate.value = ''

	dropListDate.innerHTML = `<option value="" selected>DATA</option>`
	dropListDate.disabled = true;

	displayNews();
});


let formatDate = date => {
	let newDate = new Date(date * 1000);
	let fixed = `${newDate.getDate()}-${newDate.getMonth() +
		1}-${newDate.getFullYear()}`;
	return fixed;
};

const newsDiv = document.querySelector("#news-container");
let displayNews = (type) => {
	let arrNewsFiltered = filteredNews(type);
	arrNewsFiltered = sortNews(arrNewsFiltered);

	newsDiv.innerHTML = "";
	newsDiv.innerHTML = `${arrNewsFiltered.map(article => `
        <div class="news-style"> 
            <h2 class="news-style title-style">${article.title} </h2>
            <h3 class="time-style">${article.date} </h3>
            <p class="news-style"> ${article.contents} </p>
        </div>
        `)
		.join("")}
        `;
	totalOfNews(arrNewsFiltered);
};

const totalSumNews = document.querySelector(".total-sum-news");
let totalOfNews = (arr) => {
	let sumFilteredNews = Object.keys(arr).length;
	totalSumNews.innerHTML = `<p class="pa-result">Localizamos ${sumFilteredNews} notícia(s)</p>`;
};

dropListChannel.addEventListener("change", () => {
	displayNews('channel');

	if (dropListChannel.value) {
		dropListDate.disabled = false;
	} else {
		dropListDate.value = "";
		dropListDate.disabled = true;
	}
});

dropListDate.addEventListener("change", () => {
	displayNews('date');
});

let filteredNews = (type) => {
	let allNewsCopy = allNews;
	if (type === 'channel' && dropListChannel.value) {
		allNewsCopy = allNewsCopy.filter((news) => dropListChannel.value === news.feedname);
		populateDropListDates(allNewsCopy);
	}
	if (type === 'date' && dropListDate.value) {
		allNewsCopy = allNewsCopy.filter((news) => dropListDate.value === news.date);
	}
	return allNewsCopy;
}

const sortList = document.querySelector(".sort-list");
let sortNews = news => {
	let sortChosen = sortList.value;

	if (sortChosen === "oldest") {
		return news.sort((a, b) => new Date(a.dateTimestamp) - new Date(b.dateTimestamp));
	}
	else if (sortChosen === "latest") {
		return news.sort((a, b) => new Date(b.dateTimestamp) - new Date(a.dateTimestamp));
	}
	else return news
}

sortList.addEventListener("change", () => {
	displayNews()
});

let countOfNewsByChannel = () => {
	let countOfOcurrency = allNews.reduce((sums, currvalue) => {
		sums[currvalue.feedname] = (sums[currvalue.feedname] || 0) + 1;
		return sums;
	}, {})

	let channelKey = Object.keys(countOfOcurrency);
	let channelValue = Object.values(countOfOcurrency);
	let arr = [["título", "quantidade"]];
	for (let index in channelKey) {
		arr.push([channelKey[index].toUpperCase(), channelValue[index]]);
	}

	loadCharts(arr)
}

let loadCharts = arr => {
	google.charts.load("current", { packages: ["corechart"] });
	google.charts.setOnLoadCallback(drawChart);
	function drawChart() {
		let data = google.visualization.arrayToDataTable(arr);
		let options = {
			title: "Notícias por Canal",
			is3D: true,
			colors: ["#963b52", "#ce8d20", "#f1d1a2"],
			legend: { position: "left", textStyle: { color: "#ffffff", fontSize: 12 } },
			titleTextStyle: { color: "#ffffff", fontSize: 18 },
			backgroundColor: "transparent"
		};
		let chart = new google.visualization.PieChart(
			document.getElementById("piechart-3d")
		);
		chart.draw(data, options);
	}
}

