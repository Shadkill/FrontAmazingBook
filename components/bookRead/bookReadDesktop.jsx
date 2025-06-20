import { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './public/model/Model.jsx';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { animate, motion } from 'framer-motion';
import * as THREE from 'three';
import ButtonMusic from './ButtonMusic/ButtonMusic';
import Tutorial from './tutorial/Tutorial';
import ChapterSelector from './ChapterSelector/ChapterSelector';
import LoadModelElement from './tutorial/LoadModelElement';

function BookReadDesktop() {
    const { id } = useParams();
    const navigate = useNavigate();
    const actionsRef = useRef();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [chapters, setChapters] = useState([]);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [currentContentIndex, setCurrentContentIndex] = useState(0);
    const [isChapterVisible, setIsChapterVisible] = useState(true);
    const [isChapterVisible1, setIsChapterVisible1] = useState(true);
    const [animationActions, setAnimationActions] = useState([]);
    const maxSymbols = 550;
    const [isMaskotVisible, setMaskotVisible] = useState(false);
    const [isMaskotAngryVisible, setMaskotAngryVisible] = useState(false);
    const [isMaskotLastVisible,setMaskotLastVisible] = useState(false);
    const [isMaskotReadVisible, setMaskotReadVisible] = useState(true);
    const [positionBook,setPositionBook] = useState(2);
    const [rot, setRot] = useState(false);
    const [text,setText] = useState('');
    const [imagePath,setImagePath] = useState('');
    const [chapterName, setChapterName] = useState('');
    const [TutorialHidden, setTutorialHidden] = useState(true);
    const [showChapterSelector, setShowChapterSelector] = useState(false);

        const handleChapterSelect = (chapterIndex,contentIndex)=>{
            setCurrentChapterIndex(chapterIndex);
            setCurrentContentIndex(contentIndex);
            const newText = chapters[chapterIndex]?.content.slice(
                contentIndex,
                contentIndex+maxSymbols
            );
            setText(newText);
            const imgPath = `http://localhost:5000/${chapters[chapterIndex].image.replace(/\\/g,'/')}`;
            setImagePath(imgPath);
            setChapterName(chapters[chapterIndex]?.title);
            startReadingAnimation();
        }
        useEffect(() => {
        const getChapters = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/bookRead/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    return toast.error(errorData.message);
                }

                const data = await response.json();
                setChapters(data);
                // Сбрасываем индексы при загрузке новых глав
                setCurrentContentIndex(0);
                setCurrentChapterIndex(0);
               

            } catch (error) {
                console.error(error);
                toast.error("Ошибка загрузки глав");
            }
        };

        getChapters();
    }, [id]);
    const setButtonDisabled = (duration) => {
             setIsButtonDisabled(true);
           setTimeout(() => {
            setIsButtonDisabled(false);
           }, duration); // Устанавливаем время, через которое кнопки разблокируются
    };
    // Animation handler for next page/chapter
    const handleNextAnimation = () => {
        if (isButtonDisabled) return;
        setButtonDisabled(8000);
        setPositionBook(1);
        setMaskotVisible(true);
        setMaskotReadVisible(false);
        playForwardAnimation();
        
        if (currentContentIndex + maxSymbols < chapters[currentChapterIndex]?.content.length) {
            hideCurrentContentThenShowNext(currentContentIndex + maxSymbols);
        } else if (currentChapterIndex < chapters.length-1 ) {
            setCurrentChapterIndex(currentChapterIndex + 1);
            setCurrentContentIndex(0);
            hideCurrentContentThenShowNext(0);
            toast.success('Это последняя глава!');
        }else if(currentChapterIndex===chapters.length-1){
            toast.success("Поздравляем с прочтением книги!")
            navigate(`/commentAuthor/${id}`);
            return;
        }
    };

    // Animation handler for previous page/chapter
    const handlePreviousAnimation = () => {
        if (currentChapterIndex <= 0 && currentContentIndex === 0) return;
        if (isButtonDisabled) return;
        setButtonDisabled(6000);
        setMaskotLastVisible(true);
        setMaskotReadVisible(false);
        setPositionBook(1);

        playBackwardAnimation();
        hideCurrentContentThenShowPrev();
    };
    
    const handleAngryAnimation=()=>{
       
        if (isButtonDisabled) return; 
        setButtonDisabled(9000);
        setMaskotReadVisible(false);
        setMaskotAngryVisible(true);
        setRot(false);
        playAngryAnimation();
    }
    const playAngryAnimation =()=>{
        if (actionsRef.current) {
            Object.values(actionsRef.current).forEach(action => {
                if (action) action.stop();
            });
        }
        setAnimationActions([
            'Ellipse 242Action.001',
            'Group 60Action.001',
            'Group 57Action.001',
            'Group 59Action.001',
            'Group 61Action.001',
            'Group 58Action.001',
            'Vector 7Action.001',
            'Vector 7Action.002',
            'Vector 124Action'
        ]);
        if (actionsRef.current) {
            let completedAnimations = 0;
            const totalAnimations = 100;
    
            const animations = [
                'Ellipse 242Action.001',
            'Group 60Action.001',
            'Group 57Action.001',
            'Group 59Action.001',
            'Group 61Action.001',
            'Group 58Action.001',
            'Vector 3Action.002',
            'Vector 7Action.001',
            'Vector 7Action.002',
            'Vector 124Action'
            ];
    
            const checkCompletion = () => {
                completedAnimations++;
                if (completedAnimations === totalAnimations) {
                    setTimeout(() => {
                        setMaskotAngryVisible(false);
                        setMaskotReadVisible(true);
                        startReadingAnimation();
                    }, 1000); // Небольшая задержка для надежности
                }
            };
    
            animations.forEach(name => {
                const action = actionsRef.current[name];
                if (action) {
                    action.reset();
                    action.clampWhenFinished = true;
                    action.setLoop(THREE.LoopOnce);
                    action.play();
                    
                    // Используем EventListener вместо onFinished
                    action.getMixer().addEventListener('finished', () => checkCompletion());
                }
            });
        }

    }
    const playForwardAnimation = () => {
        // Сначала останавливаем все текущие анимации
        if (actionsRef.current) {
            Object.values(actionsRef.current).forEach(action => {
                if (action) action.stop();
            });
        }
    
        setAnimationActions([
            'Plane.002Action',
            'Group 54 (2)Action.001',
            'hand_leftAction.002',
            'hand_rightAction.002'
            
        ]);
    
        if (actionsRef.current) {
            let completedAnimations = 0;
            const totalAnimations = 4;
    
            const animations = [
                'Plane.002Action',
            'Group 54 (2)Action.001',
            'hand_leftAction.002',
            'hand_rightAction.002'
            ];
    
            const checkCompletion = () => {
                completedAnimations++;
                if (completedAnimations === totalAnimations) {
                    setTimeout(() => {
                        setMaskotVisible(false);
                        setMaskotReadVisible(true);
                        setPositionBook(2);
                        startReadingAnimation();
                    }, 1000); // Небольшая задержка для надежности
                }
            };
    
            animations.forEach(name => {
                const action = actionsRef.current[name];
                if (action) {
                    action.reset();
                    action.clampWhenFinished = true;
                    action.setLoop(THREE.LoopOnce);
                    action.play();
                    
                    // Используем EventListener вместо onFinished
                    action.getMixer().addEventListener('finished', () => checkCompletion());
                }
            });
        }
    };
    

    const playBackwardAnimation = () => {
        // Сначала останавливаем все текущие анимации
        if (actionsRef.current) {
            Object.values(actionsRef.current).forEach(action => {
                if (action) action.stop();
            });
        }
    
        setAnimationActions([
            'Plane.004Action.001',
            'Group 54 (2).001Action.001',
            'hand_left.001Action.001',
            'hand_right.001Action.001',
        ]);
    
        if (actionsRef.current) {
            let completedAnimations = 0;
            const totalAnimations = 4;
    
            const animations = [
               'Plane.004Action.001',
            'Group 54 (2).001Action.001',
            'hand_left.001Action.001',
            'hand_right.001Action.001',
            ];
    
            const checkCompletion = () => {
                completedAnimations++;
                if (completedAnimations === totalAnimations) {
                    setTimeout(() => {
                        setMaskotLastVisible(false);
                        setMaskotReadVisible(true);
                        setPositionBook(2);
                        startReadingAnimation();
                    }, 4000); // Небольшая задержка для надежности
                }
            };
    
            animations.forEach(name => {
                const action = actionsRef.current[name];
                if (action) {
                    action.reset();
                    action.clampWhenFinished = true;
                    action.setLoop(THREE.LoopOnce);
                    action.play();
                    
                    // Используем EventListener вместо onFinished
                    action.getMixer().addEventListener('finished', () => checkCompletion());
                }
            });
        }
    };
    const startReadingAnimation = () => {
        if (actionsRef.current) {
            const readingAnimations = [
                'Ellipse 242Action',
                'Group 60Action',
                'Group 57Action',
                'Group 59Action',
                'Group 61Action',
                'Group 58Action',
                'Vector 3Action',
                'Vector 7Action',
                'Vector 8Action',
            ];
    
            readingAnimations.forEach(name => {
                const action = actionsRef.current[name];
                if (action) {
                    action.reset();
                    action.setLoop(THREE.LoopRepeat);
                        action.play();
                  
                    
                }
            });
        }
    };
    
  


    const hideCurrentContentThenShowPrev = () => {
        
        
        setTimeout(()=>{
            setIsChapterVisible(false);
            setIsChapterVisible1(false);
        },2500)
        setTimeout(() => {
            let newChapterIndex = currentChapterIndex;
            let newContentIndex = currentContentIndex;

            if (currentContentIndex > 0) {
                newContentIndex = currentContentIndex - maxSymbols;
            } else if (currentChapterIndex > 0) {
                newChapterIndex = currentChapterIndex - 1;
                newContentIndex = chapters[newChapterIndex].content.length - 
                    (chapters[newChapterIndex].content.length % maxSymbols);
            }

            // Обновляем текст здесь
            const newText = chapters[newChapterIndex]?.content.slice(
                newContentIndex,
                newContentIndex + maxSymbols
            );
            setText(newText);

            setCurrentChapterIndex(newChapterIndex);
            setCurrentContentIndex(newContentIndex);
            setIsChapterVisible(true);
            setIsChapterVisible1(true);
        }, 4500);
    };



   
    const hideCurrentContentThenShowNext = (newIndex) => {
        
        
        setTimeout(() => {
            setIsChapterVisible(false);
            
            setIsChapterVisible(false);

            // Обновляем текст здесь
            
        }, 3000);
        setTimeout(()=>{
            setCurrentContentIndex(newIndex);
            setIsChapterVisible1(false);
            
        },4000)

        setTimeout(() => {
            setIsChapterVisible1(true);
        }, 5000);

        setTimeout(() => {
            setIsChapterVisible(true);
        }, 5000);
    };
    
    useEffect(() => {
        if (chapters.length > 0) {
            setTimeout(()=>{
                const newText = chapters[currentChapterIndex]?.content.slice(
                    currentContentIndex, 
                    currentContentIndex + maxSymbols
                );
                setText(newText);
                const imgPath = `http://localhost:5000/${chapters[currentChapterIndex].image.replace(/\\/g, '/')}`;
                setImagePath(imgPath);
                setChapterName(chapters[currentChapterIndex]?.title);
            },4000)
           
            startReadingAnimation();
            if(localStorage.getItem('Tutorial')){
                setTutorialHidden(false);
            }
            
        }
    }, [currentChapterIndex, currentContentIndex, chapters,imagePath]);
    const handleBack = ()=>{
        navigate(-1);
    }
    return (
        
        <div className='background_book'>
            {/* Other components */}
    <div className="div_content_book_read">
              
    
    
                
    </div>
    
    {TutorialHidden ? <div className='tutorial_block'> 
    <Tutorial
    TutorialHidden = {TutorialHidden}
    setTutorialHidden={setTutorialHidden}
    />
    </div> :<></>}

   
            <div className="div_buttons">
                <div className="div_handleBack">
                <img src="/image/arrow_top_about.png" alt="" className='arrow_privacy' onClick={handleBack}/>
                </div>
                <div 
                    className="div_left_buttons_book" 
                    onClick={handlePreviousAnimation}
                    disabled={isButtonDisabled}
                /> 
                <div 
                    className="div_left_buttons_book"
                    onClick={handleNextAnimation}
                    disabled={isButtonDisabled}
                />
                <div className="div_panel">
                <ButtonMusic />
                
                <ChapterSelector
                chapters={chapters}
                currentChapterIndex={currentChapterIndex}
                currentContentIndex={currentContentIndex}
                maxSymbols={maxSymbols}
                onSelect={handleChapterSelect}
                />
                </div>
                
                
            </div>
            <div className="div_button_maskot" onClick={handleAngryAnimation}>

            </div>

            <Canvas style={{ height: '100vh', width: '100vw', overflowX: 'hidden', overflowY: 'hidden' }} >
                <ambientLight intensity={2} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Model ref={actionsRef}  
                animationActions={animationActions} 
                isMaskotVisible={isMaskotVisible} 
                isMaskotLastVisible={isMaskotLastVisible}
                isMaskotAngryVisible={isMaskotAngryVisible}
                isMaskotReadVisible ={isMaskotReadVisible}
                rot = {rot}
                positionBook = {positionBook}
                text={text}
                imagePath={imagePath}
                chapterName={chapterName}
                isChapterVisible1={isChapterVisible1}
                isChapterVisible = {isChapterVisible}
                currentChapterIndex={currentChapterIndex}
                />
            </Canvas>
        </div>
    );
}
export default BookReadDesktop;
