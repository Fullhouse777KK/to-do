import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Notes from './components/Notes'
import editIcon from './assets/images/edit.svg'
import Modal from './components/Modal'
import { TodoContext } from './context/todoContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



function App() {
  
  const setLS = () => localStorage.notes = JSON.stringify(notes)
  const getLS = () => localStorage.notes ? JSON.parse(localStorage.notes) : []
  
  const [notes, setNotes] = useState(getLS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editNote, setEditNote] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  
  
  const filteredNotes = notes.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
  
  useEffect(() => {
    setLS()
  }, [notes])
  
  const openModal = () => {
    setIsModalOpen(true)
    setIsEdit(false)
    setEditNote(null)
  }
  
  const closeModal = () => {
    setIsModalOpen(false)
  }
  
  const addOrChangeHandler = (note) => {
    if(editNote?.id) {
      const updateNotes = notes.map((item) => {
        if(item.id == note.id) {
          return note
        }
        return item
      })
      setNotes(updateNotes)
    }else {
      setNotes([...notes,  note])
    }
    
  }
  
  const deleteHandler = (id) => {
    setNotes(notes.filter((note) => note.id != id ))
  }
  
  const changeHandler = (note) => {
    setEditNote(note)
    setIsEdit(true)
    setIsModalOpen(true)
  }


  return (
   <>
    <TodoContext.Provider value={{
      closeModal,
      addOrChangeHandler,
      deleteHandler,
      changeHandler,
      searchValue,
      setSearchValue
    }}>
      <Navbar />
      <Notes notes={filteredNotes}/>
      { isModalOpen &&  <Modal editNote={editNote} isEdit={isEdit} /> }
      {!isModalOpen &&   
      <button className="btn__add" onClick={() => openModal()}>
        <img src={editIcon} alt="" />
      </button> 
      }
      <ToastContainer/>
      
     
    </TodoContext.Provider>
   
   </>
   
  )
}



export default App
