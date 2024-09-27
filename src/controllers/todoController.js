import Todo from "../models/todoModel.js";

export const createTodo = async (req, res) => {
  let todo = req.body;
  todo.user = req.payload.userId;
  let newTodo = new Todo(todo);
  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getTodos = async (req, res) => {
  let userId = req.payload.userId;
  let page = req.query.page ? req.query.page : 1;
  let limit = req.query.limit ? req.query.limit : 10;
  let filter = req.query.filter ? req.query.filter : "";
  let sortOrder = req.query.sort ? req.query.sort : "desc";

  try {
    let todos = await Todo.find({
      user: userId,
      $or: [
        { title: { $regex: filter, $options: "i" } },
        { description: { $regex: filter, $options: "i" } },
      ],
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: sortOrder });
    if (!todos) {
      return res.status(200).json({ message: "User does not have any todos." });
    } else {
      return res.status(200).json(todos);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    let todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, description: req.body.description },
      {
        new: true,
      }
    );
    return res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Todo Deleted." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
