import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MiddleWareCollections } from "./middlewares/collections";
import { routes } from "./routes/routes";


const app = express();
dotenv.config();

MiddleWareCollections.essentials(app);
app.use(cors());
app.use("/",routes)

const PORT = process.env.PORT || 3400;

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});

export default app
