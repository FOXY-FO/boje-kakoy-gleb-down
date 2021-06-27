import React, {useEffect} from 'react';
import './App.css';
import News from './components/News/News';
import Musics from './components/Musics/Musics';
import Settings from './components/Settings/Settings';
import {Route, Switch, Redirect} from 'react-router-dom';
import NavbarContainer from './components/Navbar/NavbarContainer';
import {UsersContainer} from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {useDispatch, useSelector } from "react-redux";
import {initializeApp} from "./Redux/app-reducer";
import {Preloader} from "./components/common/Preloader/Preloader";
import SuspenseWrap from "./components/hoc/SuspenseWrap";
import {getInitialized} from "./Redux/app-selectors";
import {PrivateRouter} from "./components/Router/PrivateRouter";
// import Dialogs from "./components/Dialogs/Dialogs";
const Dialogs = React.lazy(() => import('./components/Dialogs'));

const App = () => {
    const dispatch = useDispatch();
    const initialized = useSelector(getInitialized);
    useEffect(() => {
        dispatch(initializeApp());
        // eslint-disable-next-line
    }, []);
    //происходит initialized и пока он не про инцелизируется initialized=false и работает крутилка
    if (!initialized) {
        return <Preloader/>
    }
    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <NavbarContainer/>
            <div className="app-wrapper-content">
                <Switch>
                    <Redirect exact from="/" to="/profile"/>
                    <PrivateRouter path="/profile/:userId?" component={ProfileContainer}/>
                    <PrivateRouter path="/dialogs" component={SuspenseWrap(Dialogs)}/>
                    <PrivateRouter path="/users" component={UsersContainer}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/musics" render={() => <Musics/>}/>
                    <Route path="/settings" render={() => <Settings/>}/>
                    <Route path="/login" render={() => <Login/>}/>
                    <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                </Switch>
            </div>
        </div>
    );
}
export default App;

