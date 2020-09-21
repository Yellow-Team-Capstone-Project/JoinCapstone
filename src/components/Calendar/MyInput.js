import React,{Component} from 'react'
import swal from 'sweetalert';
// import ReactDOM from 'react-dom'
// import swal from '@sweetalert/with-react'

// const DEFAULT_INPUT_TEXT = "";
 
class MyInput extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      eventTitle: '',
      eventDate: this.props.date?this.props.date.date:new Date()
    };
    this.changeText=this.changeText.bind(this)
   this.changeDate=this.changeDate.bind(this)
  }
 
  changeText(e) {
    let title = e.target.value
    let date=this.state.eventDate
    
 
    this.setState({
      eventTitle:title
    });
    swal.setActionValue({
        confirm: { value:{title,date}  }
      });

}

changeDate(e){
  let newDate =e.target.value
  let title=this.state.eventTitle


  this.setState({
    eventDate:newDate
  })
  let date= this.state.eventDate
  date = new Date(date)
  date = date.valueOf()
  swal.setActionValue({
    confirm:{value:{title,date}}
  })
}
 
  render() {
    return (
        <form id='event-form'>
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
        type='datetime' 
        name='dateTime'
        value={this.state.eventDate}
        onChange={this.changeDate}
        />
        <br/>
        <br/>
     </form>
     
    )}
}
 


export default MyInput