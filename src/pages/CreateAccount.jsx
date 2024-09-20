// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../config/config"; // Importa la URL de la API

const CreateAccount = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(false);  // Estado para el rol
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');

        let isValid = true;

        if (!validateEmail(email)) {
            setEmailError('Por favor ingrese un email valido');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!validatePassword(password)) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres, contener letras mayúsculas y minúsculas, un número y un carácter especial.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!isValid) {
            console.log('Form is not valid');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/user-register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: name,
                    email: email,
                    password: password,
                    role: role,  // Incluir el rol en la solicitud
                }),
            });

            if (response.ok) {
                console.log('Cuenta creada');
                alert('Cuenta creada');
                navigate('/login');
            } else {
                console.error('Failed to create account:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login">
            <div className="form-container">   
                <h1 className="title">My account</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div>
                        <label htmlFor="name" className="label">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Samantha Diaz"
                            className="input input-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label htmlFor="email" className="label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="example@example.com"
                            className="input input-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {emailError && <p className="error">{emailError}</p>}
                        <label htmlFor="password" className="label">Password</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="*********"
                                className="input input-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                           <button
    type="button"
    className="toggle-password-btn"
    onClick={togglePasswordVisibility}
>
    <img src={showPassword ? "/images/icons/view-password-on.svg" : "/images/icons/view-password-off.svg"} alt="Toggle Password Visibility" />
</button>
                        </div>
                        {passwordError && <p className="error">{passwordError}</p>}
                        <label htmlFor="role" className="label">Role</label>
                        <select
                            id="role"
                            className="input input-role"
                            value={role ? "organizer" : "attendee"}
                            onChange={(e) => setRole(e.target.value === "organizer")}
                        >
                            <option value="attendee">Asistidor</option>
                            <option value="organizer">Organizador</option>
                        </select>
                    </div>
                    <input type="submit" value="Create" className="primary-button create-account-button" />
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;
