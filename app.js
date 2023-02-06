const container = document.querySelector(".container"),
  btn = document.querySelector(".btn"),
  teamInput = document.querySelector('input[type="text"]'),
  form = document.querySelector("form"),
  searchInfo = document.querySelector(".search-info")

const getData = () => {
  let league = teamInput.value.replace(/\s/g, "").toLowerCase();
  const URL = `https://football98.p.rapidapi.com/${league}/table`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "78114a3898msh22f6d4040883b36p11d0d2jsn4c984277b530",
      "X-RapidAPI-Host": "football98.p.rapidapi.com",
    },
  };

  fetch(URL, options)
    .then((response) => response.json())
    .then((data) => showTeam(data));
};

const showTeam = (item) => {
  for (let i = 0; i < 10; i++) {
    const element = document.createElement("div");
    element.id = "result";

    const {
      SquadLogo: logo,
      Name: name,
      Position: position,
      Played: played,
      Winned: winned,
      Tie: drawn,
      Loosed: lost,
      ["Goal Difference"]: goals,
      Points: points,
    } = item[i];

    element.innerHTML = `
    <h3 class="name">${name}</h3>
    <div class="img-container">
      <img src="${logo}" alt="" />
        </div>
    <div class="team">
      <span class="number">#${position}</span>
      <h3 class="info">Played: ${played}</h3>
      <h3 class="info">Winned: ${winned}</h3>
      <h3 class="info">Drawn: ${drawn}</h3>
      <h3 class="info">Lost: ${lost}</h3>
      <h3 class="info">Goal Difference: ${goals}</h3>
      <h3 class="info">Points: ${points}</h3>
    </div>`;

    container.appendChild(element);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let team = teamInput.value;
  if (team) {
    getData();
    container.innerHTML = "";
    searchInfo.style.display = 'none'
  }
});

btn.addEventListener("click", () => {
  teamInput.classList.toggle("inclicked");
  btn.classList.toggle("close");
  teamInput.value = "";
});
