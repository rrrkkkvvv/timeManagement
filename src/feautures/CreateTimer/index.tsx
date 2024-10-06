import { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { addTimer } from "../../entities/Timer/model/timerSlice";


const CreateTimer = () => {
    const [text, setText] = useState('');
    const dispatch = useAppDispatch();
    const handleSubmit = ()=>{
        dispatch(addTimer({title:text}));
        setText('')
    }

    return ( 
        <div className="create-timer">
            <input type="text" value={text} onChange={(e)=>setText(e.target.value)} />
            <button onClick={handleSubmit}>
                Add timer
            </button>
        </div>
    );
}
 
export default CreateTimer;