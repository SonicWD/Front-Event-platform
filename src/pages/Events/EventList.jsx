// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';
import { Search, Calendar, MapPin } from 'lucide-react';
import API_URL from "../../config/config";

const EventList = ({ onSelectEvent }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const { darkMode } = useTheme();

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
        return <p className="text-center mt-20 dark:text-white">Loading events...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 mt-20">{error}</p>;
    }

    return (
        <div className={`min-h-screen pt-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <h2 className="text-2xl font-bold mb-4">Events</h2>
            <div className="relative mb-4">
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter events"
                    className={`w-full p-2 pl-10 border rounded ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            {filteredEvents.length === 0 ? (
                <p className="text-center">No events available</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredEvents.map((event) => (
                        <div key={event.id} className={`rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={() => onSelectEvent(event)}>
                            <img src={event.image || '/placeholder.svg'} alt={event.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                                <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{event.description}</p>
                                <div className="flex items-center mb-2">
                                    <Calendar size={16} className={`mr-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{new Date(event.date).toLocaleString()}</p>
                                </div>
                                <div className="flex items-center">
                                    <MapPin size={16} className={`mr-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{event.location}</p>
                                </div>
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