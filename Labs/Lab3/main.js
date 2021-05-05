// specify a url, in this case our web server

const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather"

var tweetSet = new Set()
// every 10 seconds (we need to check if pause clicked though)
var doThisEachTime = window.setInterval(getTweets, 10000)

var paused = false;





// specify to get the 10 tweets from the server
function getTweets() {

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
        createTweet(data.statuses[i],i+1);
    }
    updateButton();
}

function pauseStream(){
    if(paused == false){
        console.log(document.getElementsByClassName('pause'));
        paused = true;
    }else if(paused == true){
        console.log(document.getElementsByClassName('pause'));
        paused = false;
    }
}

function createTweet(tweets,count){
    if(tweetSet.has(tweets.id)){
        console.log("Repeated Tweet");
        return;
    }else{
        tweetSet.add(tweets.id);
    }

    //handle the creation of the tweet on the JS container
    
    var tweetDate = tweets.user.created_at;
    tweetDate = tweetDate.split(' ');
    var formatTweetDate = tweetDate[1]+" "+tweetDate[2]+ " "+tweetDate[5];
    var userName = tweets.user.name;
    var userInformation = " @"+tweets.user.screen_name+" "+formatTweetDate;
    
    var tweetUserInfo = document.createTextNode(userInformation); 
    var user = document.createTextNode(userName); 
    var tweetText = document.createTextNode(tweets.text);


    //creating the elements thru JS
    var tweetContainer = document.getElementById('tweet-container');

    // var searchContainer = document.createElement('div');
    // var pauseButton = document.createElement('button');

    var gridItem = document.createElement("div");
    var tweetImage = document.createElement("img");
    tweetImage.src = tweets.user.profile_image_url;
    var otherBorder = document.createElement("div");
    var userLabel = document.createElement("p");
    var dateLabel = document.createElement("span") 
    var tweetMessage = document.createElement("p");

    //specifying which classes these elements belong to
    // searchContainer.classList.add("search-bar-container");
    // pauseButton.classList.add("pause");

    gridItem.classList.add("grid-item");
    tweetImage.classList.add("grid-it");
    otherBorder.classList.add("otherBorder");
    userLabel.classList.add("user-info");
    dateLabel.classList.add("Name-Date")
    tweetMessage.classList.add("tweet-message");

    //append the pause button to the search container
    // searchContainer.appendChild(pauseButton);

    
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

function updateButton(){
    var elem = document.getElementById("search-container");
    elem.parentNode.removeChild(elem);
    console.log(elem.parentNode)

    var TweetContainer = document.getElementById('tweet-container');
    // TweetContainer.removeChild(TweetContainer.firstChild);
    console.log("Removed search bar...");

    console.log("tweet container first child = "+TweetContainer.firstChild);
    var searchContainer = document.createElement('div');
    var pauseButton = document.createElement('button');

    searchContainer.classList.add("search-bar-container");
    searchContainer.id = 'search-container';
    pauseButton.classList.add("pause");
    pauseButton.innerHTML = "pause";
    pauseButton.onclick = pauseStream;

    searchContainer.appendChild(pauseButton);    
    TweetContainer.prepend(searchContainer);
}
