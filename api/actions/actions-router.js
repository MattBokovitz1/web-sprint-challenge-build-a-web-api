const express = require("express");
const router = express.Router();

const Action = require("./actions-model");
const {
  validateAction,
  validateActionId,
} = require("../middleware/middleware");

router.get("/", (req, res) => {
  Action.get(req.query)
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

module.exports = router;
