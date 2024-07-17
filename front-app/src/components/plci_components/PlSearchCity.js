import axios from "axios";
import { useState } from "react"

export default function PlSelectCity() {
    const [plId, setPlId] = useState('');
    const [plName, setPlName] = useState('');
    const [plHour, setPlHour] = useState('');
    const [plTel, setPlTel] = useState('');
    const [plAddress, setPlAddress] = useState('');
    const [plText, setPlText] = useState('');
    const [result, setResult] = useState('');
    const searchClick = async() => {
            try{
            const response = await axios.get("http://localhost:9999/search/city?plText=${plText}",{
                plId : plId,
                plName : plName,
                plHour : plHour,
                plTel : plTel,
                plAddress : plAddress
            });
            if(response.status === 200)
                setResult(response.data.result);
        }catch (error){
            console.log(error);
        }
    }

    return(
        <div>
            <input 
            type="text"
            value={plText}
            onChange={(e) => setPlText(e.target.value)}
            placeholder="지역 입력"
            />
            <button onClick={searchClick}>조회</button>
        </div>
    )
}