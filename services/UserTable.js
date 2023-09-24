import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const queryGetAllUsers = () => {
  return prisma.user.findMany()
}

export const queryAddUser = (userInfo) => {
  return prisma.user.create({
    data: userInfo,
  })
}
