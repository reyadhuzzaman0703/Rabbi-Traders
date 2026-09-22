const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { normalizeBangladeshiPhone, isValidBangladeshiPhone, } = require("../utils/phone");

const registerUser = async(req,res)=>{
    try{
        const {name, email, phone, password } = req.body;

        if(!name || !phone || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const normalizedPhone = normalizeBangladeshiPhone(phone);

        if (!isValidBangladeshiPhone(normalizedPhone)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid Bangladeshi mobile number.",
            });
        }

        if(password.length<6){
            return res.status(400).json({
                success: false,
                message: "Password must be 6 characters.",
            });
        }

        if(email){
            const existingEmail = await User.findOne({ email });

            if(existingEmail){
                return res.status(409).json({
                    success: false,
                    message: "Email is allready registered.",
                })
            }
        }

        
            const existingPhone = await User.findOne({ phone: normalizedPhone });

            if(existingPhone){
                return res.status(409).json({
                    success: false,
                    message: "Phone number is allready Registered.",
                })
            }
        

        const hashedPassword = await bcrypt.hash(password,10);


        const user = await User.create({
            name,
            email,
            phone: normalizedPhone,
            password: hashedPassword,
        });
        
        res.status(201).json({
            success: true,
            message: "Registration completed successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        })

    }catch(error){
        console.error("Registration Error: ",error);

        res.status(500).json({
            success: false,
            message: "Server error during registration.",
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Check required fields
        if (!phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Phone and password are required.",
            });
        }

        // Normalize phone number
        const normalizedPhone = normalizeBangladeshiPhone(phone);

        // Validate phone number
        if (!isValidBangladeshiPhone(normalizedPhone)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid Bangladeshi mobile number.",
            });
        }

        // Find user
        const user = await User.findOne({
            phone: normalizedPhone,
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid phone or password.",
            });
        }

        // Check account status
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive.",
            });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid phone or password.",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // Login successful
        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Login Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error during login.",
        });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select(
            "-password"
        );

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
        console.error("Get Me Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching user.",
        });
    }
};

const adminTest = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Admin! You have access to this resource.",
        user: {
            id: req.user.userId,
            role: req.user.role,
        },
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    adminTest,
}