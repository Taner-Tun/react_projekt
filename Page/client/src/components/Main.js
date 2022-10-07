import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import "./Main.css";
import axios from "axios";


const Main = () => {
    const [data, setData] = useState([]);
  
    const loadData = async () => {
      const response = await axios.get("http://localhost:5000/api/get");
      setData(response.data);
    };
  
    useEffect(() => {
      loadData();
    }, []);
  
    const deleteCourse = (id) => {
         axios.delete(`http://localhost:5000/api/remove/${id}`); 
         console.log("Course Deleted Successfully");     
    }
    return (
      <div style={{marginTop:"50px"}}>
        <h2>Courses</h2> 
        <Link to="/addCourse">
          <button className="btn btn-course">Add Course</button>
        </Link>
        
        <table className="styled-table">
          <thead>
             <tr>
               <th style={{textAlign:"center"}}>No</th>
               <th style={{textAlign:"center"}}>Name</th>
               <th style={{textAlign:"center"}}>Teacher</th>
               <th style={{textAlign:"center"}}>Duration</th>
               <th style={{textAlign:"center"}}>Description</th>
               <th style={{textAlign:"center"}}>Buttons</th>
             </tr>
          </thead>
          <tbody>
            {data.map((item, index) =>{
               return (
                  <tr key={item.id}>
                     <th scope="row">{index+1}</th>
                     <td>{item.name}</td>
                     <td>{item.teacher}</td>
                     <td>{item.duration}</td>
                     <td>{item.description}</td>
                     <td>
                        <Link to={`/update/${item.id}`}>
                        <button className="btn btn-edit">Edit</button>
                        </Link>
                        <button className="btn btn-delete" onClick={() => deleteCourse(item.id)}>Delete</button>
                     </td>
                 </tr>
               );
            })}
          </tbody>
        </table>      
      </div>
    );
  };
  
  export default Main;