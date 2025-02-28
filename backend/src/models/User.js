import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true,
    },
    nonce: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        sparse: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
    },
    bettingStats: {
        totalBets: {
            type: Number,
            default: 0,
        },
        wonBets: {
            type: Number,
            default: 0,
        },
        totalWagered: {
            type: Number,
            default: 0,
        },
        totalWon: {
            type: Number,
            default: 0,
        },
        profitLoss: {
            type: Number,
            default: 0,
        },
    },
    preferences: {
        notifications: {
            email: {
                type: Boolean,
                default: true,
            },
            push: {
                type: Boolean,
                default: true,
            },
        },
        currency: {
            type: String,
            default: 'USDC',
        },
        language: {
            type: String,
            default: 'en',
        },
    },
}, {
    timestamps: true,
});

userSchema.pre('save', async function(next) {
    if (this.isModified('nonce')) {
        this.nonce = await bcrypt.hash(this.nonce, 10);
    }
    next();
});

userSchema.methods.verifyNonce = async function(nonce) {
    return await bcrypt.compare(nonce, this.nonce);
};

export default mongoose.model('User', userSchema);
