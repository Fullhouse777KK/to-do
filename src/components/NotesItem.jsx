import React, { useContext } from 'react'
import editIcon from '../assets/images/edit.svg'
import delIcon from '../assets/images/del.svg'
import clsx from 'clsx'
import { TodoContext } from '../context/todoContext'
import { toast } from 'react-toastify'

const NotesItem = ({ note, view, }) => {
    
    const notesItemTop = clsx('notes__item-top', {'active': !view})
    
    const { deleteHandler, changeHandler } = useContext(TodoContext)
    

    const deleteFn = (id) => {
        deleteHandler(id)
        toast.error('Заметка удалена', {
            position: "top-right",
            autoClose: 2000,
        })
    }
    
  return (
    <div className="notes__item">
        <div className={notesItemTop}>
            <h2>{note.title}</h2>
            <span>{note.date}</span>
        </div>
        <p className="notes__item-text">{note.text}</p>
        <div className="notes__item-btns">
            <button className="notes__item-btn purple" onClick={() => changeHandler(note)}>
                <img src={editIcon} alt="" />
                <span>РЕДАКТИРОВАТЬ</span>
            </button>
            <button className="notes__item-btn red" onClick={() => deleteFn(note.id)}>
                <img src={delIcon} alt="" />
                <span>Удалить</span>
            </button>
        </div>
    </div>
  )
}

export default NotesItem