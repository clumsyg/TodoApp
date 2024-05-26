import axios from "axios";
import toast from 'react-hot-toast';
import List from "./List";
import Form from "./Form";
import './style.css';
import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

const Todo = () => {
    const [todos, setTodos] = useState([]);

    const notifyDelete = () => toast.success('削除完了！');

    const url = `http://localhost:5174/todos/`;

    useEffect(() => {
        const getTodos = async () => {
            const res = await axios.get(url);
            setTodos(res.data);
        }
        getTodos();
    }, []);

    const deleteTodo = async (id) => {
        // db削除処理
        try {
            await axios.delete(url + id);
        } catch (e) {
            console.log('最初のaxios.delete時のエラーは', e);
        }

        // db更新処理（idを連番にする）
        const newTodos = todos.filter(todo => todo.id !== id);
        for (let i = 0; i < newTodos.length; i++) {
            newTodos[i].id = i + 1;
        }

        for (let i = id; i <= newTodos.length; i++) {
            try {
                const add = parseInt(i) + 1;
                await axios.delete(url + add);
            } catch (e) {
                console.log('更新処理内のaxios.delete時のエラーは', e);
            }

            try {
                await axios.post(url, {
                    id: String(newTodos[i - 1].id),
                    text: newTodos[i - 1].text
                });
            } catch (e) {
                console.log('更新処理内のaxios.post時のエラーは', e);
            }
        }

        setTodos(newTodos);
        notifyDelete();
    }

    const addTodos = (newTodos) => {
        setTodos([...todos, newTodos]);
    }

    return (
        <MyContext.Provider value={[todos, setTodos]}>
            <List deleteTodo={deleteTodo} />
            <Form addTodos={addTodos} />
        </MyContext.Provider>
    )
}

export default Todo;
