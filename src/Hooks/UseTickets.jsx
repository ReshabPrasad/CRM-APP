import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";

import { getAllticketsforTheUser } from "../Redux/Slices/TicketSlice";


function Usetickets(){

    const authstate = useSelector((state)=> state.auth);
    const ticketState = useSelector((state) => state.tickets);
    const dispatch=useDispatch();

    async function loadAllTickets(){
        await dispatch(getAllticketsforTheUser());
    }

    useEffect(()=>{
        if(ticketState.ticketlist.length==0){
            loadAllTickets();
        }
    },[authstate.token]);
    return [ticketState];
}


export default Usetickets;