import mongodb from "mongodb";
import dotenv from "dotenv";

import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";
import app from "./server.js";

async function main() {
  dotenv.config();

  const client = new mongodb.MongoClient(process.env.MOVIE_DB_URI);

  const port = process.env.PORT || 8000;
  try {
    //Before using the classes we have to inject the data in the DAO
    //In this way the DAO is an interface beetwen the database and the requests
    await client.connect();
    await MoviesDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

main().catch(console.error);
