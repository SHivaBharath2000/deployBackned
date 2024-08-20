<<<<<<< HEAD
import express from "express";
const todosRouter = express.Router();

let todos = [
  {
    id: "1",
    name: "Sleep",
    isCompleted: false,
  },
];

todosRouter.get("/", (req, res) => {
  res.send(todos);
});

// delete using query parameter
todosRouter.delete("/", (req, res) => {
  const { id } = req.query;

  todos = todos.filter((td) => td.id !== id);

  res.send({ msg: "Todo deleted successfully" });
});

=======
import express from "express";
const todosRouter = express.Router();

let todos = [
  {
    id: "1",
    name: "Sleep",
    isCompleted: false,
  },
];

todosRouter.get("/", (req, res) => {
  res.send(todos);
});

// delete using query parameter
todosRouter.delete("/", (req, res) => {
  const { id } = req.query;

  todos = todos.filter((td) => td.id !== id);

  res.send({ msg: "Todo deleted successfully" });
});

>>>>>>> origin/main
export default todosRouter;