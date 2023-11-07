import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  // Sleep delay goes here
  // sleep(5000)
  res.json(posts);
});

// ⭐️ TODO: Implement this yourself
app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  posts.forEach((a)=>{
    if(a.id==id){
      let user= findUserById(a.userId)
      
      res.json([a,user])
    }
  })
  // The line below should be fixed.

});



app.get("/api/posts/:id/edit", (req, res) => {
  const id = parseInt(req.params.id);
  posts.forEach((a)=>{
    if(a.id==id){
      res.json(a)
    }
  })
  // The line below should be fixed.

});

app.post("/api/update",(req,res)=>{
  let data=req.body
  posts.forEach((a)=>{
    if(a.id==data.id){
      a.title=data.title
      a.category=data.category
      a.image=data.image
      a.content=data.content
      
     
    }
  })
  res.json(data)
  
//  console.log(posts)
  
 

})

app.post("/api/posts",(req,res)=>{
  let data=req.body
  addPost(data)

  console.log(posts)
  res.json(data)
  

  
 

})

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", (req, res) => {
  const incomingPost = req.body;
  addPost(incomingPost);
  res.status(200).json({ success: true });
});

app.listen(port, () => console.log("Server is running"));
