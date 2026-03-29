import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCar, updateCar } from '../../services/CarsAPI'
import { MAKES, MODELS, COLOR_OPTIONS, WHEEL_OPTIONS, ENGINE_OPTIONS, INTERIOR_OPTIONS } from '../utilities/options.js'
import { calcTotalPrice } from '../utilities/calcPrice.js'
import { validateCombination } from '../utilities/validation.js'
import '../App.css'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [form, setForm] = useState(null)

    useEffect(() => {
        const fetchCar = async () => {
            const data = await getCar(id)
            setForm({
                make:     data.make,
                model:    data.model,
                color:    data.color,
                wheels:   data.wheels,
                engine:   data.engine,
                interior: data.interior,
            })
        }
        fetchCar()
    }, [id])

    if (!form) return <div className='page'><p>Loading...</p></div>

    const selectedColor = COLOR_OPTIONS.find(c => c.value === form.color) || COLOR_OPTIONS[0]
    const price = calcTotalPrice(form)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationError = validateCombination(form)
        if (validationError) {
            setError(validationError)
            return
        }
        await updateCar(id, { ...form, price })
        navigate(`/customcars/${id}`)
    }

    return (
        <div className='page'>
            <h2>Edit Your Car</h2>

            <div className='car-preview' style={{ backgroundColor: selectedColor.hex }}>
                🚗
            </div>

            <form onSubmit={handleSubmit} className='car-form'>
                <label>Make
                    <select name='make' value={form.make} onChange={handleChange}>
                        {MAKES.map(m => <option key={m}>{m}</option>)}
                    </select>
                </label>

                <label>Model
                    <select name='model' value={form.model} onChange={handleChange}>
                        {MODELS.map(m => <option key={m}>{m}</option>)}
                    </select>
                </label>

                <label>Color
                    <select name='color' value={form.color} onChange={handleChange}>
                        {COLOR_OPTIONS.map(c => (
                            <option key={c.value} value={c.value}>{c.label} (+${c.price.toLocaleString()})</option>
                        ))}
                    </select>
                </label>

                <label>Wheels
                    <select name='wheels' value={form.wheels} onChange={handleChange}>
                        {WHEEL_OPTIONS.map(w => (
                            <option key={w.value} value={w.value}>{w.label} (+${w.price.toLocaleString()})</option>
                        ))}
                    </select>
                </label>

                <label>Engine
                    <select name='engine' value={form.engine} onChange={handleChange}>
                        {ENGINE_OPTIONS.map(e => (
                            <option key={e.value} value={e.value}>{e.label} (+${e.price.toLocaleString()})</option>
                        ))}
                    </select>
                </label>

                <label>Interior
                    <select name='interior' value={form.interior} onChange={handleChange}>
                        {INTERIOR_OPTIONS.map(i => (
                            <option key={i.value} value={i.value}>{i.label} (+${i.price.toLocaleString()})</option>
                        ))}
                    </select>
                </label>

                {error && <p className='error'>{error}</p>}

                <p className='price'>Total Price: ${price.toLocaleString()}</p>

                <div className='card-actions'>
                    <button type='submit'>Save Changes</button>
                    <button type='button' onClick={() => navigate(`/customcars/${id}`)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditCar
