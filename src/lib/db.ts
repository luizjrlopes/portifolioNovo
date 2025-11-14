import mongoose from "mongoose";

const isStaticExport =
  process.env.BUILD_MODE === "export" ||
  process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

const MONGODB_URI = process.env.MONGODB_URI;

// Em export estático (GitHub Pages), não exigimos conexão com o banco
if (!MONGODB_URI && !isStaticExport) {
  throw new Error("MONGODB_URI não definida");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  // Em modo export estático, retorna no-op para evitar dependência de DB
  if (isStaticExport) {
    return {} as typeof mongoose;
  }

  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI as string, {
      dbName: process.env.MONGODB_DB || "portfolio",
    });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}
