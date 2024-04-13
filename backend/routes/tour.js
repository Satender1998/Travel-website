import express from "express"
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from "../controllers/tourControllers.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

// create new tour
router.post("/", verifyAdmin, createTour)

// update tour
router.put("/:id",verifyAdmin, updateTour);

// delete Tour
router.delete("/:id",verifyAdmin, deleteTour);

// get single Tour
router.get("/:id", getSingleTour);

// create all tour
router.get("/", getAllTour);

// get tour by search
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTours", getFeaturedTour);
router.get("/search/getTourCount", getTourCount)


export default router