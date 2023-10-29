import mongoose from "mongoose";

export class MongoDB {
  constructor() {
    this._connect();
  }

    _connect() {
        mongoose
        .connect(
            process.env.MONGODB_URI,
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            }
        )
        .then(() => {
            console.log("Database connection successful");
        })
        .catch((err) => {
            console.error("Database connection error: ", err);
        });
    }
}