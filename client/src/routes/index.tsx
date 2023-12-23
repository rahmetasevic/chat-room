import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';

// const publicRoutes = [
//     {
//         path: '/home',
//         element: <Home/>
//     },
//     {
//         path: '/login',
//         element: <Login/>
//     }
// ];

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<Login />} />
                <Route path='/home' element={<Home/>}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;