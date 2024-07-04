import { useEffect } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../components/Card";
import HomeLayout from "../../Layout/HomeLayout";
import { getAllticketsforTheUser } from "../../Redux/Slices/TicketSlice";

function Home(){

    const authState = useSelector((state)=> state.auth);
    const ticketState= useSelector((state) => state.tickets);
    const dispatch = useDispatch();

    async function loadAllTickets(){
        const response = await dispatch((getAllticketsforTheUser()));
        console.log(response);
    }
    useEffect(()=>{
        loadAllTickets();
    },[authState.token]);

    return (
       <HomeLayout>
          <Card>
                <BsFillPencilFill className='inline mr-2' />
            </Card>
            <Card status={30} background='bg-yellow-300' borderColor='border-green-300' fontColor='text-black' dividerColor='bg-black'>
                <BsFillPencilFill className='inline mr-2' />
            </Card> 
        </HomeLayout>
    );
}

export default Home;
