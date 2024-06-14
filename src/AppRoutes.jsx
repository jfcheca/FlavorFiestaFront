import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderContainer from "./component/layout/header/HeaderContainer";
import Home from "./Home";
import Footer from "./component/Footer/Footer";
import Login from "./component/Login/Login";
import "./AppRouter.css";
import SignUp from "./component/singUpForm/SignUp";
import ProductDetail from "./component/ProductDetail/ProductDetail"
import ConfirmEmail from "./component/ConfirmEmail/ConfirmEmail"
import { AuthProvider } from './component/AuthContext/AuthContext';
import CartProvider from './component/CartContext/CartContext';
import { OrderProvider } from './component/OrderContext/OrderContext';
import CartPage from './component/CartPage/CartPage';
import Store from './component/store/store';
import Categoria from './component/categoria/categoria';
import PrivateRoute from './PrivateRoute';
import Search from "./component/Search/Search";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <OrderProvider>
      <CartProvider>
    <div className="app-container">
      <Routes>
        <Route element={<HeaderContainer />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/store" element={<Store />} />
          <Route path="/categoria/:categoriaId" element={<Categoria />} />
          <Route path="/faqs" element={null} />
          <Route path="/contact" element={null} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/confirm-email/:token" element={<ConfirmEmail />} />
        </Route>
      </Routes>
      <Footer />
    </div>
    </CartProvider>
    </OrderProvider>
    </AuthProvider>
  );
};

export default AppRoutes;
