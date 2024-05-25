import { useState, useContext } from "react";
// import todoApi from "../../api/todo";
import { MyContext } from "./Todo";
import axios from "axios";

const Form = ({ addTodos }) => {
    const [val, setVal] = useState('');
    const [todos] = useContext(MyContext);

    const change = (e) => {
        setVal(e.target.value);
    }

    const submit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5174/todos", {
                id: String(todos.length + 1),
                text: val
            });
            const resData = res.data;
            addTodos(resData);
        } catch (e) {
            console.log('新規登録時のaxios.postのエラーは', e);
        }

        setVal('');
    }

    return (
        <div>
            <h3>新規登録</h3>
            <form onSubmit={submit}>
                <input
                    type="text"
                    value={val}
                    onChange={change}
                    placeholder="新しいtodo"
                    style={{width: '250px'}}
                    required
                    autoFocus
                />
                <button>登録</button>
            </form>
        </div>
    )
}

export default Form;
