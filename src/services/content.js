/* eslint-disable no-unused-vars */
const { ContentType } = require("../../database/models");
const { HTTPError } = require("../utils/errors.js");
const { Entities } = require("../../database/models");

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

const updateEntityFields = async (contentId, data) => {
  const newkey = data.newkey;
  const old = data.old;
  const ids = await Entities.findAll({
    where: {
      contentId: contentId,
    },
    attributes: ["id"],
  });
  let entityData = {};
  const idsArray = ids.map((id) => id.id);
  idsArray.forEach(async (id) => {
    let entity = await Entities.findOne({
      where: {
        id: id,
      },
    });
    let oldData = entity.entityFields[old];
    console.log("oldData", oldData);
    //let data = { newkey: oldData };
    entityData = { ...entity.entityFields };
    console.log("entityData", entityData);
    entityData[newkey] = oldData;
    delete entityData[old];
    await Entities.update(
      { entityFields: entityData },
      {
        where: {
          id: id,
        },
        returning: true,
      }
    );
  });

  const entity = await Entities.findOne({
    where: {
      id: idsArray[0],
    },
  });
  entityData = entity.entityFields;
  const fields = Object.keys(entityData);

  return fields;
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
  updateEntityFields,
};
