import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { Blog } from "./Blog";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const Body = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SignIn></SignIn>}/>
                <Route path="/signup" element={<SignUp></SignUp>}/>
                <Route path="/blog/:id" element={<Blog></Blog>}/>
            </Routes>
        </BrowserRouter>
    );
}