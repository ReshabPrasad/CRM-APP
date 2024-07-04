import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";


const initialState = {
    ticketlist:[],
    ticketDistribution : {
        open:0,
        inProgress:0,
        resolved:0,
        onHold:0,
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
    reducers:{},
    extraReducers:(builder) => {
        (builder).addCase(getAllticketsforTheUser.fulfilled, (state,action) => {
            if(!action.payload?.data)return ; 
            state.ticketlist = action.payload?.data?.result;
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

export default ticketslice.reducer;