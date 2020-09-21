import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import MyInput from './MyInput';
import Sidebar from './Sidebar';
import UpdateEvent from './UpdateEvent';
import swal from '@sweetalert/with-react';
import { connect } from 'react-redux';
import './sidebar.css';
import {
  fetchEvents,
  newEvent,
  changeEvent,
  deleteEvent,
} from '../../store/events';
import { fetchUpcomingMeetings } from '../../store/upcomingMeetings';

import './main.scss'; // webpack must be configured to do this

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCalendar(this.props.user);
  }

  render() {
    return (
      <div className="calendar home-title">
        <Sidebar />
        <div className="fullcalendar">
          <FullCalendar
            defaultView="timeGridWeek"
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            editable={true}
            weekends={true}
            events={this.props.events}
            eventClick={(info) => {
              swal({
                title: info.event.title,
                content: (
                  <UpdateEvent
                    event={info.event}
                    update={this.props.updateEvent}
                  />
                ),
                buttons: {
                  cancel: true,
                  confirm: {
                    text: 'delete',
                    value: info,
                  },
                },
              }).then((info) => {
                swal({
                  title: 'Are you sure?',
                  text:
                    'Once deleted, you will not be able to recover this event!',
                  icon: 'warning',
                  buttons: {
                    cancel: true,
                    confirm: {
                      text: 'delete',
                      value: info,
                    },
                  },
                }).then((value) => {
                  if (value) {
                    this.props.removeEvent(value.event);
                    swal({
                      title: 'Event Deleted',
                      icon: 'success',
                    });
                  }
                });
              });
            }}
            dateClick={(evt) =>
              swal({
                title: 'Create Event',
                content: <MyInput date={evt} />,
                buttons: {
                  cancel: true,
                  confirm: 'Add Event',
                },
              }).then((val) => {
                this.props.addEvent(this.props.user, val.value);
                this.props.checkUpcomingMeetings(this.props.user)
                swal({
                  title: 'Event Created',
                  text: 'Event: ' + val.value.title + ', was created!',
                  icon: 'success',
                });
              })
            }
          />
        </div>
      </div>
    );
  }
}
const mapDispatch = (dispatch) => ({
  getCalendar: (user) => dispatch(fetchEvents(user)),
  addEvent: (user, event) => dispatch(newEvent(user, event)),
  updateEvent: (user, event) => dispatch(changeEvent(user, event)),
  removeEvent: (event) => dispatch(deleteEvent(event)),
  checkUpcomingMeetings:(user)=>dispatch(fetchUpcomingMeetings(user))
});
const mapState = (state) => ({
  user: state.user,
  events: state.calendar,
  meetings: state.meetings,
});

export default connect(mapState, mapDispatch)(Calendar);

// export default Calendar
