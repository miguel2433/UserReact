import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./navbar";
import HomeContent from "./HomeContent";
import UserCard from "./UserCard";
import UserForm from "./UserForm";
import UserProfile from "./PerfilContent";

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomeContent />} />
                <Route path="/UserCard" element={<UserCard />} />
                <Route path="/UserForm" element={<UserForm />} />
                <Route path="/profile/:userId" element={<UserProfile />} />
            </Routes>
        </Router>
    );
}