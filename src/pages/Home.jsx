import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Home = () => {

    const [login, setLogin] = useState(true)
    const [pannelClass, setPannelClass] = useState('')

    const handleclick = () => {

        if (!pannelClass || pannelClass === 'inactive') {
            setPannelClass('active')
        } else {
            setPannelClass('inactive')
        }
        setLogin(p => !p)
    }

    return ( 
        <section className="box">
            <h1 className="box__title">Supa Chattery</h1>
            <div className="pannel-box">
                <div 
                    className={`pannel ${pannelClass}`} 
                    onClick={handleclick}
                >
                    <span>Login</span>
                    <span>Sign up</span>
                </div>
                <div className={`component ${login ? 'active' : ''}`}>
                    <Login />
                </div>
                <div className={`component ${login ? '' : 'active'}`}>
                    <Signup />
                </div>
            </div>
        </section>
     );
}
 
export default Home;