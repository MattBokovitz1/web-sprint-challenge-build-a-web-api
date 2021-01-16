const Project = require("../projects/projects-model");
const Action = require("../actions/actions-model");

async function validateProjectId(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json(`project with id ${id} not found`);
    }
  } catch (err) {
    res.status(500).json("ouch");
  }
}

function validateProject(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Please provide name and description" });
  } else {
    next();
  }
}

async function validateActionId(req, res, next) {
  try {
    const action = await Action.findById(req.params.id);
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(404).json(`action with id ${id} not found`);
    }
  } catch (err) {
    res.status(500).json("ouch");
  }
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
