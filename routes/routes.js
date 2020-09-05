const authRoutes = require('./auth.routes')
const dashboardRoutes = require('./dashboard.routes')
const indexRoutes = require('./index.routes')

//API Routes
const routes = (app) => {
    const vOne = routeName =>  `/api/v1/${routeName}`
app.use('/api/v1', indexRoutes)
app.use(vOne('auth'), authRoutes)
app.use(vOne('dashboard'), dashboardRoutes)
}

module.exports = routes;