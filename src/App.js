import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/auth/AuthRoute';
import PrivateAuth from './components/auth/PrivateRoute';
import useAuthChecked from './hooks/useAuthChecked';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Teams from './pages/Teams';
import { Toaster } from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';

function App() {
    const authCheck = useAuthChecked();

    return !authCheck ? (
        <div className="h-screen flex bg-violet-100 items-center justify-center">
            <Oval
                height={70}
                width={70}
                color="#5b21b6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#ddd6fe"
                strokeWidth={4}
                strokeWidthSecondary={3}
            />
        </div>
    ) : (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AuthRoute>
                            <Login />
                        </AuthRoute>
                    }
                />
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
            <Toaster position="bottom-right" reverseOrder={false} />
        </>
    );
}

export default App;
