import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import Register from "../pages/Register";
import Login from "../pages/Login";

const App = () => {
  const currentUser = false;

  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  }

  return (
    <Router>
      <Routes>
      <Route path="/">
          <Route index element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
