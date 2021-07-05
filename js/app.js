'use strict';
// let attemptsEl = document.getElementById('attempts');
let containerEl = document.getElementById('container');
let firstimgEl = document.getElementById('firstimg');
let secondimgEl = document.getElementById('secondimg');
let thirdimgEl = document.getElementById('thirdimg');
// let ulEl = document.getElementById('results');
// firstimgEl.appendChild(containerEl);
// secondimgEl.appendChild(containerEl);
// thirdimgEl.appendChild(containerEl);

let prod = [];
let attempt = 1;
let mAttempt = 25;
let votesOnChart = []; //for chart
let viewsOnChart = []; //for chart
let productName = []; // for chart

function Products(prodName) {
  this.prName = prodName.split('.')[0];
  this.img = 'img/' + prodName;
  this.votes = 0;
  this.views = 0;
  productName.push(this.prName);

  prod.push(this);

}
let prodImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
// new Products(
//     prodImages[0]
// )

for (let i = 0; i < prodImages.length; i++) {
  new Products(prodImages[i]);


}
function randIndex() {

  return Math.floor(Math.random() * prod.length);

}

let firstIndex ;
let secondIndex ;
let thirdIndex ;


let shown = [];
function renderRandImg() {
  firstIndex = randIndex();
  secondIndex = randIndex();
  thirdIndex = randIndex();



  while (firstIndex === secondIndex || secondIndex === thirdIndex || firstIndex === thirdIndex || shown.includes(firstIndex) || shown.includes(secondIndex) || shown.includes(thirdIndex)) {
    firstIndex = randIndex();
    secondIndex = randIndex();
    thirdIndex = randIndex();

  }
  shown = [firstIndex,secondIndex,thirdIndex];
  console.log(shown);



  firstimgEl.setAttribute('src', prod[firstIndex].img);
  secondimgEl.setAttribute('src', prod[secondIndex].img);
  thirdimgEl.setAttribute('src', prod[thirdIndex].img);


  firstimgEl.setAttribute('alt', prod[firstIndex].prName);
  secondimgEl.setAttribute('alt', prod[secondIndex].prName);
  thirdimgEl.setAttribute('alt', prod[thirdIndex].prName);

  firstimgEl.setAttribute('title', prod[firstIndex].prName);
  secondimgEl.setAttribute('title', prod[secondIndex].prName);
  thirdimgEl.setAttribute('title', prod[thirdIndex].prName);


  prod[firstIndex].views++;
  prod[secondIndex].views++;
  prod[thirdIndex].views++;

}
renderRandImg();
let button = document.createElement('button');

function clbutton(event){
  let ulEl = document.getElementById('results');

  for (let i = 0; i < prod.length; i++) {
    let liEl = document.createElement('li');
    liEl.textContent = `${prod[i].prName} has ${prod[i].votes} votes and ${prod[i].views} views .`;
    ulEl.appendChild(liEl);
    containerEl.appendChild(ulEl);
    votesOnChart.push(prod[i].votes);
    viewsOnChart.push(prod[i].views);

  }

  chartRender();

}



firstimgEl.addEventListener('click', handClicks);
secondimgEl.addEventListener('click', handClicks);
thirdimgEl.addEventListener('click', handClicks);


function handClicks(event) {
  if (attempt <= mAttempt) {
    let votedImg = event.target.id;
    if (votedImg === 'firstimg') {
      prod[firstIndex].votes++;


    } else if (votedImg === 'secondimg') {

      prod[secondIndex].votes++;

    }
    else if (votedImg === 'thirdimg') {
      prod[thirdIndex].votes++;

    }

    renderRandImg();

  } else {

    button.textContent='show result';
    button.addEventListener('click',clbutton);
    containerEl.appendChild(button);


    firstimgEl.removeEventListener('click',handClicks);
    secondimgEl.removeEventListener('click',handClicks);
    thirdimgEl.removeEventListener('click',handClicks);


  }
  attempt++;
}

function chartRender(){

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: 'Votes',
        data: votesOnChart,
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',

        ],
        borderWidth: 1
      },
      {
        label: 'Views',
        data: viewsOnChart,
        backgroundColor: [

          'rgba(54, 162, 235, 0.2)',

        ],
        borderColor: [

          'rgba(255, 206, 86, 1)',

        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}




