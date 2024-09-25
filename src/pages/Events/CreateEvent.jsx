// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserInfo } from '../../utils/fetchUserInfo';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Calendar, Users, Type } from 'lucide-react';
import API_URL from "../../config/config";

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [ownerId, setOwnerId] = useState(null);
    const [maxCapacity, setMaxCapacity] = useState('');
    const [eventType, setEventType] = useState('presencial');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { darkMode } = useTheme();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userInfo = await getUserInfo(token);
                    setOwnerId(userInfo.id);
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            }
        };

        fetchUserInfo();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (title.length < 3) newErrors.title = "Title must be at least 3 characters long";
        if (description.length < 10) newErrors.description = "Description must be at least 10 characters long";
        if (!date) newErrors.date = "Date is required";
        if (maxCapacity <= 0) newErrors.maxCapacity = "Max capacity must be greater than 0";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            const token = localStorage.getItem('token');
    
            const eventData = {
                title,
                description,
                date,
                max_capacity: parseInt(maxCapacity),
                owner_id: ownerId,
                event_type: eventType
            };

            await axios.post(`${API_URL}/events-create`, eventData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            alert('Event created successfully');
            navigate('/eventsP');
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Failed to create event');
        }
    };

    return (
        <div className={`min-h-screen pt-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <div className="max-w-md mx-auto">   
                <h1 className="text-2xl font-bold mb-6">Create Event</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-1">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter event title"
                            className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                            required
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-1">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter event description"
                            className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                            required
                            rows="4"
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium mb-1">Date:</label>
                        <div className="relative">
                            <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="datetime-local"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className={`w-full p-2 pl-10 border rounded ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                                required
                            />
                        </div>
                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                    </div>
                    <div>
                        <label htmlFor="maxCapacity" className="block text-sm font-medium mb-1">Max Capacity:</label>
                        <div className="relative">
                            <Users className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="number"
                                id="maxCapacity"
                                value={maxCapacity}
                                onChange={(e) => setMaxCapacity(e.target.value)}
                                placeholder="Enter max capacity"
                                className={`w-full p-2 pl-10 border rounded ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                                required
                            />
                        </div>
                        {errors.maxCapacity && <p className="text-red-500 text-xs mt-1">{errors.maxCapacity}</p>}
                    </div>
                    <div>
                        <label htmlFor="eventType" className="block text-sm font-medium mb-1">Event Type:</label>
                        <div className="relative">
                            <Type className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <select
                                id="eventType"
                                value={eventType}
                                onChange={(e) => setEventType(e.target.value)}
                                className={`w-full p-2 pl-10 border rounded ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                                required
                            >
                                <option value="presencial">Presencial</option>
                                <option value="virtual">Virtual</option>
                            </select>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className={`w-full py-2 px-4 rounded ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                    >
                        Create Event
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;