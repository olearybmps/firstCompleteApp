import React, { useState } from 'react';
import axios from 'axios';

const FormDataForm = ({ onSubmit }) => {
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/formData', {
                field1,
                field2,
            });
            onSubmit(response.data);
            setField1('');
            setField2('');
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="field1">Field 1:</label>
                <input
                    type="text"
                    id="field1"
                    value={field1}
                    onChange={(e) => setField1(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="field2">Field 2:</label>
                <input
                    type="text"
                    id="field2"
                    value={field2}
                    onChange={(e) => setField2(e.target.value)}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormDataForm;
