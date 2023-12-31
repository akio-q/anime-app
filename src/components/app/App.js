import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import MainPage from '../pages/mainPageLayout/MainPage';
import Register from "../pages/Register";
import Login from "../pages/Login";

const App = () => {
  const currentUser = true;

  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  }

  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
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
        </main>
      </div>
    </Router>
  );
}

export default App;
