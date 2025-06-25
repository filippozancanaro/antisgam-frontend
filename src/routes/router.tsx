import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFound } from '../views';

const AppRoutes = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<Navigate to="/home" replace />} /> */}
            {/* <Route path="/" element={<HomeComponent />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/results" element={<UnfollowersComponent />} />*/}
            <Route path="/404-not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404-not-found" replace />} />
        </Routes>
    );
};

export default AppRoutes;
