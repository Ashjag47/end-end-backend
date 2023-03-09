/* eslint-disable no-unused-vars */
const { ContentType } = require("../../database/models");
const { HTTPError } = require("../utils/errors.js");
const { Entities } = require("../../database/models");

const getAllEntities = async (contentId) => {
  const content = await ContentType.findOne({
    where: {
      id: contentId,
    },
  });
  return content.getEntities();
};

const getAllEntitiesFields = async (contentId) => {
  const entity = await Entities.findOne({
    where: {
      contentId: contentId,
    },
  });
  const entityData = entity.entityFields;
  const fields = Object.keys(entityData);

  return fields;
};

const createEntity = async (contentId, data) => {
  const content = await ContentType.findOne({
    where: {
      id: contentId,
    },
  });
  const entity = await Entities.create(data);
  await content.addEntities(entity);
  return entity;
};

const deleteEntityById = async (entityId) => {
  await Entities.destroy({
    where: {
      id: entityId,
    },
  });
};

const getEntityById = async (id) => {
  const entity = await Entities.findOne({
    where: {
      id: id,
    },
  });
  if (entity == null) {
    throw new HTTPError(404, "Entity not found");
  }
  return entity;
};

const createEntityField = async (contentId, data) => {
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
    entityData = { ...entity.entityFields, ...data };
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

const deleteEntityField = async (contentId, data) => {
  data = data.field;
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
    entityData = { ...entity.entityFields };
    console.log("entityData", entityData);
    delete entityData[data];
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
  console.log("entityData", entityData);
  const fields = Object.keys(entityData);

  return fields;
};

const updateEntityById = async (id, data) => {
  const result = await Entities.update(data, {
    where: {
      id: id,
    },
    returning: true,
  });
  const affectedRows = result[0];
  if (affectedRows === 0) {
    throw new HTTPError(404, "Entity not found");
  }
  return result;
};
module.exports = {
  getAllEntities,
  createEntity,
  deleteEntityById,
  getEntityById,
  createEntityField,
  updateEntityById,
  getAllEntitiesFields,
  deleteEntityField,
};
