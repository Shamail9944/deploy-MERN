import { useEffect } from 'react';
import './App.css';
import Protected from './features/auth/Components/Protected';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SignUpPage from './pages/SignUpPage';
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/PageNotFound';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrderPage from './pages/UserOrderPage';
import ProfilePage from './pages/ProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import SignOut from './features/auth/Components/SignOut';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/Components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';


function App() {
  const user = useSelector(selectLoggedInUser)
  const dispatch = useDispatch()
  useEffect(() => {
    if (user) {
      dispatch(fetchProductByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user])


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Protected><Home /></Protected>} />
        <Route path="/admin" element={<ProtectedAdmin><AdminHome /></ProtectedAdmin>} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/cart" element={<Protected><CartPage /></Protected>} />
        <Route path="/checkout" element={<Protected><CheckoutPage /></Protected>} />
        <Route path="/productdetail/:id" element={<Protected><ProductDetailPage /></Protected>} />
        <Route path="/admin/productdetail/:id" element={<ProtectedAdmin><AdminProductDetailPage /></ProtectedAdmin>} />
        <Route path="/admin/productform" element={<ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>} />
        <Route path="/admin/productform/edit/:id" element={<ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>} />
        <Route path="/admin/orders" element={<ProtectedAdmin><AdminOrdersPage /></ProtectedAdmin>} />

        <Route path="/ordersuccess/:id" element={<Protected><OrderSuccessPage /></Protected>} />
        <Route path="/myProfile" element={<Protected><ProfilePage /></Protected>} />
        <Route path="/myOrders" element={<Protected><UserOrderPage /></Protected>} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
