import NavBar from '../Components/NavBar';
import '../Styles/Profile.css';

const Profile = () => {
    return (
        <div className = "profile">
            <NavBar/>
            <h1>Profile</h1>
            <p>Here you can find all your profile information.</p>
        </div>
    );
}

export default Profile;