import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CreateNotes.css'
import { Link } from 'react-router-dom';

const EditNotes = () => {
  let editnotes=JSON.parse(localStorage.getItem("editnotes"))
 
  // let date=editnotes.duedate.toISOString().split('T')[0]
const [title, setTitle]=useState(editnotes.title)
const [note, setNote]=useState(editnotes.note)
const [category, setCategory]=useState("")
const [priorities, setPriorities]=useState(editnotes.priorities)
const [selectedDate, setSelectedDate] = useState(null);
// const noteData = location.params.id;
// console.log(editNote,"location")

useEffect(() => {
  if (editnotes?.duedate) {
    const formattedDate = formatDate(editnotes.duedate);
    setSelectedDate(new Date(formattedDate));
  }
}, [editnotes]);

const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};



const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  
const handleSubmit=()=>{
 const payload={
    title,
    note,
    category,
    priorities,
    duedate: selectedDate,
 }
//  console.log(payload)

    fetch("https://busy-gray-chipmunk-wear.cyclic.app/notes/create",{
        method:"POST",
        body:JSON.stringify(payload),
        headers:{
            "Content-type":"application/json",
            "Authorization":localStorage.getItem("token")
        }

    }).then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
}

const updateNote = () => {
  fetch(`https://busy-gray-chipmunk-wear.cyclic.app/notes/update/${editnotes._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify({
      title: title,
      note: note,
      priorities:priorities,
      duedate:selectedDate
    }),
  })
    .then((res) => {
      if (res.ok) {
          // fetchNotes();
        return res.json();
      } else {
      
        console.log('Error updating note:', res.statusText);
        
        throw new Error('Error updating note');
      }
    })
    .then((updatedNotes) => {
     
      // setNotes(updatedNotes);
      // setEditNote({ _id: '', title: '', note: '' });

    })
    .catch((err) => console.log(err));
};
  return (
    



<div className="row">
    <div className="offset-lg-3 col-lg-6">
        <div className="container" >

            <div className="card" style={{"textAlign":"left"}}>
                <div className="card-title">
                    <h2>TODO Create</h2>
                </div>
                <div className="card-body">

                    <div className="row">

                        <div className="col-lg-12">
                            <div className="form-group">
                                <label><strong>Title</strong></label>
                                <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group">
                                <label>Note</label>
                               <input type="text" placeholder="enter Note" value={note} onChange={(e)=>setNote(e.target.value)}/>
                            
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group">
                                <label>Due-Date</label>
                                <DatePicker
                              selected={selectedDate}
                              onChange={handleDateChange}
                              dateFormat="yyyy-MM-dd"
                              placeholderText="Select a date"
                            />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group">
                                <label>Priorities</label>
                   <select value={priorities} onChange={(e) => setPriorities(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>  
                            </div>
                        </div>

                       
                        <div className="col-lg-12">
                            <div className="form-group">
                             <Link to='/allnotes'>  <button onClick={updateNote}>update Note</button></Link>
                               {/* <Link to="/" className="btn btn-danger">Back</Link> */}
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
</div>





   

  )
}

export default EditNotes