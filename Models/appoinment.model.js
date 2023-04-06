const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
  name: String,
  image: String,
  specialization: String,
  experience: Number,
  location: String,
  date: { type: Date, default: Date.now },
  slots: Number,
  fee: Number
})

const AppointmentModel = mongoose.model("Appointment", appointmentSchema)

module.exports = AppointmentModel