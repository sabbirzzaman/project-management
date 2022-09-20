import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/auth/AuthRoute';
import PrivateAuth from './components/auth/PrivateRoute';
import useAuthChecked from './hooks/useAuthChecked';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Teams from './pages/Teams';
import { Toaster } from 'react-hot-toast';

function App() {
    const authCheck = useAuthChecked();

    return !authCheck ? (
        <p>Loading...</p>
    ) : (
        <>
            <Routes>
                <Route
                    path="login"
                    element={
                        <AuthRoute>
                            <Login />
                        </AuthRoute>
                    }
                />
                <Route
                    path="teams"
                    element={
                        <PrivateAuth>
                            <Teams />
                        </PrivateAuth>
                    }
                />
                <Route
                    path="projects"
                    element={
                        <PrivateAuth>
                            <Projects />
                        </PrivateAuth>
                    }
                />
            </Routes>
            <Toaster />
        </>
    );
}

export default App;
