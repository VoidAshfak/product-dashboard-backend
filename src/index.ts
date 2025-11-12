import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());


const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
