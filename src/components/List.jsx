import axios from "axios";
import { useContext, useState } from "react";
import { MyContext } from "./Todo";

const List = ({ deleteTodo }) => {
    const [todos, setTodos] = useContext(MyContext);
    const [isEdit, setIsEdit] = useState(false);
    const [isValEmpty, setIsValEmpty] = useState(false);
    const [val, setVal] = useState('');
    const [editId, setEditId] = useState('');

    const url = `http://localhost:5174/todos/`;

    const change = (e) => {
        setVal(e.target.value);
    }

    const editStart = (id) => {
        setIsEdit(prev => !prev);
        setEditId(id);
    }

    const editSubmit = async (id) => {
        if (!val) {
            setIsValEmpty(true);
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
        setIsValEmpty(false);
    }

    return (
        <>
            <h3>Todo一覧</h3>
            <div>
                {
                    todos.map(todo => {
                        return (
                            <div key={todo.id}>
                                <span>id: {todo.id} / text: {todo.text} </span>
                                <button onClick={() => deleteTodo(todo.id)}>完了</button>
                                <button onClick={() => editStart(todo.id)}>編集</button>
                            </div>
                        )
                    })
                }
            </div>
            {isEdit ? <br /> : false}
            {isEdit ? <p>id「{editId}」のTodoを編集中...</p> : false}
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
            {isValEmpty
                ?
                <p style={{ color: 'red' }}>空白で登録はできません！</p>
                :
                false
            }
            <br />
            <hr />
            <br />
        </>
    )
}

export default List;
