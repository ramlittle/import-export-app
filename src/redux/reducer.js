const initialState={
    emergencies:[]
};

const reducer =(state=initialState, action)=>{
   switch(action.type){
    case 'POPULATE_EMERGENCIES':
        return {...state,emergencies:action.payload.emergencies}
    case 'DELETE_EMERGENCY':
        return{
            ...state,
            mentors: state.emergencies.filter(emergency=>emergency._id !==action.payload.id)
        }
    default:
        return state;
   }
}

export default reducer;
