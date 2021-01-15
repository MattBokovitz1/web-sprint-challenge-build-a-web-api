const express = require("express");
const router = express.Router();

const Action = require("./actions-model");

router.get("/", (req, res) => {
  Action.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "Could not be retrieved" });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", validateAction, (req, res) => {
  Action.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "Error creating action" });
    });
});

router.put("/:id", [validateActionId, validateAction], (req, res) => {
  Action.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "Error updating action" });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  Action.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Action is deleted" });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "Error removing action" });
    });
});

// Middleware

function validateActionId(req, res, next) {
  Action.get(req.params.id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ message: "invalid action id" });
      }
    })
    .catch((error) => {
      console.log(error.message);
      req.status(500).json({ message: "Error retrieving action" });
    });
}

function validateAction(req, res, next) {
  if (!req.body.description || !req.body.project_id || !req.body.notes) {
    res
      .status(400)
      .json({ message: "Please provide description, project id, and notes" });
  } else {
    next();
  }
}

module.exports = router;
