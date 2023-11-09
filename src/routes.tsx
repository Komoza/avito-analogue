import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/main/main';
import { Profile } from './pages/profile/profile';
import { NotFoundPage } from './pages/not-found/not-found';
import { Advertisement } from './pages/advertisement/advertisement';
import { SellerProfile } from './pages/seller-profile/seller-profile';

export const AppRoutes = () => {
    return (
        <Routes>
            {/* <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} /> */}

            {/* <Route element={<ProtectedRoute redirectPath={'/login'} />}> */}
            <Route path="/" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/advertisement" element={<Advertisement />} />
            <Route path="/seller-profile" element={<SellerProfile />} />
            {/* </Route> */}

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
