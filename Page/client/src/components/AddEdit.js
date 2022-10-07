import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import "./AddEdit.css"
import axios from "axios";


const initialState = {
    name: "",
    teacher:"",
    duration: "",
    description: "",
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const {name, teacher, duration, description} = state;

    const {id} = useParams();

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/get/${id}`)
        .then((resp) => setState({...resp.data[0]}))
     }, [id]);

     const handleSubmit = (e) => {
        e.preventDefault();
        if(!id) {
            axios
            .post("http://localhost:5000/api/post",{
                name,
                teacher,
                duration,
                description,
            })
            .then(() => {
                setState({name: "", teacher: "", duration: "", description:""});
        })
        .catch((err) => console.log(err.response.data));
          console.log("Course Added Successfully");
        } else {
            axios
            .put(`http://localhost:5000/api/update/${id}`,{
                name,
                teacher,
                duration,
                description,
            })
            .then(() => {
                setState({name: "", teacher: "", duration: "", description:""});
        })
        .catch((err) => console.log(err.response.data));
        console.log("Course Updated Successfully");
           }      
     };
  
     const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    };

  return (
    <div style={{marginTop: "50px"}}>
        <form style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "300px",
            alignContent: "center",
        }}
        onSubmit={handleSubmit}
        >        
         <label htmlFor="name">Name</label>
         <input
          type="text"
          id="name"
          name="name" 
          placeholder="Course Name..."
          value={name || ""}
          onChange={handleInputChange} 
          />
           <label htmlFor="teacher">Course Teacher</label>
         <input
          type="text"
          id="teacher"
          name="teacher" 
          placeholder="Teacher Name..."
          value={teacher || ""}
          onChange={handleInputChange} 
          />
           <label htmlFor="duration">Course Duration</label>
         <input
          type="text"
          id="duration"
          name="duration" 
          placeholder="Course Duration..."
          value={duration || ""}
          onChange={handleInputChange} 
          />
           <label htmlFor="description">Course Description</label>
         <input
          type="text"
          id="description"
          name="description" 
          placeholder="Course Description..."
          value={description || ""}
          onChange={handleInputChange} 
          />
          <input type="submit" value={id ? "Update" : "Save" } />
          <Link to="/">
             <input type="button" value="Go Back" />
          </Link>
        </form>
    </div>
  );
};


export default AddEdit;
