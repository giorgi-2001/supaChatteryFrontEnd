import { useState } from "react";
import { useLogin } from "../hooks/useLogin"

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPas1, setShowPas1] = useState(false)

    const { loading, error, login } = useLogin()

    const handleSubmit = async e => {
        e.preventDefault()
        await login(username, password)
        setUsername('')
        setPassword('')
    }

    return ( 
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="user">User Name</label>
            <input 
                id="user"
                type="text"
                placeholder="Enter Your Username"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
            />

            <div className="icon-container">
                <button 
                    className="show" 
                    type="button" 
                    onClick={() => setShowPas1(prev => !prev)}
                >
                    <img src={showPas1 ? "assets/eye1.png" :
                     "assets/eye2.png"} alt="eye" />
                </button>

                <label htmlFor="pass">Password</label>
                <input 
                    id="pass"
                    type={showPas1 ? 'text' : 'password'}
                    placeholder="Enter Your Password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                />
            </div>

            {error && <div className="error-message">Error: {error}</div>}
            
            <button disabled={loading} className="button">Log in</button>
        </form>
     );
}
 
export default Login;