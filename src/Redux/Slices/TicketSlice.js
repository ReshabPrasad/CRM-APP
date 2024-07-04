import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";


const initialState = {
    tickets:[]
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
            state.tickets = action.payload?.data?.result;
        });
    }
});

export default ticketslice.reducer;