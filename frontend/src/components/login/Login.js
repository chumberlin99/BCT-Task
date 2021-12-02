import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';


function Login(props) {
    debugger;

    const [loginProps, setLoginProps]=useState({
        Email:"",
        Password:"",
    });
        const [loginErrors, setLoginErrors]=useState({
        EmailErr:"",
        PassErr:"",

        invalidEmail:"",
        invalidPass:"",
        propsValid:"",
    })
    
    const loginBtn =() =>{
        debugger;
        let isvalid =validation();

        if(isvalid === true){

        const loginParams = {
            email: loginProps.Email,
            password: loginProps.Password
        }

        axios.post("http://localhost:4000/app/login", loginParams)
        .then(response => {
            console.log(response.data.code)
            alert(response.data.message)
        })
        }
    }

    const validation =()=>{
        debugger;
        const EmailErr={};
        const PassErr={};
        let isValid= true;
    try{
        if(loginProps.Email.length < 1){
            EmailErr.emailsort="! Enter Email";
            isValid =false;
        }
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(loginProps.Email)){
            EmailErr.EmailSort="Enter a valid Email";
            isValid =false;
        }
        if(loginProps.Password.length < 1){
            PassErr.passsort="! Enter Password";
            isValid =false;
        }
        else if(loginProps.Password.length < 6 ){
            PassErr.PasswordSort="Enter a valid Password";
            isValid =false;
        }
    setLoginErrors({
        EmailErr: EmailErr,
        PassErr: PassErr
    })

        return isValid;
    }
    catch(error){
    isValid =false
    }
    }

    const handleChange = (e)=>{
        let {name,value}=e.target;
        setLoginProps((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    return (
    <div class="loginContainer">
        <div className="emailContainer">
            <label className="emailLabel" for="typeEmailX">Email</label>
                {Object.keys(loginErrors.EmailErr).map((key) => {
                return (
                    <span className="emailErr">{loginErrors.EmailErr[key]}</span>
                );
                })} 
                <br/>
            <input type="email" id="typeEmailX" name="Email" className="emailInput" onChange={handleChange} value={loginProps.Email} />
        </div>
    <br/>
        <div className="passContainer">
            <label className="passLabel" for="typePasswordX">Password</label>
                {Object.keys(loginErrors.PassErr).map((key) => {
                return (
                    <span className="passErr">{loginErrors.PassErr[key]}</span>
                );
                })} 
                <br/>
            <input type="password" id="typePasswordX" name="Password" className="passInput" onChange={handleChange} value={loginProps.Password} />
        </div>
    <br/>
        <div className="loginBtnContainer">
            <button className="loginBtn" onClick={loginBtn}>LOGIN</button>
        </div>
        <Link to='/signup'><h4 className="navSignp">SIGN UP</h4></Link>

    </div>
    )
}

export default Login
