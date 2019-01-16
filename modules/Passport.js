const LocalStrategy = require('passport-local').Strategy
const ObjectId = require('mongodb').ObjectId
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession)
const appendQuery = require('append-query')
const passport = require('passport')
const express = require('express')

const User = require('../models/User')

class Passport {
    constructor() {
        this.router = express()

        this.router.use((req, res, next) => {
            Object.assign(res.locals, {
                success: req.flash('success'),
                error: req.flash('error')
            })
            next()
        })

        this.router.set('view engine', 'pug')
        this.router.set('views', [__dirname + '/../renders/views/'])

        this.router.use(passport.initialize())
        this.router.use(passport.session())

        passport.use(new LocalStrategy({ passReqToCallback: true }, this.authenticate))

        passport.serializeUser(this.serialize)
        passport.deserializeUser(this.deserialize)

        this.router.get('/register', this.getLogin.bind(this))
        this.router.post('/register', this.postRegister.bind(this))

        this.router.get('/login', this.getLogin.bind(this))
        this.router.post(
            '/login',
            (req, res, next) => {
                passport.authenticate('local', (err, user, info) => {
                    if (err) {
                        console.error(err)
                        return req.flash('error', 'An unexpected error occurred.')
                    }

                    if (!user) {
                        req.flash('error', info.message)

                        if (req.body.goto) {
                            return res.redirect(appendQuery(req.originalUrl, 'goto=' + encodeURIComponent(req.body.goto)))
                        } else {
                            return res.redirect(req.originalUrl)
                        }
                    }

                    req.logIn(user, (err) => {
                        if (err) return req.flash('error', err)
                        return res.redirect(decodeURIComponent(req.body.goto) || '/')
                    })
                })(req, res, next)
            })

        this.router.get('/logout', this.logout.bind(this))
    }

    authenticated(req, res, next) {
        if (req.user) return next()

        res.redirect(appendQuery('/login', 'goto=' + encodeURIComponent(req.originalUrl)))
    }

    authenticate(req, username, password, done) {
        User
            .findOne({ username })
            .then(user => {
                if (!user) return done(null, false, { message: 'Incorrect username.' })

                user.compare(password).then(match => {
                    if (!match) return done(null, false, { message: 'Incorrect password.' })

                    user.save().then(() => {
                        user._id = String(user._id)

                        req.login(user, err => {
                            if (err) return next(err)

                            done(null, user)
                        })
                    })
                })
            })
    }

    postRegister(req, res, next) {
        User.findOne({ username: req.body.username })
            .then(existingUser => {
                if (existingUser) {
                    console.log('flashing email in use')
                    req.flash('error', 'Username / Email already in use.')
                    return res.redirect(req.originalUrl)
                }

                let user = new User({
                    username: req.body.username,
                    password: req.body.password
                })

                user.save().then(() => {
                    req.login(user, err => {
                        if (err) return next(err)
                        return res.redirect(decodeURIComponent(req.body.goto) || '/')
                    })
                })
            })
    }

    getLogin(req, res) {
        res.render('login')
    }

    logout(req, res) {
        req.logout()
        res.redirect('/')
    }

    serialize(user, done) {
        done(null, String(user._id))
    }

    deserialize(id, done) {
        User
            .findOne({ _id: ObjectId(id) })
            .then(user => done(null, user))
            .catch(err => done(err))
    }
}

module.exports = Passport