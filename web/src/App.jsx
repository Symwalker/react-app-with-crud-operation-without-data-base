import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from "axios"
// import BasicModal from './components/Modal'
let baseUrl = ''
if (window.location.href.split(":")[0] === "http") {
  baseUrl = "http://localhost:5001/"
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function App() {
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userNumber, setUserNumber] = useState('')
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserNumber, setEditUserNumber] = useState('');
  const [allUsers, setAllUsers] = useState(null);
  const [open, setOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [iscall, setisCall] = useState(false);
  const userDetails = {
    name: userName,
    email: userEmail,
    number: userNumber

  }
  const editUserDetails = {
    name: editUserName,
    email: editUserEmail,
    number: editUserNumber

  }

  const addDetails = (e) => {
    e.preventDefault()
    axios.post(`${baseUrl}product`, userDetails)
      .then(res => {
        // console.log(res)
        getDetails()
      })
      .catch(err =>
        console.log('--------err', err)
      )

  }
  const getDetails = () => {
    axios.get(`${baseUrl}products`)
      .then(res => {
        // console.log(res.data.data)
        setAllUsers(res.data.data)
      })
      .catch(err =>
        console.log('--------err', err)
      )
  }

  // const toggleIscall = () => {
  //   setisCall(prevIsCall => !prevIsCall);
  //   getDetails()
  // };
  const deleteUser = (id) => {
    // console.log(id);
    axios.delete(`${baseUrl}product/${id}`)
      .then(res => {
        // console.log(res.data.data)
        setAllUsers(res.data.data)

      })
      .catch(err =>
        console.log('--------err', err)
      )
  }
  const openModal = (e, id) => {
    e.preventDefault();
    console.log(id);
    setOpen(true)
    setEditingUserId(id)
    
  };

  
  const editUser = (e) => {
    e.preventDefault()
    console.log(editingUserId);
    axios.put(`${baseUrl}product/${editingUserId}`, editUserDetails)
      .then(res => {
        getDetails();
        handleClose(); // Close the modal after editing
      })
      .catch(err =>
        console.log('--------err', err)
      );    
  };


  useEffect(() => {
    getDetails()
  }, [])

  return (
    <>
      <form onSubmit={addDetails}>
        <input type='text' placeholder='enter your name' onChange={(e) => setUserName(e.target.value)} />
        <input type='email' placeholder='enter your email' onChange={(e) => setUserEmail(e.target.value)} />
        <input type='number' placeholder='enter your number' onChange={(e) => setUserNumber(e.target.value)} />
        <input type='submit' value={"Submit"} />
      </form>

      <div>
        {
          allUsers === null ? "loading" : (
            allUsers.map((user, index) => {
              return (
                <div key={index} style={{ border: "3px solid black", borderRadius: "7px", margin: "10px", padding: "10px" }}>
                  <h1>{user.name}</h1>
                  <h2>{user.email}</h2>
                  <h3>{user.number}</h3>
                  <h4>{user.id}</h4>
                  <button onClick={() => deleteUser(user.id)}>delete</button>
                  <button onClick={(e) => openModal(e,user.id)}>Edit</button>
                  {/* edit modal */}
                  <div>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                      <form onSubmit={editUser}>
                          <input type='text' placeholder='enter your name' onChange={(e) => setEditUserName(e.target.value)} />
                          <input type='email' placeholder='enter your email' onChange={(e) => setEditUserEmail(e.target.value)} />
                          <input type='number' placeholder='enter your number' onChange={(e) => setEditUserNumber(e.target.value)} />
                          <input type='submit' value={"Submit"} />
                        </form>
                      </Box>
                    </Modal>
                  </div>
                </div>
              )
            })
          )
        }
      </div>
    </>
  );
}

export default App;
