import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import axiosInstance from "../../config/axiosInstance";
import HomeLayout from "../../Layout/HomeLayout";

function ListALLUsers(){

        const [allusers,setallusers] = useState([]);

        const [userdisplay,setuserdisplay] = useState({
            name : "",
            email: "",
            userType : "",
            userStatus : "",
            clientName : ""
        });

        const columns = [
            {
                name: 'User Id',
                selector: row => row._id,
                reorder: true,
            },
            {
                name: 'Email',
                selector: row => row.email,
                reorder: true,
            },
            {
                name: 'Name',
                selector: row => row.name,
                reorder: true,
            },
            {
                name: 'Status',
                selector: row => row.userStatus,
                reorder: true,
            },
            {
                name: 'Type',
                selector: row => row.userType,
                reorder: true,
                sortable: true,
            }
        ];
    async function loadAllUsers(){
        const response = await axiosInstance.get("/users",{
            headers:{
                'x-access-token' : localStorage.getItem('token')
            }
        });
        setallusers(response?.data?.result);
    }


    useEffect(()=>{
        loadAllUsers();
    },[]);
    
    return (
        <HomeLayout>
            <div className="flex flex-col min-h-[90vh] justify-center items-center" >
                <h1 className="font-bold text-5xl text-yellow-600 texr-center mb-10">
                    Users List
                </h1>
                        {allusers && <DataTable
                        onRowClicked ={(row) => {
                            setuserdisplay({
                                name : row.name,
                                email :row.email,
                                userType :row.userType,
                                userStatus : row.userStatus,
                                clientName : row.clientName
                            });
                            document.getElementById('user_details_modal').showModal();}
                        }
                        columns={columns}
                        data={allusers}
                        ></DataTable>
                    }
          </div>
                <dialog id="user_details_modal" className="modal">
                    <div className="modal-box text-bold">
                        <h3 className="font-bold text-lg">User details</h3>
                        <p className="py-4">Name : {userdisplay.name}</p>
                        <p className="py-4">Email : {userdisplay.email}</p>
                        <p className="py-4">User Type : {userdisplay.userType}</p>
                        <p className="py-4">User Status : {userdisplay.userStatus}</p>
                        <p className="py-4">Client Name : {userdisplay.clientName}</p>
                        
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
        </HomeLayout>
    );
}

export default ListALLUsers;