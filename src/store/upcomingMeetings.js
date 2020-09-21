import { db } from '..';

const GET_UPCOMING = "GET_UPCOMING"

export const getUpcoming =(meetings)=>({
    type:GET_UPCOMING,
    meetings
})



export const fetchUpcomingMeetings = (user) =>{
    return async(dispatch)=>{
        try{
            let eventRefs = db.collection('events') 
            let snap = await eventRefs.where('attendees','array-contains',user.uid).get()
            const someEvents=[]
            snap.forEach(doc=>someEvents.push({id:doc.id,...doc.data()}))
            dispatch(getUpcoming(someEvents)) 
           }  
        catch(err){
            console.log('error getting calendar events',err)
        }
    }
}

export default (state=[], action) =>{
    switch(action.type){
        case GET_UPCOMING:
            return action.meetings.filter(meeting=> new Date(meeting.start).getDate() === new Date().getDate())
        default:
            return state
    }

}