import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CreateNotes.css'
import { Link } from 'react-router-dom';

const CreateNotes = ({editNote}) => {
const [title, setTitle]=useState("")
const [note, setNote]=useState("")
const [category, setCategory]=useState("")
const [priorities, setPriorities]=useState("low")
const [selectedDate, setSelectedDate] = useState(null);
// const noteData = location.params.id;
console.log(editNote,"location")


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
                             <Link to='/allnotes'>  <button onClick={handleSubmit}>Add Note</button></Link>
                              
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

export default CreateNotes