import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { getUsers, findUserById, addUser, deleteUserById } from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users")
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  getUsers(name, job)
    .then((users) => res.send({ users_list: users }))
    .catch((error) => res.status(500).send(error.message));
});

app.get("/users/:id", (req, res) => {
  findUserById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => res.status(500).send(error.message));
});

app.post("/users", (req, res) => {
  addUser(req.body)
    .then((newUser) => res.status(201).send(newUser))
    .catch((error) => res.status(500).send(error.message));
});

app.delete("/users/:id", (req, res) => {
  deleteUserById(req.params.id)
    .then((deletedUser) => {
      if (deletedUser) {
        res.status(204).send();
      } else {
        res.status(404).send("User not found.");
      }
    })
    .catch((error) => res.status(500).send(error.message));
})

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});