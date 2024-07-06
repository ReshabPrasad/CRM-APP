import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";


const initialState = {
    downloadedTickets:[],
    ticketlist:[],
    ticketDistribution : {
        open:0,
        inProgress:0,
        resolved:0,
        onhold:0,
        cancelled:0
    }
};


export const getAllticketsforTheUser = createAsyncThunk('getalltickets', async() =>{
    try {
        const response = axiosInstance.get("getMyAssignedTickets",{
            headers:{
                'x-access-token' : localStorage.getItem('token')
            }
        });
        toast.promise((response),{
            success: "Successfully loaded all the tickets",
            loading: "Fetching all the tickets belonging to you",
            error: "Something went wrong"
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
});

const ticketslice = createSlice({
    name:'ticket',
    initialState,
    reducers:{
        filterTickets: (state,action) => {
            let status  = action.payload.status.toLowerCase();
            if(status == "in progress") status = "inProgress";
            if(status=="on hold") status="onHold";
            state.ticketlist = state.downloadedTickets.filter((ticket) => (ticket.status==status));
        },
        resetTicketlist:(state)=>{
            state.ticketlist = state.downloadedTickets;
        },
        loadTickets:(state) =>{
            state.downloadedTickets = [];
            state.ticketlist = [];
            state.ticketDistribution = {
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0
            };
        }
    },
    extraReducers:(builder) => {
        (builder).addCase(getAllticketsforTheUser.fulfilled, (state,action) => {
            if(!action.payload?.data)return ; 
            state.ticketlist = action.payload?.data?.result;
            state.downloadedTickets = action.payload?.data?.result;
            const tickets = action.payload?.data?.result;
            state.ticketDistribution = {
                open:0,
                inProgress:0,
                resolved:0,
                onHold:0,
                cancelled:0
            };
            tickets.forEach(ticket=>{
                state.ticketDistribution[ticket.status]=state.ticketDistribution[ticket.status]+1;
            });  
        });
    }
});


export const {filterTickets,resetTicketlist,loadTickets} = ticketslice.actions;

export default ticketslice.reducer;