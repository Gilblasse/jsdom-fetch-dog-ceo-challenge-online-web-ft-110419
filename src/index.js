const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const runFunctionsONLoad = [
  fetchImages,
  fetchBreeds,
  handelBreedClick,
  queryBreeds
];
runFunctionsONLoad.forEach(fn => addListeners(fn));

function addListeners(fn) {
  document.addEventListener("DOMContentLoaded", fn);
}

function queryBreeds() {
  let queryFilter = document.querySelector("#breed-dropdown");
  queryFilter.addEventListener("change", fetchBreeds);
}

function fetchImages() {
  fetch(imgUrl)
    .then(resp => resp.json())
    .then(obj => appendImages(obj));
}

function fetchBreeds() {
  fetch(breedUrl)
    .then(resp => resp.json())
    .then(obj => appendBreeds(obj));
}

function appendImages(obj) {
  let imgContainer = document.querySelector("#dog-image-container");

  obj.message.forEach(imgURL => {
    let imgTag = document.createElement("img");
    imgTag.setAttribute("src", imgURL);
    imgContainer.appendChild(imgTag);
  });
}

function appendBreeds(obj) {
  let breedList = document.querySelector("#dog-breeds");
  let dogBreeds = [];
  let queryFilter = document.querySelector("#breed-dropdown");

  dogTypes = obj.message;
  for (dog in dogTypes) {
    dogBreeds.push(dog);
  }
  filteredBreeds = dogBreeds.filter(function(breedName) {
    return breedName.slice(0, 1) == queryFilter.value;
  });

  breedList.innerText = "";

  filteredBreeds.forEach(breed => {
    let breedLiTag = document.createElement("li");
    breedLiTag.innerText = breed;
    breedList.appendChild(breedLiTag);
  });
}

function handelBreedClick() {
  let ulTag = document.querySelector("#dog-breeds");
  ulTag.addEventListener("click", e => {
    if (e.target.tagName == "LI") {
      let li = e.target;
      let liList = ulTag.querySelectorAll("li");
      liList.forEach(liTag => (liTag.style.color = ""));
      li.style.color = "red";
    }
  });
}
