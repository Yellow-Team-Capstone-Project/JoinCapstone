import React from 'react'
import swal from '@sweetalert/with-react'
import {connect} from 'react-redux'
import {changeEvent} from '../../store/events'
import{fetchMeetings} from '../../store/meetings'
import {deleteEvent,} from '../../store/events';
import {fetchUpcomingMeetings} from '../../store/upcomingMeetings'

class DeleteMeeting extends React.Component{
    constructor(props){
        super(props)

    this.deleteMeeting=this.deleteMeeting.bind(this)
    this.addMeeting=this.addMeeting.bind(this)
    }

    deleteMeeting(){
        swal({
         title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this meeting!",
        icon: "warning",
        buttons: {
          cancel:true,
          confirm:{
            text:'delete',
            value:this.props.meeting
          }
        },
        }).then(value=>{
                  this.props.removeMeeting(value)
                  this.props.upcomingGone(this.props.user)
                swal({
                  title:'Meeting request deleted',
                  icon:'success'
                })
            
        })
    }

     addMeeting(){
        this.props.meeting.start = new Date(this.props.meeting.start).valueOf()
         this.props.updateMeetingStatus(this.props.meeting)
        this.props.statusChanged(this.props.user)
    }

    render(){
        if(this.props.host){
        return(<button type='button' className='decline-button' onClick={this.deleteMeeting}>delete</button>)}
        else{
            return (<div className='pending-buttons'><button type='button' className='accept-button' onClick ={this.addMeeting}>Accept</button> <button type='button' className='delete-button' onClick={this.deleteMeeting}> Decline</button></div>)
        }
    }
}

const mapDispatch =(dispatch)=>({
    removeMeeting:(event)=>dispatch(deleteEvent(event)),
    updateMeetingStatus:(event)=>dispatch(changeEvent(event)),
    statusChanged:(user)=>dispatch(fetchMeetings(user)),
    upcomingGone:(user)=>dispatch(fetchUpcomingMeetings(user))
})

export default connect(null,mapDispatch)(DeleteMeeting)