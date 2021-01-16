const express = require("express");
const router = express.Router();

const Project = require("./projects-model");

const {
  validateProject,
  validateProjectId,
} = require("../middleware/middleware");

router.get("/", (req, res) => {
  Project.get(req.query)
    .then((project) => {
      res.json(project);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "Projects could not be retrieved" });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  Project.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      console.log(error.message);
      res
        .status(500)
        .json({ message: "Project actions could not be retrieved" });
    });
});

router.post("/", validateProject, (req, res) => {
  Project.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "Error creating project" });
    });
});

router.put("/:id", [validateProjectId, validateProject], (req, res) => {
  Project.update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "Error updating project" });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  Project.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "The project is removed" });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "Error removing project" });
    });
});

module.exports = router;
