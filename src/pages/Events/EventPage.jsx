// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import EventList from './EventList';
import EventDetail from './EventDetail';

const EventPage = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        navigate('/eventsP/event-detail');
    };

    return (
        <div>
            <Routes>
                <Route path="/" element={<EventList onSelectEvent={handleSelectEvent} />} />
                <Route path="event-detail" element={<EventDetail event={selectedEvent} onClose={() => setSelectedEvent(null)} />} />
            </Routes>
        </div>
    );
};

export default EventPage;

