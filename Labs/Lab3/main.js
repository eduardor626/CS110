// specify a url, in this case our web server
const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather"

var tweetSet = new Set()
// every 10 seconds (we need to check if pause clicked though)
var doThisEachTime = window.setInterval(getTweets, 8000)

var paused = false;
let searchString = "";// here we use a global variable

var tweetDictionary = [];
var countTweets = 0;


function loadSearch(){
    var el = document.getElementById('searchBar');
    if(el){
        el.addEventListener("input", handleSearch);
    }
}

// specify to get the 10 tweets from the server
function getTweets() {
    loadSearch();
    if(paused == false){
        fetch(url)
        .then(res => res.json()).then(data => {
            displayTweets(data);
         })
        .catch(err => {
            console.log(err);
        })
    }
    return;
}


function displayTweets(data){
    for (i = 0; i < data.statuses.length; i++) {
        createTweet(data.statuses[i]);
    }
    
    tweetDictionary.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.date_posted) - new Date(b.date_posted);
    });    
      
    
    for (let i = 0; i < tweetDictionary.length; i++) {
        outputTweet(tweetDictionary[i]);
    }

    updateButton();
}

function pauseStream(){
    if(paused == false){
        paused = true;
        updateButton();

    }else if(paused == true){
        paused = false;
        updateButton();
    }
}

function outputTweet(tweets){    
    var tweetDate = tweets.date_posted;
    tweetDate = tweetDate.split(' ');

    var formatTweetDate = tweetDate[1]+" "+tweetDate[2]+ " "+tweetDate[5];
    var userName = tweets.name;
    if(userName.length > 17){
        userName = userName.substring(0,16);
    }
    var userInformation = " @"+tweets.screen_name+" "+formatTweetDate;
    
    var tweetUserInfo = document.createTextNode(userInformation); 
    var user = document.createTextNode(userName); 
    var tweetText = document.createTextNode(tweets.text);


    //creating the elements thru JS
    var tweetContainer = document.getElementById('tweet-container');

    var gridItem = document.createElement("div");
    var tweetImage = document.createElement("img");
    tweetImage.src = tweets.profile_pic;
    var otherBorder = document.createElement("div");
    var userLabel = document.createElement("p");
    var dateLabel = document.createElement("span") 
    var tweetMessage = document.createElement("p");

    //specifying which classes these elements belong to

    gridItem.classList.add("grid-item");
    tweetImage.classList.add("grid-it");
    otherBorder.classList.add("otherBorder");
    userLabel.classList.add("user-info");
    dateLabel.classList.add("Name-Date")
    tweetMessage.classList.add("tweet-message");

    //append the image to grid item
    gridItem.appendChild(tweetImage);
    
    //create the user and dates
    userLabel.appendChild(user);
    dateLabel.appendChild(tweetUserInfo);
    userLabel.appendChild(dateLabel);

    //create tweet message
    tweetMessage.appendChild(tweetText);

    //add these to the right border
    otherBorder.appendChild(userLabel);
    otherBorder.appendChild(tweetMessage);

    gridItem.appendChild(otherBorder);
    tweetContainer.prepend(gridItem);
}

function createTweet(tweets){
    if(tweetSet.has(tweets.id)){
        console.log("Repeated Tweet");
        return;
    }else{
        tweetSet.add(tweets.id);
        tweetDictionary.push({
        "_id": tweets.id,  
        "text": tweets.text,
        "name": tweets.user.name,
        "screen_name": tweets.user.screen_name,
        "profile_pic": tweets.user.profile_image_url_https,
        "date_posted": tweets.user.created_at,
        });        
        countTweets = countTweets + 1;
    }

}

function updateButton(){
    var elem = document.getElementById("search-container");
    if(elem){
        elem.parentNode.removeChild(elem);
    }

    var TweetContainer = document.getElementById('tweet-container');
    var searchContainer = document.createElement('div');
    var pauseButton = document.createElement('button');

    searchContainer.classList.add("search-bar-container");
    searchContainer.id = 'search-container';
    pauseButton.classList.add("pause");

    // document.getElementById('pause-btn').innerHTML='pause';

    pauseButton.innerHTML=checkPause();
    pauseButton.onclick = pauseStream;

    searchContainer.appendChild(pauseButton);    
    TweetContainer.prepend(searchContainer);
}

function checkPause(){
    if(paused === false){
        return 'pause';
    }else{
        return 'resume';
    }
}

const handleSearch = event => {
    searchString = event.target.value.trim().toLowerCase();
    var tweetContainer = document.getElementById("tweet-container");

    while (tweetContainer.firstChild) {
        tweetContainer.removeChild(tweetContainer.firstChild);
    }

    for(let i = 0; i < tweetDictionary.length; i++){
        let temp = tweetDictionary[i].text.toLowerCase();
        if(temp.includes(searchString)){
            outputTweet(tweetDictionary[i]); 
        }
    }
    updateButton();
}

