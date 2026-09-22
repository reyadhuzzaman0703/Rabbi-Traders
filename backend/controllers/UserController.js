const bcrypt = require("bcryptjs");
const User = require("../models/User");

const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        console.error("Get Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching profile.",
        });
    }
};


const updateMyProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Update name if provided
        if (name !== undefined) {
            if (!name.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Name cannot be empty.",
                });
            }

            user.name = name.trim();
        }

        // Update email if provided
        if (email !== undefined) {
            if (email.trim() === "") {
                user.email = undefined;
            } else {
                const existingEmail = await User.findOne({
                    email: email.toLowerCase().trim(),
                    _id: { $ne: user._id },
                });

                if (existingEmail) {
                    return res.status(409).json({
                        success: false,
                        message: "Email is already registered.",
                    });
                }

                user.email = email.toLowerCase().trim();
            }
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Update Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while updating profile.",
        });
    }
};

const changeMyPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Check required fields
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required.",
            });
        }

        // Check new password length
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 6 characters.",
            });
        }

        // Find logged-in user
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Verify current password
        const isPasswordMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect.",
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Save new password
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully.",
        });

    } catch (error) {
        console.error("Change Password Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while changing password.",
        });
    }
};

module.exports = {
    getMyProfile,
    updateMyProfile,  
    changeMyPassword,
};