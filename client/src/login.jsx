import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/register', { email, password})
        .then(result => {
            console.log(result)
            if(result.data === "Success") {
                navigate('/home')
            }
        navigate('/home')
        })
        .catch(err=> console.log(err))
    }

  return (
    <div className="bg-secondary d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card shadow-sm p-4" style={{ width: "22rem" }}>
        <h3 className="mb-3">Login</h3>
        <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-success">Login</button>
          </div>
        </form>
          <div className="text-center">
          </div>

      </div>
    </div>
  );
}

export default Login;
