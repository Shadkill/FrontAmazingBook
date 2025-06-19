import React, { useEffect } from 'react';

const ModalBanBook = ({isOpen, onClose,onConfirm, BookTitle, banDesription,setBanDescription}) => {
     useEffect(()=>{
            if(isOpen){
                document.body.style.overflow = 'hidden';
            }else{
                document.body.style.overflow = 'auto';
            }
            return()=>{
                document.body.style.overflow = 'auto';
            }
        },[isOpen]);
        if (!isOpen) return null;
        return (
            <div className="modal-overlay">
            <div className="modal-content">
            <div className="div_modal_text">
                <h3 className='title_modal'>Подтверждение Блокировки</h3>
                <input type="text" placeholder='Причина блокировки' value={banDesription} onChange={(e)=>setBanDescription(e.target.value)} required/>
              <p className='p_modal'>Вы действительно хотите заблокировать книгу "{BookTitle}"? Это действие нельзя отменить.</p>
            </div>
              
              
              <div className="modal-buttons">
                <button className="cancel-button" onClick={onClose}>Отмена</button>
                <button className="confirm-button" onClick={onConfirm}>Забанить</button>
              </div>
            </div>
          </div>
        );
}

export default ModalBanBook;
