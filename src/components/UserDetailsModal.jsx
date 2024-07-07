import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosInstance";

function UserDetailsModal({users}){


    const [userdisplay,setuserdisplay] = useState(users);


    async function onStatusChange(e){
        console.log(e.target.textContent);
        const dropdown = document.getElementById("dropdown-open");
        dropdown.open=!dropdown.open;
        toast("Updating the user....");
        const response =await axiosInstance.patch("/user/updateUser",{
            userId : userdisplay.userid,
            updates : {
                ...userdisplay,
                userStatus:e.target.textContent
            },
        },{
            headers : {
                'x-access-token' : localStorage.getItem('token')
            }
        });
        if(response?.data?.result){
            toast.success("Succesfully updated the user");
            const user = response?.data?.result;
            setuserdisplay ({
                name : user.name,
                email : user.email,
                userStatus: user.userStatus,
                clientName:user.clientName,
                userType:user.userdisplay
            });
        }
    }
  return (
    <dialog id="user_details_modal" className="modal">
                    <div className="modal-box text-bold">
                        <h3 className="font-bold text-lg">User details</h3>
                        <p className="py-4">Name :  <span className="text-yellow-400">{userdisplay.name}</span></p>
                        <p className="py-4">Email : <span className="text-yellow-400">{userdisplay.email}</span></p>
                        <p className="py-4">User Status : 
                            <span className="text-yellow-400">
                            <details className="dropdown ml-2" id="dropdown-open">
                            <summary className="btn m-1"  >{userdisplay.userStatus}</summary>
                            <ul onClick = {onStatusChange} className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>Approved</a></li>
                                <li><a>Suspended</a></li>
                                <li><a>Rejected</a></li>
                            </ul>
                            </details>
                            </span>
                        </p>
                        <p className="py-4">User Type : <span className="text-yellow-400">{userdisplay.userType}</span></p>
                        <p className="py-4">Client Name : <span className="text-yellow-400">{userdisplay.clientName}</span></p>
                        
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
  );
}

export default UserDetailsModal;