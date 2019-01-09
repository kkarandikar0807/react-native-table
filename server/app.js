const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');




const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/offeredassignments', (req,res) => {
    res.json(
        [
            {
                value: 'test'
            },
            {
                value: 'test2'
            }
        ])
});


app.listen(4000, function() {
    console.log('running on port 4000');
})