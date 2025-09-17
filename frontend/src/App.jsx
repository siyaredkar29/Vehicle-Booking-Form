



import React, { useState, useEffect } from 'react';
import {
  Stepper, Step, StepLabel, Button,
  TextField, Radio, RadioGroup, FormControlLabel,
  FormControl, FormLabel, Card, Box
} from '@mui/material';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import './form.css';

const steps = ['Name', 'Wheels', 'Vehicle Type', 'Vehicle', 'Date Range'];

const App = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [wheels, setWheels] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicleType, setVehicleType] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);

  // Fetch vehicle types
  useEffect(() => {
    if (wheels) {
      axios.get(`http://localhost:3001/vehicle-types?wheels=${wheels}`)
        .then(res => setVehicleTypes(res.data))
        .catch(err => console.error(err));
      setVehicleType('');
      setVehicles([]);
      setVehicle('');
    }
  }, [wheels]);

  // Fetch vehicles
  useEffect(() => {
    if (vehicleType) {
      axios.get(`http://localhost:3001/vehicles?typeId=${vehicleType}`)
        .then(res => setVehicles(res.data))
        .catch(err => console.error(err));
      setVehicle('');
    }
  }, [vehicleType]);

  const handleNext = () => {
    if (activeStep === 0 && (!firstName || !lastName)) return alert('Please enter your name');
    if (activeStep === 1 && !wheels) return alert('Please select wheels');
    if (activeStep === 2 && !vehicleType) return alert('Please select vehicle type');
    if (activeStep === 3 && !vehicle) return alert('Please select vehicle model');
    if (activeStep === 4 && (!dateRange[0] || !dateRange[1])) return alert('Please select dates');

    if (activeStep === steps.length - 1) handleSubmit();
    else setActiveStep(prev => prev + 1);
  };

  const handleBack = () => setActiveStep(prev => prev - 1);

  const handleSubmit = async () => {
    const payload = {
      firstName,
      lastName,
      vehicleId: Number(vehicle),
      startDate: dateRange[0]?.format('YYYY-MM-DD'),
      endDate: dateRange[1]?.format('YYYY-MM-DD'),
    };

    try {
      const res = await axios.post('http://localhost:3001/bookings', payload);
      alert(res.data.message || 'Booking successful!');
      // reset form
      setActiveStep(0);
      setFirstName('');
      setLastName('');
      setWheels('');
      setVehicleType('');
      setVehicles([]);
      setVehicle('');
      setDateRange([null, null]);
    } catch (err) {
      alert(err.response?.data?.error || 'Booking failed');
    }
  };

  const stepContent = [
    
    <Box className="multi-step-content name-fields" key="step1">
      <TextField label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} fullWidth margin="normal" />
      <TextField label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} fullWidth margin="normal" />
    </Box>,

    
    <FormControl className="multi-step-content" key="step2">
      <FormLabel>Number of Wheels</FormLabel>
      <RadioGroup value={wheels} onChange={e => setWheels(e.target.value)} className="radio-group">
        <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
        <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
      </RadioGroup>
    </FormControl>,

    
    <FormControl className="multi-step-content" key="step3">
      <FormLabel>Select Vehicle Type</FormLabel>
      <RadioGroup value={vehicleType} onChange={e => setVehicleType(e.target.value)} className="radio-group">
        {vehicleTypes.map(type => (
          <FormControlLabel key={type.id} value={type.id} control={<Radio />} label={type.name} />
        ))}
      </RadioGroup>
    </FormControl>,

    <FormControl className="multi-step-content" key="step4">
      <FormLabel>Select Vehicle</FormLabel>
      <RadioGroup value={vehicle} onChange={e => setVehicle(e.target.value)} className="radio-group">
        {vehicles.map(v => (
          <FormControlLabel key={v.id} value={v.id} control={<Radio />} label={v.name} />
        ))}
      </RadioGroup>
    </FormControl>,

    <LocalizationProvider dateAdapter={AdapterDayjs} key="step5">
      <Box className="multi-step-content date-picker-group">
        <DatePicker
          label="Start Date"
          value={dateRange[0]}
          onChange={(newValue) => setDateRange([newValue, dateRange[1]])}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <DatePicker
          label="End Date"
          value={dateRange[1]}
          onChange={(newValue) => setDateRange([dateRange[0], newValue])}
          fullWidth
        />
      </Box>
    </LocalizationProvider>
  ];

  return (
    <div className="form-container">
      <h1 className="form-title">Vehicle Booking Form</h1>
      <p className="form-subtitle">Please fill in your details to proceed with your booking</p>

      <Card className="multi-step-card">
        <Stepper activeStep={activeStep} alternativeLabel className="multi-step-stepper">
          {steps.map(label => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>

        {stepContent[activeStep]}

        <Box className="multi-step-buttons" sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default App;
