import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; // Importa axios para hacer peticiones HTTP
import './MisPedidos.css'; // Importa el archivo de estilos CSS específico para MisPedidos
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import API_BASE_URL from "../../config";
import { AuthContext } from '../AuthContext/AuthContext';

const MisPedidos = () => {
    const { usuario } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Realiza la llamada a la API para obtener los pedidos del usuario 1 con estado diferente a 1
                const response = await axios.get(`${API_BASE_URL}/ordenes/user/${usuario.id}/estado-diferente-a-1`);
                
                // Formatea la fecha antes de actualizar el estado
                const formattedOrders = response.data.data.map(order => ({
                    ...order,
                    fechaOrden: formatFecha(order.fechaOrden) // Ajusta la propiedad a fechaOrden
                }));

                setOrders(formattedOrders); // Actualiza el estado con los datos formateados
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders(); // Llama a la función para obtener los pedidos al montar el componente
    }, []); // [] asegura que useEffect solo se ejecute una vez al montar el componente

    // Función para formatear la fecha
    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const anio = date.getFullYear();
        return `${dia}-${mes}-${anio}`;
    };

    return (
        <div className="orders-container">
            <h1>Historial de Pedidos</h1>
            <div className="orders-table">
                <table>
                    <thead>
                        <tr>
                            <th>Orden</th>
                            <th>Fecha de Compra</th>
                            <th>Estado de Pago</th>
                            <th>Total del Pedido</th>
                            <th>Pedido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.fechaOrden}</td>
                                <td>Pagado</td>
                                <td>${order.total}</td>
                                <td>
                                    <Link to={`/mispedidos/${order.id}`}>Ver pedido</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MisPedidos;
