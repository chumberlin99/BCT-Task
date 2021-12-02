import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const Signup = (props)=> {

    const [temp,setTemp]=useState({
                    Name:"",
                    Email:"",
                    Password:""

    });
    const [error,setError]=useState({
                    NameErr:{},
                    EmailErr:{},
                    PasswordErr:{},
    });
    const add = () =>{
        debugger;
        let isValid = FormValidation();
        if(isValid === true){
            const register = {
            name: temp.Name,
            email: temp.Email,
            password: temp.Password
        }
            axios.post("http://localhost:4000/app/signup", register)
            .then(response => {
                console.log(response.data)
                if(response.data.message === "User Added Successfully!"){
                    alert("User Added Successfully!")
                }
                else{
                    alert("Invalid Name, Email ID or Password!")
                }
            })
        }

    }


    const handleChange =(e)=>{
        
        let {name, value}=e.target;
        setTemp((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const FormValidation = () =>{

            const NameErr={};
            const EmailErr={};
            const PasswordErr={};

            let isValid= true;

        if(temp.Name.length < 1 ){
            NameErr.nameSort="! Enter Name";
            isValid =false;
        } 
        if(temp.Email.length < 1){
            EmailErr.EmailSort="! Enter Email";
            isValid =false;
        }
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(temp.Email)){
            EmailErr.EmailSort="Enter a valid Email";
            isValid =false;
        }
        if(temp.Password.length < 1 ){
            PasswordErr.PasswordSort="! Enter Password";
            isValid =false;
        }
        else if(temp.Password.length < 6 ){
            PasswordErr.PasswordSort="Enter minimum 6 characters";
            isValid =false;
        }
        setError({
            NameErr:NameErr,
            EmailErr:EmailErr,
            PasswordErr:PasswordErr,
        })
        return isValid;
    }

return (
    <div className="signupContainer">
        <div className="nameContainer">
            <label className="nameLabel" for="Name">Name</label>
                {Object.keys(error.NameErr).map((key) => {
                    return (
                    <span className="nameErr">{error.NameErr[key]}</span>
                    );
                })} 
                <br/>
            <input className="nameInput" type="text" name="Name" id="Name" onChange={handleChange} value={temp.Name}></input>
        </div>
        <br/>
        <div className="emailContainer">
            <label className="emailLabel" for="Email">Email</label>
                {Object.keys(error.EmailErr).map((key) => {
                    return (
                    <span className="emailErr">{error.EmailErr[key]}</span>
                    );
                })} 
                <br/>
            <input className="emailInput" type="email" name="Email" id="Email" onChange={handleChange} value={temp.Email}></input>
        </div>
        <br/>
        <div className="passContainer">
            <label className="passLabel" for="Password">Password</label>
                {Object.keys(error.PasswordErr).map((key) => {
                    return (
                    <span className="passErr">{error.PasswordErr[key]}</span>
                    );
                })} 
                <br/>
            <input className="passInput" type="password" name="Password" id="Password" onChange={handleChange} value={temp.Password}></input>
        </div>
        <br/>
        <div className="signupBtnContainer">
            <button className="signupBtn" onClick={add}>SIGNUP</button>
        </div>
        <Link to="/"><h4 className="navLogin">LOGIN</h4></Link>
    </div>
)
}

export default Signup;

