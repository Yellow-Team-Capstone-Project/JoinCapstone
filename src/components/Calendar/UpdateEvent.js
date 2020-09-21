import React, { Component } from "react";
import swal from "@sweetalert/with-react";

//allows users to edit their event

class UpdateEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventTitle: this.props.event.title,
			eventDate: this.props.event.start,
			eventId: this.props.event.id,
		};
		this.changeText = this.changeText.bind(this);
		this.changeDate = this.changeDate.bind(this);
		this.updatingEvent = this.updatingEvent.bind(this);
	}

	updatingEvent() {
		let date = this.state.eventDate;
		date = new Date(date);
		date = date.valueOf();
		const data = {
			title: this.state.eventTitle,
			date: date,
			id: this.state.eventId,
		};
		this.props.update(data);
		swal({
			title: "Event Updated",
			icon: "success",
		});
	}

	changeText(e) {
		let title = e.target.value;

		this.setState({
			eventTitle: title,
		});
	}

	changeDate(e) {
		let newDate = e.target.value;
		this.setState({
			eventDate: newDate,
		});
	}

	render() {
		return (
			<div>
				<form id="event-form">
					<label>Title: </label>
					<input
						type="text"
						value={this.state.eventTitle}
						name="title"
						onChange={this.changeText}
					/>
					<br />
					<br />
					<label>Date: </label>
					<input
						type="datetime"
						name="dateTime"
						value={this.state.eventDate}
						onChange={this.changeDate}
					/>
					<br />
					<br />
					<div id="attendee">
						Attendee(s):{this.props.event.attendees}
					</div>
				</form>
				<button type="button" onClick={this.updatingEvent}>
					Update Event
				</button>
			</div>
		);
	}
}

export default UpdateEvent;
