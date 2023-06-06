const initialState={
    users:[]
};

const reducer =(state=initialState, action)=>{
   switch(action.type){
    case 'POPULATE_USERS':
        return {...state,users:action.payload.users}
    case 'DELETE_EMERGENCY':
        return{
            ...state,
            mentors: state.users.filter(emergency=>emergency._id !==action.payload.id)
        }
    default:
        return state;
   }
}

export default reducer;
