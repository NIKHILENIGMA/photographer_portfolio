import { PrismaClient } from '../../generated/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { DATABASE_URL } from './app.config'

const connectionString: string = DATABASE_URL
const adapter = new PrismaPg({
    connectionString
})
const prisma = new PrismaClient({ adapter })

export default prisma
