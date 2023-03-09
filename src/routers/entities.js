const express = require("express");
const router = express.Router({ mergeParams: true });
const entitiesController = require("../controllers/entities");

router
  .route("/")
  .get(entitiesController.getAllEntities)
  .post(entitiesController.createEntity)
  .put(entitiesController.createEntityField);
router
  .route("/:entityId")
  .get(entitiesController.getEntityById)
  .put(entitiesController.updateEntityById)
  .delete(entitiesController.deleteEntityById);

module.exports = router;
