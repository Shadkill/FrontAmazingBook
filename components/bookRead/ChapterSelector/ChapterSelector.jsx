import React, { useState } from 'react';

const ChapterSelector = ({chapters, currentChapterIndex,currentContentIndex,maxSymbols,onSelect}) => {
    const [isOpen,setIsOpen] = useState(false);
    const ChapterStructure = chapters.map((chapter,chapterIdx)=>{
        const totalSubChapters = Math.ceil(chapter.content.length/maxSymbols);//узнаём кол-во подглав делением длинны контента на 550 символов
        const subChapters = Array.from({length:totalSubChapters},(_,i)=>({//создаёам новый массив для глав и подглав
            index:i,
            startPos: i * maxSymbols,
            endPos: Math.min((i+1) * maxSymbols, chapter.content.length)
        }));
        return{
            chapterIndex:chapterIdx,
            title:chapter.title,
            subChapters
        };
    });
    const currentSubChapterIndex = Math.floor(currentContentIndex/maxSymbols);
    const currentPositionText = `Глава ${currentChapterIndex+1}.${currentSubChapterIndex+1}`;
    const handleSelect = (chapterIndex,subChapterIndex) =>{
        const startPos = subChapterIndex * maxSymbols;
        onSelect(chapterIndex,startPos);
        setIsOpen(false);
    }
    return (
        <div className='chapter-selector'>
            <button className='selector-toggle' onClick={()=>setIsOpen(!isOpen)}><span className={`arrow ${isOpen?'open':''}`}>▼ </span>Выбрать главу</button>
            {isOpen&&(
                <div className="dropdown-menu">
                    {ChapterStructure.map((chapter)=>(
                        <div key={chapter.chapterIndex} className="chapter-group">
                            <div className="chapter-title">
                                Глава {chapter.chapterIndex+1}:{chapter.title}
                            </div>
                            <div className="subchapters-list">
                                {chapter.subChapters.map((subChapter,idx)=>(
                                    <div key={idx} className={`subchapter-item ${currentChapterIndex===chapter.chapterIndex && currentSubChapterIndex === idx?'active':''}`} onClick={()=>handleSelect(chapter.chapterIndex,idx)}>
                                        {chapter.chapterIndex + 1}.{idx+1}-
                                        {chapter.title} (стр.{idx+1})
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ChapterSelector;
