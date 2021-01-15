const Project = require("../projects/projects-model");
const Action = require("../actions/actions-model");

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

module.exports = {
  validateAction,
  validateActionId,
  validateProject,
  validateProjectId,
};
