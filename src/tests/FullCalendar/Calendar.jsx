import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'

const Calendar=()=>{
    return(
        <>
            <div className='bg-green-500 text-center text-white'>
                <h2>See full schedule below</h2>
            </div>
            <div>
                <button className='ring-2 rounded p-2 bg-yellow-500 hover:bg-white'>Add Event</button>
            </div>
            <div className='bg-blue-500 w-1/4 h-1/4 overflow-auto'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    headerToolbar={{
                        left:'prev, next, today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    footerToolbar={{
                        left: 'prev, next',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    editable={true}
                    selectable={true}
                    
                />
            </div>
            
            
        </>
    )
}

export default Calendar;