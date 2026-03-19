import Project from "../models/Project.js";

const allowedProjectStatuses = ["active", "completed", "archived"];

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAllProjects();

    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (error) {
    console.error("getProjects error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findProjectById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: project,
    });
  } catch (error) {
    console.error("getProjectById error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, status } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }

    if (status && !allowedProjectStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid project status. Allowed values: ${allowedProjectStatuses.join(", ")}`,
      });
    }

    const payload = {
      name: name.trim(),
      description: description?.trim() || null,
      startDate: startDate || null,
      endDate: endDate || null,
      status: status || "active",
      createdBy: req.user?.id || null,
    };

    const newProject = await Project.createProject(payload);

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error) {
    console.error("createProject error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

export const updateProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !allowedProjectStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid project status. Allowed values: ${allowedProjectStatuses.join(", ")}`,
      });
    }

    const existingProject = await Project.findProjectById(id);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const updatedProject = await Project.updateProjectStatus(id, status);

    return res.status(200).json({
      success: true,
      message: "Project status updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("updateProjectStatus error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update project status",
    });
  }
};