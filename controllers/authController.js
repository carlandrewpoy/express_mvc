import express from "express"
import { Prisma, PrismaClient } from "@prisma/client"
import { queryAddUser, queryGetAllUsers } from "../services/UserTable.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

const prisma = new PrismaClient()
const app = express()
dotenv.config()

app.use(express.json())

export const getUsers = async (req, res) => {
  const allUsers = await queryGetAllUsers()
  console.log(req.params)
  res.json(allUsers)
}

export const register = async (req, res) => {
  const { username, first_name, last_name, password, email, address } = req.body
  // console.log(username)
  const hashedPassword = await bcrypt.hash(password, 10)
  await queryAddUser({
    username: username,
    first_name: first_name,
    last_name: last_name,
    password: hashedPassword,
    email,
    address: address,
  })
    .then((result) => res.status(201).json(result))
    .catch((err) => {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          res.status(400).json({ error: `${err.meta.target} already exist.` })
        }
      }
    })
}

export const login = async (req, res) => {
  // const { token } = req.cookies
  // console.log(token)
  const { username, password } = req.body
  const user = await prisma.user.findUnique({
    where: { username: username },
  })
  if (user) {
    bcrypt.compare(password, user.password, (err, match) => {
      if (match) {
        const userToSend = { ...user }
        delete userToSend.password

        const tokenInfo = { ...userToSend }

        const token = jwt.sign({ tokenInfo }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        })
        res.cookie("token", token)
        res.json(userToSend)
      } else {
        res.json({ error: "Username or password is incorrect." })
      }
    })
  } else {
    res.json({ error: "No user found." })
  }
}

export const logout = (req, res) => {
  console.log(req.tokenInfo)
  res.clearCookie("token")
  return res.json({ status: "success" })
}
