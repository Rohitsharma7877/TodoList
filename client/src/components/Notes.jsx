import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import EditNotes from './EditNotes';
import CreateNotes from './CreateNotes';


const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [editNote, setEditNote] = useState({ _id: '', title: '', note: '' });
    const [sortOption, setSortOption] = useState('low');
   
const navigate =useNavigate()

useEffect(()=>{

    fetchNotes();
      }, []);

    const fetchNotes = () => {
      fetch("https://busy-gray-chipmunk-wear.cyclic.app/notes", {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res,"hhshshhshshshhsh");
          setNotes(res);
        })
        .catch((err) => console.log(err));
    };

    const deleteNote = (noteID) => {
        fetch(`https://busy-gray-chipmunk-wear.cyclic.app/notes/delete/${noteID}`, {
          method: 'DELETE',
          headers: {
            'Authorization': localStorage.getItem('token'),
          },
        })
          .then((res) => {
            if (res.ok) {
             
              fetchNotes();
            } else {
             
              console.log('Error deleting note:', res.statusText);
              
            }
          })
          .catch((err) => console.log(err));
      };
      
       
     

const handleEdit = (note) => {
 
localStorage.setItem("editnotes",JSON.stringify(note))
navigate(`/editnotes/${note._id}`)

    setEditNote({
      _id: note._id,
      title: note.title,
      note: note.note,
    });

  };

  const updateNote = () => {
    fetch(`https://busy-gray-chipmunk-wear.cyclic.app/notes/update/${editNote._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title: editNote.title,
        note: editNote.note,
        priorities:editNote.priorities,
        duedate:editNote.duedate
      }),
    })
      .then((res) => {
        if (res.ok) {
            fetchNotes();
          return res.json();
        } else {
        
          console.log('Error updating note:', res.statusText);
          
          throw new Error('Error updating note');
        }
      })
      .then((updatedNotes) => {
       
        setNotes(updatedNotes);
        setEditNote({ _id: '', title: '', note: '' });
  
      })
      .catch((err) => console.log(err));
  };
  
  
  const sortedNotes = [...notes].sort((a, b) => {
    if(sortOption==="low"){
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        return priorityOrder[a.priorities] - priorityOrder[b.priorities];
    }
    else if(sortOption==="medium"){
        const priorityOrder = { low: 3, medium: 1, high: 2 };
        return priorityOrder[a.priorities] - priorityOrder[b.priorities];
    }
    else{
        const priorityOrder = { low: 3, medium: 2, high: 1 };
        return priorityOrder[a.priorities] - priorityOrder[b.priorities];
    }
    return null

   
  });
  
  
  
  

    
  return (
    <>

<div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Personal Todo-List</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn" style={{textAlign:"left" ,display:"flex", justifyContent:"start", margin:"1em", gap:"1em", alignItems:"center"}}>
                        <Link to="/createnote" className="btn btn-success" >Add New (+)</Link>
                      
                          <select className="btn btn-success"  value={sortOption} onChange={(e) => setSortOption(e.target.value)} style={{  width:"10em",  height:"2.4em", padding:"4em", color: "white" , border: "none", appearance: "none",padding: "5px",}}>
                            <option value="">Sort by Priorities &#9660;</option>
                            <option value="low">Low <span>&#9660;</span></option>
                            <option value="medium">Medium &#9660;</option>
                            <option value="high">High &#9660;</option>
                          </select>
                        {/* </div> */}
                    </div>
                    <table className="table table-bordered ">
                        <thead className="bg-dark text-white">
                            <tr>
                            <td><strong>Sl.No</strong></td>
                                <td><strong>Title</strong></td>
                                <td><strong>Note</strong></td>
                                <td><strong>Periorities</strong></td>
                                <td><strong>Due-Date</strong></td>
                                
                                
                            </tr>
                        </thead>




 <tbody> 

                         {sortedNotes.length > 0 ? (
                              sortedNotes.map((ele,index) => (
                                <tr key={ele._id}>
                                  <th> {index+1}</th>
                                  <td>{ele.title}</td>
                                  <td> {ele.note}</td>
                                  <td> {ele.priorities}</td>
                                  <td> {new Date(ele.duedate).toLocaleDateString('en-GB')}</td>

                                        <td style={{display:"flex", gap:"1em"}}>
                                        
                                       <button onClick={() => handleEdit(ele)}  className="btn btn-success">Edit</button>
                                            
                                        <button  onClick={() => deleteNote(ele._id)}  className="btn btn-danger">Delete</button>
                                           
                                          
                                            </td>
                                            </tr>
                                        ))
                                      ) : (
                                        <h1>No notes are there</h1>
                                      )}

                        </tbody> 

                    </table>
                </div>
            </div>
        </div>

    {editNote._id && (
      <></>      
    )}
  </>
  )
}

export default Notes