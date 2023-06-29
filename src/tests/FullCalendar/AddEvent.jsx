import Modal from 'react-modal';

export default function AddEvent({isOpen, onClose,onEventAdded}){
    const [title,setTitle]=useState(initialState,'')
    const[start,setStart]=useState(new Date());
    const [end,setEnd]=useState(new Date())

    const onSubmit=(event)=>{
        event.preventDefault();
        onEventAdded({
            title,start,end
        })
        onClose();
    }
    return(
        <Modal>
            isOpen={isOpen}
            onRequestClose={onClose}
            <form onSubmit={onSubmit}>
                <input placeholder='Title' value ={title} onChange={e=>setTitle(e.target.value)}/>            

                <div>
                    <label>Start Date</label>
                    <DateTime value={start} onChange={date=>setStart(date)}/>
                </div>
                <div>
                    <label>End Date</label>
                    <DateTime value={end} onChange={date=>setEnd(date)}/>
                </div>
                <button>Add Event</button>
            </form>
            </Modal>
    )
}