// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { getUserInfo } from "../../utils/fetchUserInfo";
import API_URL from "../../config/config";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { X, Calendar, MapPin, Users, Edit } from "lucide-react";

const EventDetail = ({ event, onClose }) => {
  const [registrations, setRegistrations] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = await getUserInfo(token);
          setUserInfo(user);
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (event) {
      fetchRegistrations();
    }
  }, [event]);

  const fetchRegistrations = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(
        `${API_URL}/events/${event.id}/registrations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRegistrations(response.data || []);

      if (userInfo && userInfo.id) {
        setIsRegistered(response.data.some(reg => reg.user.id === userInfo.id));
      }
    } catch (error) {
      console.error("Failed to fetch registrations:", error);
    }
  };

  const handleRegister = async () => {
    if (!userInfo || !userInfo.id) {
      alert("User information not found. Please log in again.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/events/${event.id}/register`,
        {
          event_id: event.id,
          user_id: userInfo.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsRegistered(true);
      alert("Successfully registered for the event");
      setRegistrations([...registrations, { user: { id: userInfo.id, username: userInfo.username } }]);
    } catch (error) {
      console.error("Failed to register for the event:", error);
      if (error.response && error.response.status === 400 && error.response.data.detail === "Event capacity reached") {
        alert("The event has reached its maximum capacity and no more registrations are allowed.");
      } else {
        alert("You cannot register for this event more than once.");
      }
    }
  };

  if (!event) return null;

  const isEventFull = registrations.length >= event.max_capacity;
  const isOrganizer = userInfo?.id === event.owner_id;

  return (
    <aside className={`fixed inset-0 overflow-hidden ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className={`h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium" id="slide-over-title">{event.title}</h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      className={`rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${darkMode ? 'hover:text-gray-300' : 'hover:text-gray-700'}`}
                      onClick={onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 relative flex-1 px-4 sm:px-6">
                <div className="absolute inset-0 px-4 sm:px-6">
                  <div className="h-full" aria-hidden="true">
                    <img src={event.image} alt={event.title} className="w-full h-64 object-cover mb-4 rounded-lg" />
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Calendar className="mr-2" size={18} />
                        <p>{new Date(event.date).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2" size={18} />
                        <p>{event.location}</p>
                      </div>
                      <p className="text-sm">{event.description}</p>
                      <p className="text-sm">Organized by: {event.owner_username}</p>
                      <div className="flex items-center">
                        <Users className="mr-2" size={18} />
                        <p>Capacity: {registrations.length}/{event.max_capacity}</p>
                      </div>

                      {!isEventFull && !isRegistered && (
                        <button
                          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                          onClick={handleRegister}
                        >
                          Register
                        </button>
                      )}

                      {isEventFull && <p className="text-red-500 font-bold">EVENT FULL</p>}

                      {isRegistered && <p className="text-green-500 font-bold">You are registered for this event</p>}

                      <div>
                        <h3 className="font-medium mb-2">Participants:</h3>
                        <ul className="list-disc pl-5">
                          {registrations.map((registration, index) => (
                            <li key={index} className="text-sm">{registration.user.username}</li>
                          ))}
                        </ul>
                      </div>

                      {isOrganizer && (
                        <Link to={`/events-update/${event.id}`} className="block mt-4">
                          <button className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
                            <Edit className="mr-2" size={18} />
                            Edit Event
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

EventDetail.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string,
    image: PropTypes.string.isRequired,
    owner_username: PropTypes.string.isRequired,
    max_capacity: PropTypes.number.isRequired,
    owner_id: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default EventDetail;