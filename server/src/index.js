import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Aurora Wellness API is running' });
});

app.get('/api/services', (_req, res) => {
  res.json([
    { slug: 'back-pain-therapy', name: 'Back Pain Therapy' },
    { slug: 'knee-rehab', name: 'Knee Rehab' },
    { slug: 'sports-injury-care', name: 'Sports Injury Care' }
  ]);
});

app.post('/api/appointments', (req, res) => {
  const { name, phone, email, concern } = req.body;
  if (!name || !phone || !email || !concern) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }
  res.status(201).json({ success: true, message: 'Appointment request received.' });
});

app.listen(PORT, () => {
  console.log(`Aurora Wellness server running on port ${PORT}`);
});
