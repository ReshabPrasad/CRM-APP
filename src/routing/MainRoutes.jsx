import { Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home/Home";
import ListALLUsers from "../pages/ListAllUsers/ListAllUsers";
import AuthRoutes from "./AuthRoutes";

function MainRoutes(){
    return (
        <Routes>
            <Route path ='/login' element = {<Login/>}/>
            <Route path ='/signup' element = {<Signup/>}/>
            <Route path ='/' element = {<Home/>}/>
            <Route path ='/dashboard' element = {<Dashboard/>}/>
            <Route element={<AuthRoutes allowedListedRoles={["admin"]}/>}>
                <Route path = "/users" element = {<ListALLUsers/>}></Route>
            </Route>
        </Routes>

    );
}

export default MainRoutes;