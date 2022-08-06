const Workout = require('../models/workoutModel')
//need this to get the valid single id
const mongoose = require('mongoose')

//get all workouts

const getWorkouts = async (req, res) => {
    //thisshows the new response at the top
    const workouts = await Workout.find({}).sort({createdAt: -1})
res.status(200).json(workouts)
}

//get a single workout


const getWorkout = async (req, res) => {
const { id } = req.params

//Check the valid id from mongodb 
if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(404).json({error: 'No such workout'})

}

  //this shows the new response at the top
  const workout = await Workout.findById(id)
//if there is no workout id found
  if (!workout){
    return res.status(404).json({error: 'No such workout'})
  }

  //if we found the workout it get the response
  res.status(200).json(workout)
}

//create a new workout
const createWorkout = async(req, res) =>{
//add document to the database
    const {title, load, reps} = req.body
    try {
      const workout = await Workout.create({title, load, reps})
      res.status(200).json(workout)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
    
}



//delete a workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params
  
  //Check the valid id from mongodb 
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such workout'})
  
  }
  
    //this shows the new response at the top
    const workout = await Workout.findOneAndDelete({_id: id})
  //if there is no workout id found
    if (!workout){
      return res.status(404).json({error: 'No such workout'})
    }
  
    //if we found the workout it get the response
    res.status(200).json(workout)
  }

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params
  
  //Check the valid id from mongodb 
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such workout'})
  
  }
  
    //this shows the new response at the top
    const workout = await Workout.findByIdAndUpdate({_id: id}, {
//spred the properties of the body here to update the document
...req.body
    })

    
  //if there is no workout id found
    if (!workout){
      return res.status(404).json({error: 'No such workout'})
    }
  
    //if we found the workout it get the response
    res.status(200).json(workout)
  }





module.exports = {
  getWorkout,
  getWorkouts,
  createWorkout,
  deleteWorkout ,
  updateWorkout
}
