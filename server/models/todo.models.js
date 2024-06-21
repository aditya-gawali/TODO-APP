import mongoose from "mongoose";

const TodoSchema = mongoose.Schema(
    {
        task: {
            type: String,
            required: [true, "Please Enter the Task"]
        },
        done: {
            type: Boolean,
            default: false
        }
    },
    {
        Timestamp: true
    }
)

const Todo = mongoose.model("Todo", TodoSchema)

export default Todo;