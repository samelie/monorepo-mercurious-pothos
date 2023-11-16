import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient({
  log: [{ level: 'query', emit: 'event' }, 'info', 'warn', 'error'],
  errorFormat: 'pretty',
})

db.$on('query', (e: any) => {
  console.log(e)
  // logger.info(e)
})
