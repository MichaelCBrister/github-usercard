import axios from 'axios'
const cards = document.querySelector(".cards");
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
console.log(axios.get("https://api.github.com/users/MichaelCBrister"));
console.log(axios.get("https://api.github.com/users/MichaelCBrister/events"));
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
axios.get("https://api.github.com/users/MichaelCBrister")
  .then(pass => {
    const cardElement = createCard(pass.data);
    cards.appendChild(cardElement);
  });
/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [
  "https://api.github.com/users/tetondan",
  "https://api.github.com/users/dustinmyers",
  "https://api.github.com/users/justsml",
  "https://api.github.com/users/luishrd",
  "https://api.github.com/users/bigknell"
];

followersArray.forEach(link => {
  axios.get(link)
    .then(pass =>{
      const cardElement = createCard(pass.data);
      cards.appendChild(cardElement);
  });
});
/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function createCard(gitCard){
  const card = document.createElement("div");
  const image = document.createElement("img");
  const cardInfo = document.createElement("div");
  const name = document.createElement("h3");
  const username = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const address = document.createElement("a");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");
  card.appendChild(image);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(address);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  username.classList.add("username");
  image.src = gitCard.avatar_url;
  address.href = gitCard.html_url;
  name.textContent = gitCard.name;
  username.textContent = gitCard.login;
  location.textContent = "Location: "+ gitCard.location;
  profile.innerText = "Profile: " + address
  address.textContent = "Profile: " + gitCard.html_url
  followers.textContent = "Followers: " + gitCard.followers;
  following.textContent = "Following: " + gitCard.following;
  bio.textContent = "Bio: " + gitCard.bio;
  return card;
}
/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/


/* STRETCH */
/*
const me = "https://api.github.com/users/MichaelCBrister";

axios.get(me + "/events")
  .then(pass => {
    const activity = createGraph(pass.data);
    cards.appendChild(activity);
  });

followersArray.forEach(link => {
  axios.get(link + "/events")
    .then(pass =>{
      const activity = createGraph(pass.data);
      cards.appendChild(activity);
    });
  });

function createGraph(events) {
  const userActivity = document.createElement("div");
  userActivity.textContent = events.forEach(item => {
    console.log(`${item.actor.login} had a ${item.type} on ${item.created_at}.`);
  });
  return userActivity;
}
*/