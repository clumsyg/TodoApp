import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { GrSend } from "react-icons/gr";
import { useState, useContext } from "react";
import { MyContext } from "./Todo";

const Form = ({ addTodos }) => {
    const [val, setVal] = useState('');
    const [todos] = useContext(MyContext);

    const notifySubmit = () => toast.success('登録完了！');
    const errorSubmit = () => toast.error('空白で登録はできません！');

    const change = (e) => setVal(e.target.value);

    const url = import.meta.env.VITE_API_URL;

    const submit = async () => {
        if (!val) {
            errorSubmit();
            return;
        }

        try {
            const res = await axios.post(url, {
                id: String(todos.length + 1),
                text: val
            });
            const resData = res.data;
            addTodos(resData);
        } catch (e) {
            console.log('新規登録時のaxios.postのエラーは', e);
        }

        setVal('');
        notifySubmit();
    }

    return (
        <div>
            <h2 className="form-h2">新規登録</h2>
            <div className="submit-div">
                <input
                    type="text"
                    className="submit-input"
                    value={val}
                    onChange={change}
                    placeholder="新しいTodo"
                    style={{ width: '200px' }}
                    required
                    autoFocus
                />
                <GrSend onClick={submit} className="submit-icon" />
            </div>
            <Toaster />
            <br /><br />
        </div>
    )
}

export default Form;
