const express = require("express");
const contentController = require("../controllers/content");
const router = express.Router();

router.get("/", contentController.getAllContents);
router.get("/:contentId", contentController.getContentById);
router.post("/", contentController.createContent);
router.put("/:contentId", contentController.updateContent);
router.delete("/:contentId", contentController.deleteContent);

module.exports = router;
