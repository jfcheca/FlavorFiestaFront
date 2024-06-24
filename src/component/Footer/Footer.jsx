import { useEffect,useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useOrdenProductos } from '../OrderProductContext/OrderProductContext'; 
import { AuthContext } from '../AuthContext/AuthContext';
import './Footer.css';

const Footer = () => {
  const { usuario } = useContext(AuthContext);
  const ordenProductos = useOrdenProductos(); 

  useEffect(() => {

  }, []);
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-text">© 2024 Flavor Fiesta. Todos los derechos reservados.</span>
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
