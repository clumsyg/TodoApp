import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { FaRegCheckCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useContext, useState } from "react";
import { MyContext } from "./Todo";

const List = ({ deleteTodo }) => {
    const [todos, setTodos] = useContext(MyContext);
    const [isEdit, setIsEdit] = useState(false);
    const [val, setVal] = useState('');
    const [editId, setEditId] = useState('');

    const url = import.meta.env.VITE_API_URL;

    const notifyEdit = () => toast.success('編集完了！');
    const errorEdit = () => toast.error('空白で登録はできません！');

    const change = (e) => setVal(e.target.value);

    const editStart = (id) => {
        setIsEdit(prev => !prev);
        setEditId(id);
    }

    const editSubmit = async (id) => {
        if (!val) {
            errorEdit();
            return;
        }

        try {
            await axios.patch(url + id, {
                id,
                text: val
            });
        } catch (e) {
            console.log('編集完了ボタン押下時のpatchのエラーは', e);
        }

        try {
            const editedTodo = await axios.get(url);
            setTodos(editedTodo.data);
        } catch (e) {
            console.log('編集完了後のgetのエラーは', e);
        }

        setIsEdit(prev => !prev);
        setVal('');
        notifyEdit();
    }

    return (
        <>
            <h2 className="list-h2">Todo一覧</h2>
            <div>
                {
                    todos.map(todo => {
                        return (
                            <div className="todo-div" key={todo.id}>
                                <span className="span">{todo.text}</span>
                                <FaRegCheckCircle
                                    onClick={() => deleteTodo(todo.id)}
                                    className="check-icon"
                                />
                                <FaEdit
                                    onClick={() => editStart(todo.id)}
                                    className="edit-icon"
                                />
                            </div>
                        )
                    })
                }
            </div>

            {isEdit ? <br /> : false}
            {isEdit ? <p className="edit-p">{editId}つ目のTodo<b>「{todos[editId - 1].text}」</b>を編集中...</p> : false}
            <div className="edit-div">
                {isEdit
                    ?
                    <input
                        type="text"
                        value={val}
                        onChange={change}
                        placeholder="変更後のTodoを入力してください"
                        style={{ width: '250px' }}
                        autoFocus
                    />
                    :
                    false
                }
                {isEdit
                    ?
                    <button onClick={() => editSubmit(editId)}>編集完了</button>
                    :
                    false
                }
            </div>
            <Toaster />
            <br />
            <hr />
            <br />
        </>
    )
}

export default List;
