import React, { useEffect, useRef, useState } from 'react';

const Tutorial = ({TutorialHidden,setTutorialHidden}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isVisiblePanel,setIsVisiblePanel] = useState(false)
    const [isVisibleAngryMascot,setIsVisibleAngryMascot] = useState(false);
    const [isVisibleNextPage, setIsVisibleNextPage] = useState(false);
    const [isVisiblePreviousPage, setIsVisiblePreviousPage] = useState(false);
    const [isVisiblePanelChapter,setIsVisiblePanelChapter] = useState(false);
    const checkboxRef = useRef(null);
    useEffect(()=>{
        if(TutorialHidden){
            document.body.style.overflow = '';
        }
    },[TutorialHidden])
  const handleClick = () => {
    setIsVisible(false);
    setTimeout(()=>{
        setIsVisiblePanel(true);
    },500)
    
  };
  const handleClickPanel = () => {
    setIsVisiblePanel(false);
    setTimeout(()=>{
        setIsVisiblePanelChapter(true);
    },1000)
    
  };
  const handleClickPanelChapter=()=>{
    setIsVisiblePanelChapter(false)
    setTimeout(()=>{
        setIsVisibleAngryMascot(true);
    },1000)
  }
  const handleClickAngry = () => {
    setIsVisibleAngryMascot(false);
    setTimeout(()=>{
        setIsVisibleNextPage(true);
    },1000)
  };
  const handleClickNext = () => {
    setIsVisibleNextPage(false);
    setTimeout(()=>{
        setIsVisiblePreviousPage(true);
    },1000)
  };
  const handleClickEnd = () => {
    setIsVisibleNextPage(true);
    if(checkboxRef.current.checked){
        localStorage.setItem('Tutorial',false);
        setTutorialHidden(false);
 
    }else{
        setTutorialHidden(false);

    }
  };
    return (
        <>
       
        
            <div className={`div_hello ${isVisible ? '' : 'fade-out'}`}>
                
                
                <img src="/image/bella_hello.png" alt="" className='bella_hello'/>
                <div className="div_block_dialog">
                <div className="div_dialog">
                <p >Привет, я белла!</p>
                </div>
                <div className="div_button_next">
                    <button className='button_next' onClick={handleClick}>Далее</button>
                </div>
                </div>
                
            </div>
            <div className={`div_panel_ride ${isVisiblePanel ? '' : 'fade-out'}`}>
                <div className="div_block_dialog">
                <div className="div_dialog_music">
            <p >Здесь ты можешь включить музыку и отрегулировать громкость!</p>
            </div>
                <div className="div_button_next">
                    <button className='button_next' onClick={handleClickPanel}>Далее</button>
                </div>
                </div>
                
            
            <img src="/image/bella_panel.png" alt="" className='bella_hello'/>
            
            <div className="div_panel_visible">

            </div>
            </div>
            <div className={`div_panel_ride_chapters ${isVisiblePanelChapter ? '' : 'fade-out'}`}>
                <div className="div_block_dialog">
                <div className="div_dialog_music">
            <p >Здесь ты можешь выбрать к какой главе перейти!</p>
            </div>
                <div className="div_button_next">
                    <button className='button_next' onClick={handleClickPanelChapter}>Далее</button>
                </div>
                </div>
                
            
            <img src="/image/bella_panel.png" alt="" className='bella_hello'/>
            
            <div className="div_panel_visible_chapter">

            </div>
            </div>
            <div className={`div_mascot_angry ${isVisibleAngryMascot ? '' : 'fade-out'}`}>
            <div className="div_angry_visible">

            </div>
            <img src="/image/bella_angry.png" alt="" className='bella_hello'/>
            <div className="div_block_dialog">
                <div className="div_dialog_music">
            <p >Здесь ты можешь нажать на меня и тогда я буду злиться!</p>
            </div>
                <div className="div_button_next">
                    <button className='button_next' onClick={handleClickAngry}>Далее</button>
                </div>
                </div>
                
            </div>
            <div className={`div_mascot_next ${isVisibleNextPage ? '' : 'fade-out'}`}>
            <div className="div_block_dialog">
                <div className="div_dialog_music">
            <p > Ты можешь нажать здесь и тогда я тебе переверну страничку вперёд!</p>
            </div>
                <div className="div_button_next">
                    <button className='button_next' onClick={handleClickNext}>Далее</button>
                </div>
                </div>
            <img src="/image/bella_panel.png" alt="" className='bella_hello'/>
            <div className="div_next_visible">

            </div>
            </div>
            <div className={`div_mascot_previous ${isVisiblePreviousPage ? '' : 'fade-out'}`}>
            <div className="div_next_visible">

            </div>
           
            <img src="/image/bella_previous.png" alt="" className='bella_hello'/>
             <div className="div_block_dialog">
                <div className="div_dialog_music">
            <p > Ты можешь нажать здесь и тогда я тебе переверну страничку назад!</p>
            </div>
                <div className="div_button_next">
                    <button className='button_next' onClick={handleClickEnd}>Далее</button>
        <div className="div_check">
        <input
          type="checkbox"
          ref={checkboxRef}
          className='inputCheck'
        />
        <label>
        Больше не показывать
      </label>
        </div>
        
                </div>
                </div>
            </div>
      
        </>
    );
}

export default Tutorial;
