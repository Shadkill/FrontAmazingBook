import { useState } from "react";
import GetBookAuthor from "./GetBookAuthor";
import Watch from "./Watch";
import Looked from "./Looked";
import WatchFuture from "./WatchFuture";
const BlockLokeedProfile = () => {
    const role = localStorage.getItem('role');
    const [step,setStep] = useState(1);
    const handleLokeed = ()=>{
        setStep(1);
    }
    const handleWillLokeed = ()=>{
        setStep(2);
    }
    const handleMyBook = ()=>{
        setStep(3);
    }
    const handleWatchFuture = ()=>{
        setStep(4);
    }
    return (
        <>
              <div className="div_looked">
                    <div className={step ===1 ?"div_left_profile":"div_right_profile"}>
                        <p className="p_looked" onClick={handleLokeed}>Читаю</p>
                    
                </div>
                
                <div className={step ===2 ?"div_left_profile":"div_right_profile"}>
                    <p className="p_looked" onClick={handleWillLokeed}>Прочитано</p>
                </div>
                <div className={step ===4 ?"div_left_profile":"div_right_profile"}>
                    <p className="p_looked" onClick={handleWatchFuture}>В планах</p>
                </div>
                {role === "author"?
                <div className={step ===3 ?"div_left_profile":"div_right_profile"}>
                <p className="p_looked" onClick={handleMyBook}>Мои книги</p>
                </div>:<div></div>
            }
                
                </div>
                <img src="/image/ark_profile.png" alt="" className="ark_profile"/>
                <div className="block_two_profile">
                <img src="/image/ellipse_profile_looked.png" alt="" className="ellipse_profile_looked"/>
                {step === 1 && <Watch/>}
                {step === 2 && <Looked/>}
                {step === 3 && <GetBookAuthor/>}
                {step === 4 && <WatchFuture/>}
                
                </div>
        </>
    );
}

export default BlockLokeedProfile;
