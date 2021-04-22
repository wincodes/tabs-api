const Validator = require("validatorjs");
const Tabs = require("../models/tabs");

const createTab = async (req, res) => {
  try {
    const rules = {
      name: "required|string",
      description: "required|string",
      dataPoints: "required|array",
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(400).json({
        status: "failed",
        message: "Validation Failed",
        errors: validation.errors.all(),
      });
    }

    const { name, description, dataPoints } = req.body;

    const tab = new Tabs({
      name,
      description,
      dataPoints,
    });
    await tab.save();

    return res.status(201).json({
      status: "success",
      message: "Tab Created",
      tab,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

const updateTab = async (req, res) => {
  try {
    const rules = {
      name: "required|string",
      description: "required|string",
      dataPoints: "required|array",
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(400).json({
        status: "failed",
        message: "Validation Failed",
        errors: validation.errors.all(),
      });
    }

    const { name, description, dataPoints } = req.body;
    const { tabId } = req.params;

    const tab = await Tabs.findById(tabId);

    if (tab === null) {
      return res.status(404).json({
        status: "failed",
        message: "Tab Not Found",
      });
    }

    tab.name = name;
    tab.description = description;
    tab.dataPoints = dataPoints;
    await tab.save();

    return res.status(201).json({
      status: "success",
      message: "Tab Updated",
      tab,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

const getTabs = async (req, res) => {
  try {
    const tabs = await Tabs.find();

    return res.status(201).json({
      status: "success",
      message: "Tab Retrieved",
      tabs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

const deleteTab = async (req, res) => {
  try {
    const { tabId } = req.params;

    const tab = await Tabs.findById(tabId);

    if (tab === null) {
      return res.status(404).json({
        status: "failed",
        message: "Tab Not Found",
      });
    }

    await tab.delete();

    return res.status(201).json({
      status: "success",
      message: "Tab Deleted"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

module.exports = { createTab, updateTab, getTabs, deleteTab };
