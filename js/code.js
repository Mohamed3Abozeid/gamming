const row = document.getElementById("row");
const gamePage = document.getElementById("game-page");
const games = document.getElementById("games");
const link = document.querySelectorAll(".nav-link");
const closeIcon = document.getElementById("close-icon");
const GameInner = document.getElementById("game-inner");
$(document).ready(function () {
  $("#loading-overlay").fadeOut(900);
  $(".nav-link").click(function () {
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
  });
});
let game = [];
let data = [];
async function GetApi(category) {
  const baseUrl =
    "https://free-to-play-games-database.p.rapidapi.com/api/games";
  const url = `${baseUrl}?category=${category}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "20e2c1dc2cmshb316c433f5a467cp19ad8fjsn72cdf8a03dcb",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    data = result;
  } catch (error) {
    console.error(error);
  }
}
async function GetGame(id) {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "20e2c1dc2cmshb316c433f5a467cp19ad8fjsn72cdf8a03dcb",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    game = result;
  } catch (error) {
    console.error(error);
  }
}
async function Display() {
  var cartona = "";

  for (let i = 0; i < data.length; i++) {
    cartona += `  <div class="card-inner  col-12 col-sm-6 col-md-4 col-lg-3 p-3 ">
                    <div class="card bg-dark text-white h-100 " id="${data[i].id}"  onclick="CallGame(${data[i].id})">
                        <img class="card-img-top" src="${data[i].thumbnail}"
                            alt="Card image cap ">
                        <div class="card-body">
                            <div class="card-btn d-flex justify-content-between align-items-center">
                                <span class=" ">${data[i].title}</span>
                                <span class="btn btn-primary ">Free</span>
                            </div>
                            <div class="card-text text-center mt-3">${data[i].short_description}</div>
                        </div>
                        <footer class="card-footer d-flex justify-content-between align-items-center">
                            <span class="m-0 fw-lighter">${data[i].genre}</span>
                            <span class="m-0">${data[i].platform}</span>
                        </footer>
                        <div class="overlat position-absolute w-100 h-100"></div>
                    </div>

                </div>
    `;
  }

  row.innerHTML = cartona;
}
function DisplayGame() {
  GameInner.innerHTML = `


  <div class="col-md-4"><img src="${game.thumbnail}" alt="${game.title}" class="w-100">
  </div>
  <div class="col-md-8">
      <h3 class="text-white">${game.title} </h3>
      <div class="body-game text-white">
          <p class="my-4">cetegory : <span class="p-2 rounded-2 bg-info">${game.genre}</span></p>
          <p class="my-4">platform : <span class="p-2 rounded-2 bg-info">${game.platform}</span></p>
          <p class="my-4">Status : <span class="p-2 rounded-2 bg-info">${game.status}</span></p>
          <p class="my-4 small">${game.description}</p>
          <a href="${game.game_url}" class="btn btn-outline-info"  target="_blank">Show Game</a>
      </div>
  </div>
  `;
}
async function Call(cat) {
  await GetApi(cat);
  await Display();
}

async function CallGame(id) {
  await GetGame(id);
  gamePage.classList.remove("d-none");
  gamePage.classList.add("d-block");
  games.classList.remove("d-block");
  games.classList.add("d-none");
  DisplayGame();

  closeIcon.addEventListener("click", function () {
    gamePage.classList.remove("d-block");
    gamePage.classList.add("d-none");

    games.classList.remove("d-none");
    games.classList.add("d-block");
  });
}
for (let i = 0; i < link.length; i++) {
  link[i].addEventListener("click", function (e) {
    var targetLink = e.target.id;
    $("#loading-overlay").fadeIn(800);
    Call(targetLink);
    $("#loading-overlay").fadeOut(1000);
  });
}
Call("mmorpg");
