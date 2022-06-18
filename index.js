import cors from 'cors';
import  express  from "express";


const app = express();
app.use(cors());
app.use(express.json());

const tweets = [];
const users = [];


app.get("/tweets", (request, response) => { 
    const lastTweets = [];
    if(tweets.length < 10){
        for (let index = 0; index < tweets.length; index++) {
            lastTweets.push(tweets[index]);
        }
    }else{
        for (let index = 0; index < 10; index++) {
            lastTweets.push(tweets[index]);
        }
    } 
    response.send(lastTweets);  
});

app.post("/sign-up", (request, response)=>{
    const user = request.body;
    users.push(user);
    response.send("OK");
});

app.post("/tweets", (request, response)=>{
    const tweet = request.body;
    tweets.unshift(tweet);
    response.send("OK");
});

app.listen(5000);