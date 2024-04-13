
import Booking from "../models/Booking.js"

export const createBooking = async(req, res) => {
    const newBooking = new Booking(req.body);
    console.log(newBooking);

    try {
        const savedBooking = await newBooking.save();
        
        res.status(200).json({
            success: true,
            message: "Your tour is booked",
            data: savedBooking,
        })
    } catch (error) {
        res.status(500).json({ success: true, message:"internal server error" });
    }
}

// import Booking from "../models/Booking.js";

// export const createBooking = async (req, res) => {
//     try {
//         // Parse JSON data from request body
//         const bookingData = req.body;

//         // Create a new Booking instance with parsed data
//         const newBooking = new Booking(bookingData);

//         // Save the new booking to the database
//         const savedBooking = await newBooking.save();

//         // Respond with success message and saved booking data
//         res.status(200).json({
//             success: true,
//             message: "Your tour is booked",
//             data: savedBooking,
//         });
//     } catch (error) {
//         // Log and respond with error message
//         console.error("Error creating booking:", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };


// get single booking
export const getBooking = async (req, res) =>{
    const id = req.params.id;
    console.log(id);

    try {
        const book = await Booking.findById(id);

        res.status(200).json({
            success: true,
            message: "Successful",
            data: book
        });
    } catch (error) {
        res.status(404).json({ success: true, message: "not found"})
    }
}
// get all booking
export const getAllBooking = async (req, res) =>{

    try {
        const books = await Booking.find();

        res.status(200).json({
            success: true,
            message: "Successful",
            data: books
        });
    } catch (error) {
        res.status(500).json({ success: true, message: "internal server error"})
    }
}