// specify a url, in this case our web server

const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather"

var tweetSet = new Set()
// every 10 seconds (we need to check if pause clicked though)
var doThisEachTime = window.setInterval(getTweets, 10000)



// specify to get the 10 tweets from the server
function getTweets() {
    fetch(url)
        .then(res => res.json()).then(data => {
            displayTweets(data);
        })
        .catch(err => {
            // error catching
            console.log(err);
        })
        return;
}

function displayTweets(data){
    for (i = 0; i < data.statuses.length; i++) {
        createTweet(data.statuses[i]);
    }
}

function createTweet(tweets){
    if(tweetSet.has(tweets.id)){
        console.log("Repeated Tweet");
        return;
    }else{
        tweetSet.add(tweets.id);
    }

    //handle the creation of the tweet on the JS container
    var tweetDate = tweets.user.created_at;
    tweetDate = tweetDate.split(' ');
    var formatTweetDate = tweetDate[0] +" "+tweetDate[1]+" "+tweetDate[2]+ " "+tweetDate[5];
    var userName = tweets.user.name;
    var userInformation = " @"+tweets.user.screen_name+" "+formatTweetDate;
    
    var tweetUserInfo = document.createTextNode(userInformation); 
    var user = document.createTextNode(userName); 
    var tweetText = document.createTextNode(tweets.text);

    //creating the elements thru JS
    var tweetContainer = document.getElementById('tweet-container');
    var gridItem = document.createElement("div");
    var tweetImage = document.createElement("img");
    tweetImage.src = tweets.user.profile_image_url;
    var tweetNameLabel = document.createElement("label");
    var tweetMessage = document.createElement("div");
    var tweetDateLabel = document.createElement("label");

    gridItem.classList.add("grid-item");
    tweetImage.classList.add("grid-it");
    tweetNameLabel.classList.add("NameText");
    tweetMessage.classList.add("tweet-message");
    tweetDateLabel.classList.add("Name-Date");

    gridItem.appendChild(tweetImage);
    tweetNameLabel.appendChild(user);
    tweetMessage.appendChild(tweetText);
    tweetNameLabel.appendChild(tweetMessage);
    gridItem.appendChild(tweetNameLabel);
    tweetDateLabel.appendChild(tweetUserInfo);
    gridItem.appendChild(tweetDateLabel);
    
    tweetContainer.prepend(gridItem);

}