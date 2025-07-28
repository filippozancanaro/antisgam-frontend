import { Navigate, Route, Routes } from 'react-router-dom';
import { Homepage, LoadingScreen, NotFound, Results, Settings } from '../views';
import { ApplicationRoute } from '../components';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<ApplicationRoute />}>
                {/* <Route path="/" element={<Navigate to="/home" replace />} /> */}
                <Route path="/" element={<Homepage />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/loading" element={<LoadingScreen />} />
                <Route path="/results" element={<Results />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/404-not-found" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404-not-found" replace />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
