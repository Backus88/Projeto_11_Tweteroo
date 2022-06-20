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
    if(user.username.length>3 && /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png).{0,10000}/.test(user.avatar) ){
        users.push(user);
        response.status(201).send("OK");
    }else{
        response.status(400).send("Todos os campos são obrigatórios!");
    }
});

app.post("/tweets", (request, response)=>{
    const tweet = request.body;
    if(users.some((value)=> value.username ===  tweet.username) && (tweet.tweet.length > 10 && tweet.tweet.length < 300)){
        tweet.avatar = users.find((value)=> value.username === tweet.username).avatar;
        tweets.unshift(tweet);
        response.status(201).send("OK");
    }else{
        response.status(400).send("Todos os campos são obrigatórios!");
    }
    
});

app.listen(5000);