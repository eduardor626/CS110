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
    var formatTweetDate = tweetDate[1]+" "+tweetDate[2]+ " "+tweetDate[5];
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

    gridItem.appendChild(tweetImage);
    userLabel.appendChild(user);
    dateLabel.appendChild(tweetUserInfo);
    tweetMessage.appendChild(tweetText);
    userLabel.appendChild(dateLabel);
    otherBorder.appendChild(userLabel);

    otherBorder.appendChild(tweetMessage);
    gridItem.appendChild(otherBorder);
    
    tweetContainer.prepend(gridItem);

}