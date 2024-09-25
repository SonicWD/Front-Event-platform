// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserInfo } from '../../utils/fetchUserInfo';
import '../../index.css';
import { useNavigate } from 'react-router-dom';
import API_URL  from "../../config/config"; 
//Poner limites de formulario
const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [ownerId, setOwnerId] = useState(null);
    const [maxCapacity, setMaxCapacity] = useState('');
    const [eventType, setEventType] = useState('virtual');
    const navigate = useNavigate();

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
    
            const eventData = {
                title,
                description,
                date,
                max_capacity: parseInt(maxCapacity),
                owner_id: ownerId,
                event_type: eventType // Add event type to the data
            };

            await axios.post(`${API_URL}/events-create`,eventData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            alert('Event created successfully');
            setTitle('');
            setDescription('');
            setDate('');
            setMaxCapacity('');
            setEventType('presencial'); // Reset to default
            navigate('/eventsP');
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Failed to create event');
        }
    };

    return (
        <div className="login">
            <div className="form-container">   
                <h1 className="title">Create Event</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div>
                        <label htmlFor="title" className="label">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter event title"
                            className="input input-email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="label">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter event description"
                            className="input input-password"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="label">Date:</label>
                        <input
                            type="datetime-local"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="input input-email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="maxCapacity" className="label">Max Capacity:</label>
                        <input
                            type="number"
                            id="maxCapacity"
                            value={maxCapacity}
                            onChange={(e) => setMaxCapacity(e.target.value)}
                            placeholder="Enter max capacity"
                            className="input input-email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="eventType" className="label">Event Type:</label>
                        <select
                            id="eventType"
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            className="input input-email"
                            required
                        >
                            <option value="presencial">Presencial</option>
                            <option value="virtual">Virtual</option>
                        </select>
                    </div>
                    <button type="submit" className="primary-button login-button">Create Event</button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
