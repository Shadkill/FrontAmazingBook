import React, { useEffect } from 'react';

const ModalDelete = ({isOpen,onClose,onConfirm,bookTitle}) => {
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
            <h3 className='title_modal'>Подтверждение удаления</h3>
          <p className='p_modal'>Вы действительно хотите удалить книгу "{bookTitle}"? Это действие нельзя отменить.</p>
        </div>
          
          
          <div className="modal-buttons">
            <button className="cancel-button" onClick={onClose}>Отмена</button>
            <button className="confirm-button" onClick={onConfirm}>Удалить</button>
          </div>
        </div>
      </div>
    );
}

export default ModalDelete;
