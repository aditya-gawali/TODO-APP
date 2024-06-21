import Todo from "../models/todo.models.js"

export const getTodo = async (req, res) => {
    try {
        const todo = await Todo.find({}).sort({ $natural: -1 });
        res.status(200).send(todo)
    } catch (error) {
        res.status(500).json({ msg: error.message })

    }
}

export const getSingleTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) return res.status(400).send("tasks not found")
        res.status(200).send(todo)

    } catch (error) {
        res.status(500).json({ msg: error.message })

    }
}

export const createTodo = async (req, res) => {
    try {
        const todo = await Todo.create(req.body);

        if (!todo) return res.status(400).send("Error while adding todo...")

        return res.status(200).json(todo)
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

export const updateTodo = async (req, res) => {
    try {

        const { id } = req.params;
        const todo = await Todo.findByIdAndUpdate(id, req.body);

        if (!todo) return res.status(404).send({ msg: "tasks not found" })

        const updateTodo = await Todo.findById(id);
        return res.status(200).json(updateTodo)

    } catch (error) {
        res.status(500).json({ msg: error.message })

    }
}

export const deleteTodo = async (req, res) => {
    try {

        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) return res.status(404).send({ msg: "task not found" })

        return res.status(200).json({ msg: "task deleted Successfully..." })

    } catch (error) {
        res.status(500).json({ msg: error.message })

    }
}