// specify a url, in this case our web server

const url = "http://twitterfeedserverrails-env.eba-xmqy8ybh.us-east-1.elasticbeanstalk.com/feed/random?q=weather"

fetch(url)
   .then(res => res.json()) .then(data => {  
   // do something with data
   console.log(data.statuses)


})
.catch(err => {
    // error catching
console.log(err) }) 