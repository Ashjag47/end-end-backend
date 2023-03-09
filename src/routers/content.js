const express = require("express");
const contentController = require("../controllers/content");
const entitiesRoutes = require("./entities");
const router = express.Router();
const entitiesController = require("../controllers/entities");

router.get("/", contentController.getAllContents);
router.get("/:contentId", contentController.getContentById);
router.post("/", contentController.createContent);
router.put("/:contentId", contentController.updateContent);
router.delete("/:contentId", contentController.deleteContent);

router.route("/:contentId/fields").get(entitiesController.getAllEntitiesFields);

router.use("/:contentId/entities", entitiesRoutes);

module.exports = router;
