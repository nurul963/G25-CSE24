import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:""
    });
    const handleOnChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setFormData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
    }
  return (
        <div className="row mt-3">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h2 className='text-center'>Create Account</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleOnSubmit} >
                            <div className="form-group mt-3">
                                <label className='form-label'>Name</label>
                                <input type="text"
                                onChange={handleOnChange}
                                 name='name' value={formData.name} className='form-control' />
                            </div>
                            <div className="form-group mt-3">
                                <label className='form-label'>Email</label>
                                <input type="email"
                                onChange={handleOnChange}
                                 name='email' value={formData.email} className='form-control' />
                            </div>
                            <div className="form-group mt-3">
                                <label className='form-label'>Password</label>
                                <input type="password" 
                                onChange={handleOnChange}
                                name='password' value={formData.password} className='form-control' />
                            </div>
                            <div className="form-group mt-3">
                                <button type='submit' className="btn btn-primary">Submit</button>
                                <Link to="/login" className='mx-4'>Already have an account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Register