const express = require("express");
const router = express.Router();

const Project = require("./projects-model");

router.get("/", (req, res) => {
  Project.get()
    .then((projects) => {
      console.log(projects);
      res.status(200).json(projects);
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

// Middleware

function validateProjectId(req, res, next) {
  Project.get(req.params.id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: "invalid project id" });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "Error retrieving project" });
    });
}

function validateProject(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Please provide name and description" });
  } else {
    next();
  }
}

module.exports = router;
