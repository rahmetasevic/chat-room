import React, { FormEvent, useEffect, useState } from 'react';
import '../styles/Home.scss';
import { useLocation } from 'react-router-dom';
import { socket } from '../utils/socket';

const Home: React.FC = () => {
    const [message, setMessage] = useState<{text: string}>({text: ''});
    const [messageList, setMessageList] = useState<{user: string, message: string}[]>([]);
    const [activeUsers, setActiveUsers] = useState<{name: string}[]>([]);
    const { state } = useLocation();

    useEffect(() => {
        socket.emit('welcome_message', {name: state.username});

        socket.on('send_welcome', (data: any) => {
            setMessageList([...messageList, {user: 'Chat Bot', message: data.message}]);
        });

        socket.on('users', (data: any) => {
            setActiveUsers(data);
        });

        socket.on("disconnected", (id: any) => {
            setActiveUsers((users: any) => {
                return users.filter((user: any) => user.id !== id);
            });
        });
    }, [socket]);

    useEffect(()=> {
        socket.on('receive_message', (data: any) => {
            setMessageList([...messageList, {user: data.user, message: data.message}]);
            setMessage({text: ''});
        });

    }, [socket, message]);
    
    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(!message.text) {
            return;
        }

        const messageContent = {
            user: state.username,
            message: message.text
        };

        socket.emit('send_message', messageContent);
    };

    return (
        <div className='container'>
            <h1>Chatbox</h1>
            <div className='chatbox'>
                <div className='chatbox__user-list'>
                    <h1>User list</h1>
                    {activeUsers.map((user: any) => {
                        return (
                            <div className='chatbox__user--active'>
                                <p>{user.name}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="chatbox__messages">
                    <div className="chatbox__messages">
                        <div className="chatbox__messages__user-message">
                            {messageList.map((list: any) => {
                                return (
                                    <div className="chatbox__messages__user-message--ind-message">
                                        <p className="name">Sent by: {list.user}</p>
                                        <br/>
                                        <p className="message">{list.message}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSendMessage}>
                    <input type="text" value={message.text} onChange={(e) => setMessage({text: e.currentTarget.value})}/>
                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    );
}

export default Home;