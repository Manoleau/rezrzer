import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const signToken = (id, role) => {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

export const signup = async (req, res) => {
    try {
        if (req.body.role === 'admin' && (!req.user || req.user.role !== 'admin')) {
            return res.status(403).json({
                status: 'fail',
                message: 'Only admins can create admin accounts'
            });
        }

        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'user'
        });

        const token = signToken(newUser._id, newUser.role);

        newUser.password = undefined;

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password'
            });
        }

        const token = signToken(user._id, user.role);

        res.status(200).json({
            status: 'success',
            token,
            data: {
                userId: user._id,
                role: user.role
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
