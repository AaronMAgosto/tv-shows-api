import { FieldValue } from "firebase-admin/firestore";
import  Jwt  from "jsonwebtoken";
import { db } from "./dbConnect.js";
import { secretkey } from "../secrets.js";

const collection = db.collection("shows");

export async function getShows ( req,res) {
  const showsCollection = await collection.get()
  const shows = showsCollection.docs.map(doc => ({...doc.data(), id: doc.id}))
  res.send(shows)
}

export async function addShow(req, res) {
  const token = req.headers.authorization // 
  if(!token ) {
    res.status(401).send({message: "Unauthorized, a valid token required "})
    return
  }
  const decoded = Jwt.verify(token, secretkey) // does step 10) verifies token
    if(! decoded) {
      res.status(401).send({message: "Unauthorized, a valid token required "})
    return
    }

  const { title, poster, seasons} = req.body
  if (!title || !poster || !seasons) {
    res.status(400).send({ message: "Show title, poster,and seeasons is required."})
    return
  }
  const newShow = {
    title,
    poster,
    seasons,
    createdAt: FieldValue.serverTimestamp(),
  }
  await collection.add(newShow) // add the new show
  getShows(req, res) // return the updated list
}