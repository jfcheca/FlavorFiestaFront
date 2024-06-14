
import hero from '../../assets/hero.png';
import './about.css'
import about1 from '../../assets/about1.png';
import about2 from '../../assets/about2.png';

const About = () => {
    return ( 
        <div>
            <main>
                <img src={hero} alt="hero" className='hero'/>
            </main>
            <div className='sectionabout'>
                <div className='about'>
                    <h1 className='title'> 
                    Nuestra Historia
                    </h1>
                    <p className='text'>
                    En <b>Flavor Fiesta</b>, nos apasiona llevar la frescura y el sabor de las mejores frutas a tus manos en cada lata. Comenzamos con la visión de ofrecer bebidas únicas y refrescantes que no solo satisfagan la sed, sino que también ofrezcan una experiencia deliciosa y memorable. Nos esforzamos por combinar ingredientes naturales y saludables con procesos innovadores para crear una amplia gama de opciones para todos los gustos.
                    </p>
                </div>
                <div className='image'> 
                    <img src={about1} alt="hero"/>
                    <img src={about2} alt="hero"/>
                </div>
            </div>
            <div className='contador'>
                <div className='data'>
                    <h6  className='number'>
                        800
                    </h6>
                    <p className='textdata'>
                        Clientes felices
                    </p>
                </div>
                <div  className='data'>
                    <h6 className='number'> 
                        250
                    </h6>
                    <p className='textdata'>
                        Envios diarios
                    </p>
                </div>
                <div  className='data'>
                    <h6  className='number'>
                        1.500
                    </h6>
                    <p className='textdata'>
                        Bebidas vendidas
                    </p>
                </div>
                <div  className='data'>
                    <h6  className='number'>
                        15
                    </h6>
                    <p className='textdata'>
                        Ciudades
                    </p>
                </div>
            </div>
            <div className='footer-title'>
            ¡Descubre la frescura y la diversión en cada lata! 
            </div>

        </div>
    );
};

export default About;
