const contentService = require("../services/content");
const { HTTPError } = require("../utils/errors.js");

const getAllContents = async (req, res) => {
  try {
    const contents = await contentService.getAllContents();
    console.log(contents);
    res.status(200).send(contents);
  } catch (err) {
    if (err instanceof HTTPError)
      return res.status(err.statusCode).json({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};

const createContent = async (req, res) => {
  try {
    const content = await contentService.createContent(req.body);
    res.status(201).send(content);
  } catch (err) {
    if (err instanceof HTTPError)
      return res.status(err.statusCode).json({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};

const getContentById = async (req, res) => {
  try {
    const content = await contentService.getContentById(req.params.contentId);
    res.status(200).send(content);
  } catch (err) {
    if (err instanceof HTTPError)
      return res.status(err.statusCode).json({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};

const updateContent = async (req, res) => {
  try {
    const content = await contentService.updateContent(
      req.params.contentId,
      req.body
    );
    res.status(200).send(content);
  } catch (err) {
    if (err instanceof HTTPError)
      return res.status(err.statusCode).json({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};

const deleteContent = async (req, res) => {
  try {
    await contentService.deleteContent(req.params.contentId);
    res.status(204).send();
  } catch (err) {
    if (err instanceof HTTPError)
      return res.status(err.statusCode).json({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllContents,
  createContent,
  getContentById,
  updateContent,
  deleteContent,
};
