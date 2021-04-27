// specify a url, in this case our web server

const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather"

// every 10 seconds
var doThisEachTime = window.setInterval(getTweets, 10000)

// specify to get the 10 tweets from the server
function getTweets() {
    fetch(url)
        .then(res => res.json()).then(data => {
            // do something with data
            console.log(data);
            console.log("new iteration");
        })
        .catch(err => {
            // error catching
            console.log(err);
        })
        return;
}