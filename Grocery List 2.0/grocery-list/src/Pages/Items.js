import NavBar from '../Components/NavBar';
import '../Styles/Items.css';

const Items = () => {
    return (
        <div className = "items">
            <NavBar/>
            <h1>Items</h1>
            <p>Here you can find all the items available for purchase.</p>
        </div>
    );
}

export default Items;