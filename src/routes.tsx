import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/main/main';
import { Profile } from './pages/profile/profile';
import { NotFoundPage } from './pages/not-found/not-found';
import { Advertisement } from './pages/advertisement/advertisement';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/ads/:id" element={<Advertisement />} />
            <Route path="/profile/:id" element={<Profile />} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
