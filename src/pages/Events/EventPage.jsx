// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EventList from './EventList';
import EventDetail from './EventDetail';

const EventPage = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        navigate('/eventsP/event-detail');
    };

    const isDetailView = location.pathname.includes('/event-detail');

    return (
        <div className="relative min-h-screen bg-gray-100">
            <div className="w-full">
                <EventList onSelectEvent={handleSelectEvent} />
            </div>
            {isDetailView && selectedEvent && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <EventDetail 
                        event={selectedEvent} 
                        onClose={() => {
                            setSelectedEvent(null);
                            navigate('/eventsP');
                        }} 
                    />
                </div>
            )}
        </div>
    );
};

export default EventPage;