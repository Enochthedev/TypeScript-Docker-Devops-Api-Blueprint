import Config from './Config'
import mongoose from 'mongoose'

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(Config.mongo.url)

    console.log('Connected to MongoDB Successfully')
    console.log('  ▀▄   ▄▀')
    console.log(' ▄█▀███▀█▄')
    console.log('█▀███████▀█')
    console.log('█ █▀▀▀▀▀█ █')
    console.log('   ▀▀ ▀▀')
    console.log('waves template db is live ')
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
