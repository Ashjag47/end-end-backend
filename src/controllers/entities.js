const entitiesServices = require("../services/entities");
const { HTTPError } = require("../utils/errors.js");

const getAllEntities = async (req, res) => {
  try {
    const contentId = req.params.contentId;
    const entities = await entitiesServices.getAllEntities(contentId);
    res.status(200);
    res.send(entities);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).send({ msg: err.message });
    } else {
      res.status(500).send({ msg: err.message });
    }
  }
};

const getAllEntitiesFields = async (req, res) => {
  try {
    const contentId = req.params.contentId;
    const entitiesFields = await entitiesServices.getAllEntitiesFields(
      contentId
    );
    res.status(200);
    res.send(entitiesFields);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).send({ msg: err.message });
    } else {
      res.status(500).send({ msg: err.message });
    }
  }
};

const deleteEntityField = async (req, res) => {
  try {
    const contentId = req.params.contentId;
    const data = req.body;
    const entitiesFields = await entitiesServices.deleteEntityField(
      contentId,
      data
    );
    res.status(204).send(entitiesFields);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).send({ msg: err.message });
    } else {
      res.status(500).send({ msg: err.message });
    }
  }
};

const createEntity = async (req, res) => {
  try {
    const data = req.body;
    const contentId = req.params.contentId;
    const entityCreated = await entitiesServices.createEntity(contentId, data);
    console.log(entityCreated);
    res.status(201).send(entityCreated);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).send({ msg: err.message });
    } else {
      res.status(500).send({ msg: err.message });
    }
  }
};
const deleteEntityById = async (req, res) => {
  try {
    await entitiesServices.deleteEntityById(req.params.entityId);
    res.status(204).send({ msg: "Deleted the entity" });
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).send({ msg: err.message });
    } else {
      res.status(500).send({ msg: err.message });
    }
  }
};

const getEntityById = async (req, res) => {
  try {
    const entity = await entitiesServices.getEntityById(req.params.entityId);
    res.status(200).send(entity);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).send({ msg: err.message });
    } else {
      res.status(500).send({ msg: err.message });
    }
  }
};

const createEntityField = async (req, res) => {
  try {
    const data = req.body;
    const contentId = req.params.contentId;
    const entityFieldCreated = await entitiesServices.createEntityField(
      contentId,
      data
    );
    res.status(201).send(entityFieldCreated);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).send({ msg: err.message });
    } else {
      res.status(500).send({ msg: err.message });
    }
  }
};

const updateEntityById = async (req, res) => {
  const id = req.params.entityId;
  try {
    const updatedEntity = await entitiesServices.updateEntityById(id, req.body);
    res.status(200).send(updatedEntity);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).send({ msg: err.message });
    } else {
      res.status(500).send({ msg: "Something went wrong" });
    }
  }
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
