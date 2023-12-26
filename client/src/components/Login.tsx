import React, { FormEvent, useState } from 'react'
import '../styles/Login.scss';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState<String>('');
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!username) {
            alert('Please, enter a name.');
        } else {
            navigate('/home', { replace: true, state: {username: username} });
        }
    };

    return (
        <div className="container">
            <div className='login-block'>
                <h1>Join the chat</h1>
                <div className='details-block'>
                    <label>Enter your name: </label>
                    <input type="text" onChange={e => setUsername(e.currentTarget.value)}/>
                </div>
                <button type='submit' onClick={handleSubmit}>Join</button>
            </div>
        </div>
    );
}

export default Login;