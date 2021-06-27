import Navbar from './Navbar';
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        state: state.sidebar
    }
}

const NavbarContainer = connect(mapStateToProps,null)(Navbar);

export default NavbarContainer;