const express = require('express')
const {
    createWorkout, 
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
} = require('../controllers/workoutController')

const router = express.Router()

// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
// colon represents a parameter
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)


// export the router
module.exports = router