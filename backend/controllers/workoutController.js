// create a bunch of functions that we can reference in the routes file
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}
// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params
    // verify that the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }
    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json(workout)
}

// create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields.', emptyFields})
    }
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    // verify that the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }
    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json(workout)
}
// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    const { title, load, reps} = req.body
    // verify that the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body // spread the request body on this object
    })

    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json(workout)
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
}