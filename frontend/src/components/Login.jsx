import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        console.log({name,email});
    }
    
  return (
    <div className="row mt-3">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div className="card shadow-lg bg-dark">
                    <div className="card-header">
                        <h2 className='text-center text-white mt-3 rounded-lg'>Login</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleOnSubmit}>
                            
                            <div className="form-group mt-3">
                                <label className='form-label text-white'>Email</label>
                                <input type="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                 className='form-control' />
                            </div>
                            <div className="form-group mt-3">
                                <label className='form-label text-white'>Password</label>
                                <input type="password" 
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                className='form-control' />
                            </div>
                            <div className="form-group mt-3">
                                <button type='submit' className="btn btn-success">Login</button>
                                <Link to="/register" className='mx-4 text-white '>Create New Account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Login