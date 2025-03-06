const bloodApplications = require("../models/blood.model");
const User = require('../models/user.model');


exports.donateBlood = async (req, res) => {
    const {
      bloodGroup,
      rhesusFactor,
      address,
    } = req.body;
    try {
      if (
        !bloodGroup ||
        !rhesusFactor ||
        !address
      ) {
        return res
          .status(400)
          .json({ message: "Please Fill All Required Fields" });
      }
      const userName = req.user?.userName 
    const user = await User.findOne({ userName });
    if(!user) {
      return res
      .status(403).json({message: "Unauthorised"});
    }
    if(user.role!== "user") {
      return res 
      .status(403).json({message: "Unauthorised; You Are Not A User"});
    }
      
      const newApplication = new bloodApplications({
        bloodGroup,
        rhesusFactor,
        address,
      });

      
      await newApplication.save();

      return res
      .status(201)
      .json({ message: "Blood sample Application Submitted Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};




exports.getAll = async (req, res) => {
    try {
      const bloodApplication = await bloodApplications.find();
      
      
    return res.status(200).json({data: bloodApplication, length: bloodApplication.length});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error" });
    }
  };



exports.updateBlood = async (req, res) => {
  const { bloodGroup, rhesusFactor, address } = req.body;
  const { id } = req.params;

  if (!bloodGroup || !rhesusFactor || !address) {
    return res.status(400).json({ message: "All fields are required: bloodGroup, rhesusFactor, and address." });
  }

  try {
    const updatedApplication = await bloodApplications.findByIdAndUpdate(
      id,
      { bloodGroup, rhesusFactor, address },
      { new: true } 
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Blood Application not found." });
    }

    return res.status(200).json({
      message: "Blood Application updated successfully.",
      data: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating blood application:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};





  
  exports.deleteBlood = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedApplication = await bloodApplications.findByIdAndDelete(id);

    if (!deletedApplication) {
      return res.status(404).json({ message: "Blood sample not found" });
    }

    return res.status(200).json({ message: "Blood sample deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};