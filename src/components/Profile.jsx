import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout";

const Profile = ({ setShowProfile, showProfile }) => {

    const { user } = useAuthContext()
    const logout = useLogout()


    const imageStyles = {
        backgroundImage: `url(${user.avatar})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    
    return ( 
        <div className={`profile ${showProfile ? '' : 'hidden'}`}>

            <div>
                <span onClick={() => setShowProfile(false)} className="close">✖</span>
                <h1>Profile</h1>
            </div>

            <div className="profile-box">
                <div className="image-container" style={imageStyles}></div>
                <div className="side">
                    <p>{user.username}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={logout} className="button">Logout</button>
                </div>
            </div>
        </div>
     );
}
 
export default Profile;