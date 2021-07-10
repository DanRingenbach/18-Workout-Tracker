// routes need to be written for
// /
// /exercise
// /stats
const router = require("express").Router();
const Workout = require("../models/workout");

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/api/workouts", (req, res) => {
  Workout.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(error);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(req.params.id, { $push: {exercises: req.body} })
  .then((data) => {
    res.json(data)
  })
  .catch((err) => {
      res.json(error)
  })
});


router.get("/api/workouts/range", (req,res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        },
    ])
    .limit(7)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json(error)
    })
})


module.exports = router;
