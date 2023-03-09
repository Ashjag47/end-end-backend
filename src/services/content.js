const { ContentType } = require("../../database/models");
const { HTTPError } = require("../utils/errors.js");

const getAllContents = async () => {
  const content = await ContentType.findAll({});
  return content;
};

const createContent = async (data) => {
  const content = await ContentType.create(data);
  return content;
};

const getContentById = async (id) => {
  const content = await ContentType.findOne({
    where: {
      id: id,
    },
    include: "Entities",
  });
  if (content == null) {
    throw new HTTPError(404, "List not found");
  }
  return content;
};

const updateContent = async (id, data) => {
  const result = await ContentType.update(data, {
    where: {
      id: id,
    },
    returning: true,
  });
  const affectedRows = result[0];
  if (affectedRows === 0) {
    throw new HTTPError(404, "List not found");
  }
  return result;
};

const deleteContent = async (id) => {
  await ContentType.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getAllContents,
  createContent,
  getContentById,
  updateContent,
  deleteContent,
};
