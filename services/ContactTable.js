import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const queryGetAllContacts = (id) => {
  return prisma.contact.findMany({
    where: { userId: parseInt(id) },
  })
}

export const queryViewContact = (id) => {
  return prisma.contact.findFirst({
    where: { id: parseInt(id) },
  })
}

export const queryAddContact = (contactInfo) => {
  return prisma.contact.create({
    data: contactInfo,
  })
}

export const queryUpdateContact = (contactId, newContactInfo) => {
  console.log({ newContactInfo })

  return prisma.contact.update({
    where: { id: parseInt(contactId) },
    data: newContactInfo,
  })
}

export const queryDeleteContact = (id) => {
  return prisma.contact.delete({
    where: { id: parseInt(id) },
  })
}
