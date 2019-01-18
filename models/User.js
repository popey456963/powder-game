const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const uuid = require('uuid/v4')

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    apiKey: { type: String }
}, {
        timestamps: true,
        strict: true
    })

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next()

    bcrypt.hash(this.password, 12, (err, hash) => {
        if (err) return next('An unknown error occurred whilst hashing your password, sorry.')
        this.password = hash
        next()
    })
})

UserSchema.pre('save', function (next) {
    if (!this.apiKey) {
        this.apiKey = uuid()
    }

    next()
})

UserSchema.methods.compare = function (password, cb) {
    return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
