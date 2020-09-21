import React from 'react';
import './sidebar.css';
import { fetchMeetings } from '../../store/meetings';
import { fetchUpcomingMeetings } from '../../store/upcomingMeetings';
import { connect } from 'react-redux';
import DeleteMeeting from './DeleteMeeting';

class Sidebar extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() { // getting all pending meetings that haven't been cconfirmed and upcoming meeting for the current day on the mount
    this.props.pendingMeetings(this.props.user);
    this.props.upcomingMeetings(this.props.user);
  }

  render() {
    const upcoming = this.props.upcoming;
    console.log(upcoming, 'strawberry')
    const meetings = this.props.meetings;
    const user = this.props.user;
    upcoming.filter(
      (meeting) => (meeting.start = new Date(meeting.start).toUTCString())
    );
    meetings.filter(
      (meeting) => (meeting.start = new Date(meeting.start).toUTCString())
    );

    return (
      <section className="sidebar">
        <div className="sidebar-header">
          <h1>Meetings</h1>
        </div>
        <div className="meeting-section">
          <div className="meeting-list">
            <h3>UPCOMING</h3>
            {upcoming === []
              ? 'No Upcoming Meetings'
              : upcoming.map((meeting) =>
                  meeting.inviteFirst ? (
                    <div className="upcoming-meeting">
                      <div className="meeting-content">
                        Title: {meeting.title}
                        <br /> Time: {meeting.start}
                        <br />
                        Attendee(s): {meeting.host}, {meeting.inviteFirst}{' '}
                        {meeting.inviteLast}{' '}
                      </div>
                      <br />{' '}
                      <div className="meeting-buttons">
                        {' '}
                        <button
                          type="button"
                          className="button meeting-button"
                          id="start-call-button"
                        >
                          Start Meeting
                        </button>
                        <button
                          type="button"
                          className="button meeting-button"
                          id="reschedule"
                        >
                          Reschedule
                        </button>
                        <button
                          type="button"
                          className="button delete-button meeting-button"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="upcoming-meeting">
                      <div className='meeting-content'>
                      <b>Title:</b>{meeting.title} 
                      <br/>
                      <b>Date & Time:</b> {meeting.start}
                      <br />
                      <b>Attendee(s):</b> {meeting.host ? meeting.host : meeting.hostFirst}
                      <DeleteMeeting meeting={meeting} user={user} host={meeting.host ? meeting.host : meeting.hostFirst} />
                      </div>
                    </div>
                  )
                )}
          </div>
          <div>
            <h3 className="meeting-list">PENDING</h3>
            {meetings.map((meeting) => {
              if (meeting.hostId === user.uid) { //If you are the person who sent the meeting request and are waiting for another person to accept
                return (
                  <div className="meeting">
                    <div className="meeting-content">
                      Title: {meeting.title}
                      <br /> Time: {meeting.start} <br /> Invitation:
                      {meeting.inviteFirst} {meeting.inviteLast}
                    </div>
                    <br />
                    <DeleteMeeting
                      meeting={meeting}
                      host={meeting.host}
                      user={user}
                    />{' '}
                  </div>
                );
              } else {
                return (
                  <div className="meeting">
                    {' '}
                    <div className="meeting-content">
                      Title: {meeting.title}
                      <br /> Time: {meeting.start} <br />
                      From: {meeting.host}
                    </div>
                    <br />
                    <DeleteMeeting meeting={meeting} user={user} />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </section>
    );
  }
}

const mapState = (state) => ({ //making sure we have all meetings and upcoming meetings for the user on the state
  meetings: state.meetings,
  user: state.user,
  upcoming: state.upcomingMeetings,
});

const mapDispatch = (dispatch) => ({ //dispatching to get any meetings sent to me and all meetings for the current day
  pendingMeetings: (user) => dispatch(fetchMeetings(user)),
  upcomingMeetings: (user) => dispatch(fetchUpcomingMeetings(user)),
});

export default connect(mapState, mapDispatch)(Sidebar);
