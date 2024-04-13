import User from "../models/User.js";

export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  console.log(newUser);

  try {
    const savedUser = await newUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create.Try again",
    });
  }
};
// update User
export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      date: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to update",
    });
  }
};
// deleteUser
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to delete",
    });
  }
};

// get single User
export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};
// getAll User
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({})
      

    res
      .status(200)
      .json({
        success: true,
        message: "Successful",
        data: users,
      });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

export const getUserBySearch = async (req, res) => {
  // here i means case sensitive
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);
 

  try {
    // console.log("hey");
    // gte means greater than equal
    const Users = await User.find({
      city,
      distance:{$gte:distance},
      maxGroupSize:{$gte:maxGroupSize}
    });
    // console.log(Users);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: Users,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};


// get featured User
export const getFeaturedUser = async (req, res) => {
    try {
        const Users = await User.find({ featured: true }).limit(8);

        res.status(200).json({
            success: true,
            message: "Successful",
            data: Users
        })
    } catch (error) {
        res.status(404).json({  
            success: false,
            message: "Not found",
        })
        
    }
}

export const getUserCount = async (req, res) => {
    try {
        const UserCount = await User.estimatedDocumentCount();

        res.status(200).json({ success: true, data: UserCount })
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch" })
    }
}