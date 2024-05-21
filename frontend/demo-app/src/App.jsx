import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [formData, setFormData] = useState({ field1: '', field2: '' });
    const [formDataList, setFormDataList] = useState([]);

    useEffect(() => {
        fetchFormData();
    }, []);

    const fetchFormData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/formData'
            );
            setFormDataList(response.data);
        } catch (error) {
            console.error('Error fetching form data:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (formData._id) {
                await handleUpdate(formData._id);
            } else {
                const response = await axios.post(
                    'http://localhost:5000/api/formData',
                    formData
                );
                setFormDataList([...formDataList, response.data]);
            }
            setFormData({ field1: '', field2: '' });
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/formData/${id}`,
                formData
            );
            const updatedFormDataList = formDataList.map((data) =>
                data._id === response.data._id ? response.data : data
            );
            setFormDataList(updatedFormDataList);
            setFormData({ field1: '', field2: '' });
        } catch (error) {
            console.error('Error updating form data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/formData/${id}`);
            const updatedFormDataList = formDataList.filter(
                (data) => data._id !== id
            );
            setFormDataList(updatedFormDataList);
        } catch (error) {
            console.error('Error deleting form data:', error);
        }
    };

    return (
        <div>
            <h1>Form Data App</h1>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="_id" value={formData._id} />
                <div>
                    <label>Field 1:</label>
                    <input
                        type="text"
                        name="field1"
                        value={formData.field1}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Field 2:</label>
                    <input
                        type="text"
                        name="field2"
                        value={formData.field2}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <ul>
                {formDataList.map((data) => (
                    <li key={data._id}>
                        {data.field1} - {data.field2}
                        <button onClick={() => setFormData(data)}>Edit</button>
                        <button onClick={() => handleDelete(data._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
