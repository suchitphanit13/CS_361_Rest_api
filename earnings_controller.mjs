import * as earnings from './earnings_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new input with the source, amount, hours, and date provided in the body
 */
app.post('/earnings', (req, res) => {
    earnings.createEarning(req.body.source, req.body.amount, req.body.hours, req.body.date)
        .then(earning => {
            res.status(201).json(earning);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Internal Server Error' });
        });
});


/**
 * Retrieve Exercises. 
 */
app.get('/earnings', (req, res) => {
    let filter = {};
    // Is there a query parameter named source If so add a filter based on its value.
    if(req.query.source !== undefined){
        filter = { source: req.query.source };
    }
    earnings.findEarnings(filter, '', 0)
        .then(earnings => {
            res.status(200).json(earnings);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Internal Server Error' });
        });

});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
 app.put('/earnings/:_id', (req, res) => {
    earnings.editEarning(req.params._id, req.body.source, req.body.amount, req.body.hours, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({ _id: req.params._id, source: req.body.source, amount: req.body.amount, hours: req.body.hours, date: req.body.date })
            } else {
                res.status(500).json({ Error: 'Internal Server Error' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Internal Server Error' });
        });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/earnings/:id', (req, res) => {
    earnings.deleteById(req.params.id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(500).json({ Error: 'Internal Server Error' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});