import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNav from './components/MyNav';
import WishList from './pages/WishList';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import MainPage from './pages/MainPage';

const MyRouter = () => {
    return (
        <BrowserRouter>
        <MyNav/>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/add' element={<AddPage/>}/>
                <Route path='/edit/:id' element={<EditPage/>}/>
                <Route path='/wish' element={<WishList/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default MyRouter;