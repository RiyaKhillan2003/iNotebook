import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export const Login = (props) => {
    const [credentials, setCredentials] = useState ({email: "",password:""});
    let navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers :{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Logged In Successfully", "success")
        }
        else
        {
            props.showAlert("Invalid Details", "danger")
        }
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name] : e.target.value})
    }
    return (
        <div className="mt-3">
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange}aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
