import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    /* import.meta.env This works with vite not process.env. this !! */
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://${import.meta.env.VITE_HOST_IP}:3001/register`, {name, email, password})
        .then(result => {console.log(result)
        navigate('/login')
        })
        .catch(err=> console.log(err))
    }

  return (
    <div className="bg-secondary d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card shadow-sm p-4" style={{ width: "22rem" }}>
        <h3 className="mb-3">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter Name"
            onChange={(e)=> setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter Email" 
            onChange={(e)=> setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter Password" 
            onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-success">Register</button>
          </div>
        </form>
          <div className="text-center">
        
            <p className="mb-1">Already Have an Account</p>
            <Link to="/login" className="btn btn-outline-secondary w-100" disabled>Login</Link>
          </div>

      </div>
    </div>
  );
}

export default Signup;
