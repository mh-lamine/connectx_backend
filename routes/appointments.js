const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointments");

// getting all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// getting a single appointment
router.get("/:id", getAppointment, (req, res) => {
  res.json(res.appointment);
});

// creating an appointment
router.post("/", async (req, res) => {
  const appointment = new Appointment({
    name: req.body.name,
    service: req.body.service,
  });
  try {
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// updating an appointment
router.patch("/:id", getAppointment, async (req, res) => {
  if (req.body.name != null) {
    res.appointment.name = req.body.name;
  }
  if (req.body.service != null) {
    res.appointment.service = req.body.service;
  }
  try {
    const updatedAppointment = await res.appointment.save();
    res.json(updatedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// deleting an appointment
router.delete("/:id", getAppointment, async (req, res) => {
  try{
    await res.appointment.deleteOne();
    res.json({message: "Deleted Appointment"});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

async function getAppointment(req, res, next) {
  let appointment;
  try {
    appointment = await Appointment.findById(req.params.id);
    if (appointment == null) {
      return res.status(404).json({ message: "Cannot find appointment" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.appointment = appointment;
  next();
}

module.exports = router;
