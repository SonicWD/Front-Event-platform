// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../../index.css';
import API_URL from "../../config/config"; // Importa la URL de la API

const EventList = ({ onSelectEvent }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${API_URL}/events`);
                setEvents(response.data);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Error fetching events');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        setFilteredEvents(
            events.filter(event => {
                const title = event.title?.toLowerCase() || '';
                const description = event.description?.toLowerCase() || '';
                const location = event.location?.toLowerCase() || '';
                return title.includes(filter.toLowerCase()) ||
                       description.includes(filter.toLowerCase()) ||
                       location.includes(filter.toLowerCase());
            })
        );
    }, [filter, events]);

    if (loading) {
        return <p className="text-center mt-4">Loading events...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 mt-4">{error}</p>;
    }

    return (
        <div className="cards-container">
            <h2 className="text-2xl font-bold mb-4">Events</h2>
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter events"
                className="filter-input"
            />
            {filteredEvents.length === 0 ? (
                <p className="text-center">No events available</p>
            ) : (
                <div className="cards-container">
                    {filteredEvents.map((event) => (
                        <div key={event.id} className="product-card" onClick={() => onSelectEvent(event)}>
                            <img src={event.image} alt={event.title} />
                            <div className="product-info">
                                <div>
                                    <h3 className="text-lg font-semibold">{event.title}</h3>
                                    <p className="text-gray-500">{event.description}</p>
                                    <p className="text-gray-500">{new Date(event.date).toLocaleString()}</p>
                                    <p className="text-gray-500">{event.location}</p>
                                </div>
                                <figure>
                                    <img src="/images/icons/calendar-search-svgrepo-com.svg" alt="" />
                                </figure>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

EventList.propTypes = {
    onSelectEvent: PropTypes.func.isRequired,
};

export default EventList;
