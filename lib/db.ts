
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://bytebuddy:MwIIVJzvrcFnTwnn@cluster0.mqbsh6f.mongodb.net/portfolio';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

declare global {
  var mongoose: any;
}

let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    console.log('Using existing database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('Creating new database connection to:', MONGODB_URI);
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Database connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('Database connection error:', error);
        // Return a mock connection in development to prevent app from crashing
        if (process.env.NODE_ENV === 'development') {
          console.warn('Using mock database connection in development mode');
          return { connection: { readyState: 1 } };
        }
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    console.error('Database connection failed:', e);
    cached.promise = null;
    // In development, return a mock connection to prevent app from crashing
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using mock database connection in development mode');
      return { connection: { readyState: 1 } };
    }
    throw e;
  }
}

export default dbConnect;
