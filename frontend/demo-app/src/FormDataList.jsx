import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormDataList = () => {
    const [formDataList, setFormDataList] = useState([]);

    useEffect(() => {
        fetchFormData();
    }, []);

    const fetchFormData = async () => {
        try {
            const response = await axios.get('/api/formData');
            setFormDataList(response.data);
        } catch (error) {
            console.error('Error fetching form data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/formData/${id}`);
            setFormDataList(
                formDataList.filter((formData) => formData._id !== id)
            );
        } catch (error) {
            console.error('Error deleting form data:', error);
        }
    };

    return (
        <div>
            <h2>Form Data List</h2>
            <ul>
                {formDataList.map((formData) => (
                    <li key={formData._id}>
                        <span>{formData.field1}</span> -{' '}
                        <span>{formData.field2}</span>
                        <button onClick={() => handleDelete(formData._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FormDataList;
