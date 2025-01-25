import express from 'express';
// import routes from './routes/index.ts';
import db from './config/connection.js';
await db();
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);
app.listen(PORT, () => {
    console.log(`Server API running on port ${PORT}!`);
});
