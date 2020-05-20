import React,{Component} from 'react'
import swal from '@sweetalert/with-react'



class UpdateEvent extends Component{
    constructor(props){
        super(props)
        this.state = {
            eventTitle: this.props.event.title,
            eventDate:  this.props.event.start,
            eventId:this.props.event.id
          };
          this.changeText=this.changeText.bind(this)
          this.changeTime=this.changeTime.bind(this)
          this.updatingEvent=this.updatingEvent.bind(this)
        }

        updatingEvent(){
          const data = {title:this.state.eventTitle,date:this.state.eventDate ,id:this.state.eventId }
          this.props.update(this.props.user,data)
          swal({
            title:'Event Updated',
            icon:'success'
          })
        }
       
        changeText(e) {
          let title = e.target.value
          
          
          this.setState({
            eventTitle:title
          });
         
      
      }
      changeTime(e){
        console.log('changing time',e.target.value)
        // let title=this.state.eventTitle
        let date= e.target.value
        this.setState({
          eventDate:date
        })

        // swal.setActionValue({
        //   confirm: { value: date,}
        // });

      }
    //   changeDescription(e){
    //       let description = e.target.value
    //       let title=this.state.eventTitle
    //     //   let date=this.props.date.date
       
    //       this.setState({
    //         eventDescription:description
    //       });
      
    //       swal.setActionValue({
    //           confirm: { 
    //               value: {description:description,
    //               title:title}
    //             //   date:date}
    //       }});
    //   }



        render(){
          
                return(<div><form id='event-form'>
                            <label>Title: </label>
                                <input
type='text'
value={this.state.eventTitle}
name='title'
onChange={this.changeText}
/><br/> 
<br/>
<label>Date: </label>
<input 
type='datetime' name='dateTime'
value={this.state.eventDate}
onChange={this.changeTime}
/>
<br/>
{/* <br/>
<label>
    Description:
</label>
<input
type='text'
value={this.state.eventDescription}
name='description'
onChange={this.changeDescription}
/><br/> */}
<br/>
<div id='attendee'>
 Attendee(s): Brian
</div>
</form>
<button type='button' onClick={this.updatingEvent}>Update Event</button>
</div>
)
}

}

export default  UpdateEvent