const express = require("express");

const AppointmentModel = require("../Models/appoinment.model");

const appoinmentRouter = express.Router();

appoinmentRouter.post("/create", async (req, res) => {
  const {
    name,
    image,
    specialization,
    experience,
    location,
    date,
    slots,
    fee,
  } = req.body;
  try {
    const appointment = new AppointmentModel({
      name,
      image,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    });
    await appointment.save();
    res.send({
      msg: "Congratulations! You have successfully posted the data.",
    });
  } catch (error) {
    console.log({
      msg: "Oops! Something went wrong in posting the data.",
      message: error.message,
    });
    res.status(500).send({ error: error.message });
  }
});

appoinmentRouter.get("/get", async (req, res) => {
  try {
    const { specialization, sort, search, page } = req.query;
    const perPage = 4;
    const skip = (page - 1) * perPage;

    const filter = {};
    if (specialization) {
      filter.specialization = specialization;
    }
    if (search) {
      filter.name = new RegExp(search, "i");
    }

    const sortobj = {};
    if (sort) {
      if (sort === "asc") {
        sortobj.date = 1;
      } else if (sort === "desc") {
        sortobj.date = -1;
      }
    }

    const appoinment = await AppointmentModel.find(filter)
      .sort(sortobj)
      .skip(skip)
      .limit(perPage)
      .exec();

    res.json({appoinment,success:true})
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = {
  appoinmentRouter,
};

