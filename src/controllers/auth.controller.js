const register = async (req, res) => {

    try {

        const { email, fullName, password, role } = req.body;

        if (!email || !password || !fullName) {
            return res.status(400).json({
                message: "Please provide all required fields."
            });
        }

        const userRole = role || "volunteer";

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            password_hash: hashedPassword,
            role: userRole
        });

        await Volunteer.create({
            user_id: newUser.id,
            fullName,
            skills: []
        });

        const token = generateToken(newUser.id, newUser.role);

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {

        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });

    }

};