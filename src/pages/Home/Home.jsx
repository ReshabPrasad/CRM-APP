import { useEffect } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { MdOutlineDoneAll } from "react-icons/md";
import { MdPending } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
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
        <div className="mt-10 flex  flex-row justify-center gap-6 items-center flex-wrap">
            <Card 
                status={(ticketState.ticketDistribution.open/ticketState.ticketlist.length)}
                quantity={ticketState.ticketDistribution.open}
                titleText="Open" 
                background='bg-yellow-300' 
                borderColor='border-green-300' 
                fontColor='text-black' 
                dividerColor='bg-black'>
                <BsFillPencilFill className='inline mr-2' />
            </Card> 
            <Card 
                status={(ticketState.ticketDistribution.inProgress/ticketState.ticketlist.length)}
                quantity={ticketState.ticketDistribution.inProgress}
                titleText="In Progress" 
                background='bg-orange-300' 
                borderColor='border-red-300' 
                fontColor='text-black' 
                dividerColor='bg-black'>
                <TbProgress className='inline mr-2' />
            </Card> 
            <Card 
                status={(ticketState.ticketDistribution.resolved/ticketState.ticketlist.length)}
                quantity={ticketState.ticketDistribution.resolved}
                titleText="Resolved" 
                background='bg-purple-300' 
                borderColor='border-blue-300' 
                fontColor='text-black' 
                dividerColor='bg-black'>
                <MdOutlineDoneAll className='inline mr-2' />
            </Card> 
            <Card 
                status={(ticketState.ticketDistribution.cancelled/ticketState.ticketlist.length)}
                quantity={ticketState.ticketDistribution.cancelled} 
                titleText="Cancelled" 
                background='bg-blue-300' 
                borderColor='border-violet-300' 
                fontColor='text-black' 
                dividerColor='bg-black'>
                <MdCancel className='inline mr-2' />
            </Card> 
            <Card 
                status={(ticketState.ticketDistribution.onHold/ticketState.ticketlist.length)}
                quantity={ticketState.ticketDistribution.onHold} 
                titleText="On Hold" 
                background='bg-gray-300' 
                borderColor='border-gray-800' 
                fontColor='text-black' 
                dividerColor='bg-black'>
                <MdPending className='inline mr-2' />
            </Card> 
            </div>
        </HomeLayout>
    );
}

export default Home;
