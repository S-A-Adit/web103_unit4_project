import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCars, deleteCar } from '../../services/CarsAPI'
import '../App.css'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCars = async () => {
            const data = await getAllCars()
            setCars(data)
        }
        fetchCars()
    }, [])

    const handleDelete = async (id) => {
        await deleteCar(id)
        setCars(cars.filter(car => car.id !== id))
    }

    return (
        <div className='page'>
            <h2>Custom Cars</h2>
            {cars.length === 0 ? (
                <p>No cars yet. <a href='/'>Build one!</a></p>
            ) : (
                <div className='car-list'>
                    {cars.map(car => (
                        <div key={car.id} className='car-card'>
                            <h3>{car.make} {car.model}</h3>
                            <p>Color: {car.color}</p>
                            <p>Engine: {car.engine}</p>
                            <p>Price: ${Number(car.price).toLocaleString()}</p>
                            <div className='card-actions'>
                                <button onClick={() => navigate(`/customcars/${car.id}`)}>View</button>
                                <button onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
                                <button onClick={() => handleDelete(car.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewCars
