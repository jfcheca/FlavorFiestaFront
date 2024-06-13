// asegúrate de tener tu Navbar aquí
import { Outlet } from 'react-router-dom';
import HeaderLayout from './HeaderLayout'

const HeaderContainer = () => {
  return (
    <div>
      <HeaderLayout/>  
      <Outlet /> {/* Renders the nested routes */}
    </div>
  );
};

export default HeaderContainer;