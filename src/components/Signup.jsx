import { useState } from "react";
import { useSignup } from "../hooks/useSignup"

const Signup = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [avatar, setAvatar] = useState(null)

    const [fileClass, setFileClass] = useState('')
    const [fileName, setFileName] = useState('Upload Your Photo')
    const [showPas1, setShowPas1] = useState(false)
    const [showPas2, setShowPas2] = useState(false)

    const { error, loading, setError, signup } = useSignup()

    const reader = new FileReader()
    avatar && reader.readAsDataURL(avatar)

    const handleSubmit = async e => {
        e.preventDefault()

        if (avatar.size > 2097152) return setError('selected image is too big')

        const string = reader.result
        await signup(email, username, password, password2, string)
        
        setEmail('')
        setUsername('')
        setPassword('')
        setPassword2('')
    }

    return ( 
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input 
                id="email"
                type="email"
                placeholder="Enter Your Email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
            />

            <label htmlFor="username">User Name</label>
            <input 
                id="username"
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

                <label htmlFor="password">Password</label>
                <input
                    id="password" 
                    type={showPas1 ? 'text' : 'password'}
                    placeholder="Enter Your Password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="icon-container">
                <button 
                    className="show" 
                    type="button"
                    onClick={() => setShowPas2(prev => !prev)}
                >
                    <img src={showPas2 ? "assets/eye1.png" :
                     "assets/eye2.png"} alt="eye" />
                </button>

                <label htmlFor="password2">Confirm Password</label>
                <input
                    id="password2"
                    type={showPas2 ? 'text' : 'password'}
                    placeholder="Confirm the Password"
                    value={password2} 
                    onChange={(e) => setPassword2(e.target.value)}
                />
            </div>
            
            
            <label htmlFor="avatar" className={`avatar-label ${fileClass}`}>
                {fileName}
            <input 
                type="file"
                id="avatar"
                placeholder="Upload Your Photo"
                accept="image/*"
                onChange={(e) => {
                    setAvatar(e.target.files[0]); 
                    setFileClass('uploaded');
                    setFileName(e.target.files[0].name)
                }}
                multiple={false}
                style={{display: 'none'}}
            />
            </label>
            {error && <div className="error-message">Error: {error}</div>}
            <button disabled={loading} className="button">Sign up</button>
        </form>
     );
}
 
export default Signup;