import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCar, deleteCar } from '../../services/CarsAPI'
import '../App.css'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)

    useEffect(() => {
        const fetchCar = async () => {
            const data = await getCar(id)
            setCar(data)
        }
        fetchCar()
    }, [id])

    const handleDelete = async () => {
        await deleteCar(id)
        navigate('/customcars')
    }

    if (!car) return <div className='page'><p>Loading...</p></div>

    return (
        <div className='page'>
            <h2>{car.make} {car.model}</h2>
            <ul className='details-list'>
                <li><strong>Color:</strong> {car.color}</li>
                <li><strong>Wheels:</strong> {car.wheels}</li>
                <li><strong>Engine:</strong> {car.engine}</li>
                <li><strong>Interior:</strong> {car.interior}</li>
                <li><strong>Price:</strong> ${Number(car.price).toLocaleString()}</li>
            </ul>
            <div className='card-actions'>
                <button onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => navigate('/customcars')}>Back</button>
            </div>
        </div>
    )
}

export default CarDetails
