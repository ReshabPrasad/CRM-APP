import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { BsFillPencilFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { MdOutlineDoneAll } from "react-icons/md";
import { MdPending } from "react-icons/md";
import { TbProgress } from "react-icons/tb";

import Card from "../../components/Card";
import Usetickets from "../../Hooks/UseTickets";
import HomeLayout from "../../Layout/HomeLayout";


ChartJS.register(ArcElement, Legend, Title, Tooltip, CategoryScale, LinearScale,PointElement,LineElement);


function Home(){



    const [ticketState]= Usetickets();

    const [lineticketsdata,setlineticketsdata] = useState({
        opentickets:[],
        inProgresstickets:[],
        resolvedtickets:[]
    });

    const pieChartData = {
        labels : Object.keys(ticketState.ticketDistribution),
        fontColor: "white",
        datasets : [
            {
                label: "Status",
                data : Object.values(ticketState.ticketDistribution),
                backgroundColor: ["yellow","orange","purple","gray","white"],
                borderColor:["yellow","orange","purple","gray","white"]
            }
        ]
     };


     const lineChartData = {
        labels : Object.keys(lineticketsdata.inProgresstickets),
        fontColor: "white",
        datasets : [
            {
                label: "Open Tickets Data",
                data : Object.values(lineticketsdata.opentickets),
                borderColor: 'rgb(255, 99, 132)',
            },
            {
                label: "In Progress Tickets Data",
                data : Object.values(lineticketsdata.inProgresstickets),
                borderColor: 'rgb(53, 162, 235)',
            },
            {
                label: "Resolved Tickets Data",
                data : Object.values(lineticketsdata.resolvedtickets),
                borderColor: 'rgb(245, 205, 95)',
            }
        ]
     };

     function processTickets(){
        const currentdate = new Date();
        const tenthDateFromToday = new Date();
        tenthDateFromToday.setDate(currentdate.getDate()-10);
        if(ticketState.ticketlist.length>0){
            let openticketdata = {};
            let inprogressticketdata = {};
            let resolvedtickedata = {};

            for(let i=10;i>=0;i--){
                const dateobject = new Date();
                dateobject.setDate(dateobject.getDate()-i);
                openticketdata[dateobject.toLocaleDateString().split("/").reverse().join("-")] = 0;
                inprogressticketdata[dateobject.toLocaleDateString().split("/").reverse().join("-")] = 0;
                resolvedtickedata[dateobject.toLocaleDateString().split("/").reverse().join("-")] = 0;
            }
            ticketState.ticketlist.forEach(ticket => {
                const date = new Date(ticket.createdAt).toLocaleDateString().split("/").reverse().join("-");
                const ticketDate = new Date(ticket.createdAt);
                if(ticket.status == "open" && ticketDate>=tenthDateFromToday){
                    openticketdata[date] =  openticketdata[date]+1;
                }
                if(ticket.status == "inProgress" && ticketDate>=tenthDateFromToday){
                    inprogressticketdata[date] = inprogressticketdata[date]+1;
                }
                if(ticket.status == "resolved" && ticketDate>=tenthDateFromToday){
                    resolvedtickedata[date] = resolvedtickedata[date]+1;
                }
            });
           setlineticketsdata({
             opentickets:openticketdata,
             inProgresstickets:inprogressticketdata,
             resolvedtickets:resolvedtickedata
           });
        }
     }

     useEffect(() => {
        processTickets();
     },[ticketState.ticketlist]);
      
       return(
       <HomeLayout>
        {ticketState && (<div className="mt-10 flex  flex-row justify-center gap-6 items-center flex-wrap">
            <Card 
                status={(ticketState.ticketDistribution.open/ticketState.downloadedTickets.length)}
                quantity={ticketState.ticketDistribution.open}
                titleText="Open" 
                background='bg-yellow-300' 
                borderColor='border-green-300' 
                fontColor='text-black' 
                dividerColor='bg-black'>
                <BsFillPencilFill className='inline mr-2' />
            </Card> 
            <Card 
                status={(ticketState.ticketDistribution.inProgress/ticketState.downloadedTickets.length)}
                quantity={ticketState.ticketDistribution.inProgress}
                titleText="In Progress" 
                background='bg-orange-300' 
                borderColor='border-red-300' 
                fontColor='text-black' 
                dividerColor='bg-black'>
                <TbProgress className='inline mr-2' />
            </Card> 
            <Card 
                status={(ticketState.ticketDistribution.resolved/ticketState.downloadedTickets.length)}
                quantity={ticketState.ticketDistribution.resolved}
                titleText="Resolved" 
                background='bg-purple-300' 
                borderColor='border-blue-300' 
                fontColor='text-black' 
                dividerColor='bg-black'>
                <MdOutlineDoneAll className='inline mr-2' />
            </Card> 
            <Card 
                status={(ticketState.ticketDistribution.cancelled/ticketState.downloadedTickets.length)}
                quantity={ticketState.ticketDistribution.cancelled} 
                titleText="Cancelled" 
                background='bg-blue-300' 
                borderColor='border-violet-300' 
                fontColor='text-black' 
                dividerColor='bg-black'>
                <MdCancel className='inline mr-2' />
            </Card> 
            <Card 
                status={(ticketState.ticketDistribution.onHold/ticketState.downloadedTickets.length)}
                quantity={ticketState.ticketDistribution.onHold} 
                titleText="On Hold" 
                background='bg-gray-300' 
                borderColor='border-gray-800' 
                fontColor='text-black' 
                dividerColor='bg-black'>
                <MdPending className='inline mr-2' />
            </Card> 
            </div>)}
            <div className="justify-center flex items-center m-10 gap-10">
            <div className="h-80 w-80">
                <Pie data = {pieChartData}/>
            </div>
            </div>
            <div className="justify-center flex items-center m-10 gap-10">
            <div className="w-[50rem] bg-[wheat]">
                <Line data = {lineChartData}/>
            </div>
            </div>
        </HomeLayout>
    );
}

export default Home;