const url = 'https://video-project-c864d-default-rtdb.firebaseio.com/events.json'
let events = [];

async function getData(){
  const data = await fetch(url);
  const json = await data.json();
  const result = await json;
  events = result;

  let viewsFromHtml = document.querySelector('.views');
  viewsFromHtml.innerHTML = events.views;

  let upCounter = document.querySelector('.up-vote');
  upCounter.innerHTML = events.likes;

  let downCounter = document.querySelector('.down-vote');
  downCounter.innerHTML = events.dislikes;

}

getData();

export default getData;

