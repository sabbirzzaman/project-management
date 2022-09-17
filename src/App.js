import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Teams from './pages/Teams';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/teams" element={<Teams />} />
        </Routes>
    );
}

export default App;
