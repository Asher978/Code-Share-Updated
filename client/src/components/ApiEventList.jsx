import React from 'react';
import * as moment from 'moment';
import 'moment-duration-format';

const ApiEventList = (props) => {
    return (
        <div>
            {props.event.map((event => {
                return (
                    <div className='container' key={event.id}>
                        <h4>{event.name}</h4>
                        <div dangerouslySetInnerHTML={{ __html: event.description}} />
                        <p>WHEN: {moment(event.time).format('MMMM D, YYYY')}</p>
                        <p>RSVP LIMIT: {(event.rsvp_limit ? event.rsvp_limit : 'N/A')}
                            <span>&nbsp;Confirmed: {event.yes_rsvp_count}</span></p>
                        <p>Duration: {(event.duration ? moment.duration(event.duration, "milliseconds").format("h:mm"): 'N/A')}</p>
                    </div>
                )
            }))}
        </div>
    )
}

export default ApiEventList;