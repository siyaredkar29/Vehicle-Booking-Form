const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.get('/vehicle-types', async (req, res) => {
  try {
    const { wheels } = req.query;
    const where = wheels ? { wheels } : {};
    const types = await db.VehicleType.findAll({ where });
    res.json(types);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
});

app.get('/vehicles', async (req, res) => {
  try {
    const { typeId } = req.query;
    if (!typeId) return res.status(400).json({ error: 'typeId required' });

    const vehicles = await db.Vehicle.findAll({ where: { typeId } });
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

app.post('/bookings', async (req, res) => {
  try {
    const { firstName, lastName, vehicleId, startDate, endDate } = req.body;

    if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    
    const overlap = await db.Booking.findOne({
      where: {
        vehicleId,
        startDate: { [db.Sequelize.Op.lte]: end },
        endDate: { [db.Sequelize.Op.gte]: start },
      },
    });

    if (overlap) {
      return res.status(400).json({ error: 'Vehicle already booked for selected dates' });
    }

    
    const vehicle = await db.Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    const booking = await db.Booking.create({
      firstName,
      lastName,
      vehicleId,
      vehicleName: vehicle.name, 
      startDate: start,
      endDate: end,
    });

    res.status(200).json({ message: 'Booking created successfully', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});


const PORT = 3001;
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  try {
    await db.sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
});
