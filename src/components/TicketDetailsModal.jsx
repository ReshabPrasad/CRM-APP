function TicketDetailsModal({tickets}){
    return (
        <dialog id="tickets_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{tickets.title}</h3>
                {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                <textarea 
                className="description bg-white text-black resize-none w-full p-2 rounded-md" 
                rows="7" 
                cols="50"
                value = {tickets.description}
                >
                </textarea>

                <h1 className="text-lg text-white ">
                    Priority:
                    <select className="mx-2 p-1 my-2">
                        <option value="1" selected = {tickets.ticketPriority==1}>1</option>
                        <option value="2" selected = {tickets.ticketPriority==2}>2</option>
                        <option value="3" selected = {tickets.ticketPriority==3}>3</option>
                        <option value="4" selected = {tickets.ticketPriority>=4}>4</option>
                    </select>
                </h1>

                <h1 className="text-lg text-white my-4">
                    Status:
                    <select className="mx-2 p-1">
                        <option value="open" selected = {tickets.status=="open"}>open</option>
                        <option value="inprogress" selected = {tickets.status=="inprogress"}>inprogress</option>
                        <option value="onHold" selected = {tickets.status=="onHold"}>onHold</option>
                        <option value="resolved" selected = {tickets.status>="resolved"}>resolved</option>
                        <option value="cancelled" selected = {tickets.status>="cancelled"}>cancelled</option>
                    </select>
                </h1>


                <div className="modal-action">
                    <button className="btn-success px-4 py-2 bg-green-700 rounded-md text-lg font-semi hover:bg-green-400 transition-all ease-in-out duration-300">Update ticket</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                        <button>close</button>
            </form>
        </dialog>
    );
}

export default TicketDetailsModal;