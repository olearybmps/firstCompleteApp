const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const formDataSchema = new mongoose.Schema({
    field1: String,
    field2: String,
});

const FormData = mongoose.model('FormData', formDataSchema);

app.get('/api/formData', async (req, res) => {
    try {
        const formDataList = await FormData.find();
        res.json(formDataList);
    } catch (error) {
        console.error('Error retrieving form data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/formData', async (req, res) => {
    try {
        const { field1, field2 } = req.body;
        const formData = new FormData({ field1, field2 });
        await formData.save();
        res.status(201).json(formData);
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/formData/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { field1, field2 } = req.body;
        const formData = await FormData.findByIdAndUpdate(
            id,
            { field1, field2 },
            { new: true }
        );
        res.json(formData);
    } catch (error) {
        console.error('Error updating form data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/formData/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { field1, field2 } = req.body;
        const formData = await FormData.findByIdAndUpdate(
            id,
            { field1, field2 },
            { new: true }
        );
        res.json(formData);
    } catch (error) {
        console.error('Error updating form data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/formData/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await FormData.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting form data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
