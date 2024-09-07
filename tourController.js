const fs = require('fs');
const Tour = require('./tourModel');
const APIFeatures = require('./apiFeatures');
const catchAsync = require('./catchAsync');

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};

// const tours = JSON.parse(fs.readFileSync('./4-natours/starter/dev-data/data/tours-simple.json', 'utf-8'));




// const testTour = new Tour({
//     name: 'The Forest Hiker',
//     rating: 4.7,
//     price: 497
// })

// testTour.save().then(doc => {
//     console.log(doc);
// }).catch(err => {
//     console.log('ERROR', err);
// })





// exports.checkID = (req, res, next, val) => {
//     console.log(val)
//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'invalid id'
//         })
//     }
//     next();
// }

// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name or price'
//         })
//     }
//     next();
// }

















// exports.getAllTours = (req, res) => {
//     console.log(req.requestTime);
//     res.status(200).json({
//         status: 'success',
//         result: tours.length,
//         data: { tours }
//     })
// }




exports.getAllTours = catchAsync(async (req, res, next) => {

    // FILTERING
    // const queryObj = { ...req.query };
    // const excludeFields = ['page', 'sort', 'limit', 'fields'];
    // excludeFields.forEach(el => delete queryObj[el]);



    // const tours = await Router.find(queryObj);
    // if we await or then for this initial query there is no way to apply sort or pagination etc. directly using await or then will immediately get the result which means we cant apply additional queries modifiers like sorting,pagination.


    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    // let query = Tour.find(JSON.parse(queryStr));



    // const tours = await Tour.find({
    //     durstion: 5,
    //     difficulty: 'easy'
    // });

    // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');



    // SORTING
    // if (req.query.sort) {
    //     const sortBy = req.query.sort.split(',').join(' ');
    //     query = query.sort(sortBy)
    // } else {
    //     query = query.sort('-createdAt')
    // }




    //FIELD LIMITING
    // if (req.query.fields) {
    //     const fields = req.query.fields.split(',').join(' ');
    //     query = query.select(fields);
    // } else {
    //     query = query.select('-__v');
    // }



    // PAGINATION
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // // page=3&limit=10
    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //     const numTours = await Tour.countDocuments();
    //     if (skip >= numTours)
    //         throw new Error('This page does not exist');
    // }


    const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
    const tours = await features.query;

    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: { tours }
    });

})












// exports.getTour = (req, res) => {
//     const id = req.params.id * 1;
//     const tour = tours.find(el => el.id === id);
//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour
//         }
//     })
// }

exports.getTour = catchAsync(async (req, res, next) => {

    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: { tour }
    });


})












// exports.createTour = (req, res) => {
//     const newId = tours[tours.length - 1].id + 1;
//     const newTour = Object.assign({ id: newId }, req.body);
//     tours.push(newTour);
//     fs.writeFile('./4-natours/starter/dev-data/data/tours-simple.json', JSON.stringify(tours), (err) => {
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 tour: newTour
//             }
//         })
//     })
// }

exports.createTour = catchAsync(async (req, res, next) => {


    const newTour = await Tour.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
});












// exports.updateTour = (req, res) => {
//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour: '<Updated tour here...>'
//         }
//     })
// }

exports.updateTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: tour
    });
});













// exports.deleteTour = (req, res) => {
//     res.status(204).json({
//         status: 'success',
//         data: {
//             data: null
//         }
//     })
// }

exports.deleteTour = catchAsync(async (req, res, next) => {

    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
        data: {
            data: null
        }
    });
});


exports.getTourStats = catchAsync(async (req, res, next) => {

    const stats = await Tour.aggregate([
        { $match: { ratingsAverage: { $gte: 4.5 } } },
        {
            $group: {
                _id: '$difficulty',
                num: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
            }
        },
        { $sort: { avgPrice: 1 } },
        { $match: { _id: { $ne: 'easy' } } }
    ])

    res.status(200).json({
        status: 'success',
        data: stats
    });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {

    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
        { $unwind: '$startDates' },
        {
            $match:
            {
                startDates:
                {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTourStarts: { $sum: 1 },
                tours: { $push: '$name' }
            }
        },
        {
            $addFields: { month: '$_id' }
        },
        { $project: { _id: 0 } },
        { $sort: { numTourStarts: -1 } },
        { $limit: 12 }
    ]);



    res.status(200).json({
        status: 'success',
        data: plan
    });
});