import { Prisma } from "@prisma/client"
import {
  queryGetAllContacts,
  queryAddContact,
  queryDeleteContact,
  queryUpdateContact,
  queryViewContact,
} from "../services/ContactTable.js"

export const getContacts = async (req, res) => {
  const { id } = req.tokenInfo
  const allContacts = await queryGetAllContacts(id)
  res.json(allContacts)
}

export const viewContact = async (req, res) => {
  const { id } = req.params
  const contact = await queryViewContact(id)
  res.json(contact)
}

export const addContact = async (req, res) => {
  await queryAddContact(req.body)
    .then((result) => res.status(201).json(result))
    .catch((err) => {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          res.status(400).json({ error: `${err.meta.target} already exist.` })
        } else {
          res.json({ error: "Error" })
        }
      }
    })
}

export const updateContact = async (req, res) => {
  const { id } = req.params
  await queryUpdateContact(id, req.body)
    .then((results) => res.json(results))
    .catch((err) => {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          res.status(400).json({ error: `${err.meta.target} already exist.` })
        } else {
          res.json({ error: "Error" })
        }
      }
    })
}

export const deleteContact = async (req, res) => {
  const { id } = req.params
  await queryDeleteContact(id)
    .then((result) => res.json(result))
    .catch((err) => {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          res.status(400).json({ error: `${err.meta.target} already exist.` })
        } else {
          res.json({ error: "Error" })
        }
      }
    })
}
