const express = require('express');
const morgan = require('morgan');
const AppError = require('./appError');
const globalErrorHandler = require('./errorController');
const tourRouter = require('./tourRoutes');
const userRouter = require('./userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());


app.use((req, res, next) => {
    console.log('Hello');
    next();
})
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})


//mounting the router with two diff routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);



app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on the server!`
    // })

    next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
})


// error handeling middleware (unhandeled routes)
app.use(globalErrorHandler)




module.exports = app;
