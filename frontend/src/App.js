import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SubscriptionList from './pages/SubscriptionList';
import SubscriptionDetail from './pages/SubscriptionDetail';
import SubscriptionNew from './pages/SubscriptionNew';
import SubscriptionEdit from './pages/SubscriptionEdit';

// ログイン状態に応じてリダイレクト
function RootRedirect() {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/subscriptions" replace /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />

        {/* Protected Routes */}
        <Route path="/subscriptions" element={<SubscriptionList />} />
        <Route path="/subscriptions/new" element={<SubscriptionNew />} />
        <Route path="/subscriptions/:id" element={<SubscriptionDetail />} />
        <Route path="/subscriptions/:id/edit" element={<SubscriptionEdit />} />

        {/* Default Redirect */}
        <Route path="/" element={<RootRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
