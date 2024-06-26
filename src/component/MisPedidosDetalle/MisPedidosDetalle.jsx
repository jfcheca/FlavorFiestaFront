import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import './MisPedidosDetalle.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import API_BASE_URL from "../../config";

// Importar la imagen desde la ruta específica
import logoImg from '../../assets/logoo.png';

const MisPedidosDetalle = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [orderProducts, setOrderProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const orderDetailsRef = useRef(null); // Referencia al contenedor de los detalles del pedido

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/informacionCompra/informacionCompleta/orden/${orderId}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del pedido');
                }
                const data = await response.json();
                setOrder(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchOrderProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/ordenProductos/orden/${orderId}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los productos del pedido');
                }
                const data = await response.json();
                setOrderProducts(data.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchOrder(), fetchOrderProducts()]);
            setLoading(false);
        };

        fetchData();
    }, [orderId]);

    const formattedDate = order ? new Date(order.orden.fechaOrden).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }) : '';

    const handlePrintOrder = () => {
        const input = orderDetailsRef.current;

        // Crear el documento PDF
        const pdf = new jsPDF();

        // Agregar imagen al inicio del PDF desde la importación
        pdf.addImage(logoImg, 'PNG', 10, 10, 50, 20); // Ajusta las coordenadas y dimensiones según necesites

        // Agregar texto adicional
        const additionalText = '¡Descubre la frescura y la diversión en cada lata!';
        pdf.setTextColor('#CC2D4A'); // Establecer el color del texto
        pdf.text(additionalText, 10, 40); // Ajusta las coordenadas según necesites

        // Convertir el contenido del contenedor a imagen y agregar al PDF
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 210;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 60, imgWidth, imgHeight); // Ajusta las coordenadas según necesites
                pdf.save(`pedido-${orderId}.pdf`);
            })
            .catch((error) => {
                console.error('Error al generar PDF:', error);
            });
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!order || orderProducts.length === 0) {
        return <p>No se pudo cargar la información del pedido</p>;
    }

    const subtotal = orderProducts.reduce((acc, item) => acc + item.total, 0);

    return (
        <div className="order-details" ref={orderDetailsRef}>
            <div className="order-summary">
                <h2>Orden: #{order.orden.id}</h2>
                <p>Fecha: {formattedDate}</p>
                <div className="print-order">
                    <button onClick={handlePrintOrder}>
                        <p>Imprimir pedido</p>
                        <FontAwesomeIcon icon={faPrint} className="print-icon" />
                    </button>
                </div>
            </div>

            <div className="order-items">
                <h3>Resumen del Pedido</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderProducts.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <img
                                        src={item.producto.imagenes[0].url}
                                        alt={item.producto.nombre}
                                        className="order-item-img"
                                    />
                                </td>
                                <td>{item.producto.nombre}</td>
                                <td>{item.cantidad}</td>
                                <td>${item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3" className="subtotal-label">
                                Subtotal:
                            </td>
                            <td>${subtotal}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="purchase-info">
                <h3>Información de la compra:</h3>
                <div className="purchase-details">
                    <div className="section">
                        <h4>Datos personales y dirección:</h4>
                        <p>
                            <strong>Nombre:</strong> {order.datos_envio.nombre}
                        </p>
                        <p>
                            <strong>Dirección:</strong> {order.datos_envio.direccion}
                        </p>
                        <p>
                            <strong>Apartamento:</strong> {order.datos_envio.apartamento}
                        </p>
                        <p>
                            <strong>Ciudad:</strong> {order.datos_envio.ciudad}
                        </p>
                        <p>
                            <strong>Código Postal:</strong> {order.datos_envio.codigo_postal}
                        </p>
                    </div>
                </div>
            </div>

            <div className="payment-info">
                <div className="payment-details">
                    <div className="section">
                        <h4>Método de pago:</h4>
                        <p>
                            <strong>Nombre:</strong> {order.tarjeta.nombre}
                        </p>
                        <p>
                            <strong>Número de tarjeta:</strong> xxxxxxxxxxxx
                            {order.tarjeta.ultimos_cuatro_digitos}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MisPedidosDetalle;
