const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//     res
//         .status(200)
//         .json({ message: 'Hello from the server', app: 'Natours' })
// })

// app.post('/', (req, res) => {
//     res
//         .send('Yoy can post to this endpoint...');
// })





// -------------------------------------GET REQUEST
//convert the json file into js object and then send as json response because file is read as a string  Parsing it with JSON.parse() converts this string into a usable JavaScript object. This object can be easily manipulated, processed, or validated within your application before being sent as a response.Parsing the JSON content ensures that the data within the file is valid JSON. If the file contains malformed JSON, the JSON.parse() method will throw an error. This helps ensure that the data being sent as a response is in the expected format, reducing the chances of errors when it's received and processed by client applications.
const tours = JSON.parse(fs.readFileSync('./4-natours/starter/dev-data/data/tours-simple.json', 'utf-8'));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: { tours }
    })
})

//for optional parameters :y? just add a question mark
app.get('/api/v1/tours/:id', (req, res) => {
    // console.log(req.params);

    const id = req.params.id * 1
    // if(id>tours.length)
    // {
    //     return res.status(404).json({
    //         status:'fail',
    //         message: 'invalid id'
    //     })
    // }

    const tour = tours.find(el => el.id === id);
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
})




//--------------------------------------POST REQUEST
app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile('./4-natours/starter/dev-data/data/tours-simple.json', JSON.stringify(tours), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
})




//--------------------------PATCH REQUEST
app.patch('/api/v1/tours/:id', (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
})




//---------------------DELETE REQUEST
app.delete('/api/v1/tours/:id', (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id'
        })
    }

    res.status(204).json({
        status: 'success',
        data: {
            data: null
        }
    })
})





const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})