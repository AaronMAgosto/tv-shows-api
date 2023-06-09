import { FieldValue } from 'firebase-admin/firestore'
import  Jwt  from 'jsonwebtoken' // make sure to delete the curlies
import { db } from './dbConnect.js'
import { secretkey } from '../secrets.js'

const collection = db.collection('users')

export async function signup(req, res) {
  const { email, password} = req.body
  if (!email || password.length < 6) {
    res.status(400).send({message: "Email and password are both required. Password must be 6 characters or more"})
    return
  }
  //TODO: check if email is already in use
  const newUser = {
    email: email.toLowerCase(),
    password,
    createdAt: FieldValue.serverTimestamp(), // shows when user has created account
  }
  await collection.add(newUser) 
  //once the user is added... log them in...
  login(req,res)
}

export async function login(req,res) {
  const {email, password} = req.body
  if (!email || !password) {
    res.status(400).send({message: "Email and password are both required"})
    return
  }
  const users = await collection
  .where("email", "==", email.toLowerCase())
  .where("password", "==" , password)
  .get()
  let user = users.docs.map( doc => ({...doc.data(), id: doc.id}))[0]
  if(!user) {
    res.status(400).send({message: "Invalid email and/or password"})
    return
  }
  delete user.password // ln 31-34 hits db
  const token = Jwt.sign(user, secretkey)// where all the magic happens
  res.send({user, token}) // {email createdAt, id} sends token back
}