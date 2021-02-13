const express = require('express');
const app = express();
const port = 3004;
const cors = require('cors');
const bodyParser = require('body-parser');
const Employees = require('./models/employees');
const Users = require('./models/users');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/employees', (req, res) => {
    Employees.findAll()
        .then(data => res.send(data))
        .catch(err => console.log(err));
});

app.get('/employees/:id', (req, res) => {
    Employees.findOne({
        where: {
            id: req.params.id
        }
    }).then(data => res.send(data))
        .catch(err => console.log(err));
});

app.post('/employees', (req, res) => {

    const payload = req.body;

    Employees.create(payload).then(data => res.send(data))
        .catch(err => console.log(err));
});

app.put('/employees/:id', (req, res) => {
    const payload = req.body;

    Employees.findOne({
        where: {
            id: req.params.id
        }
    }).then(employee => {
        employee.update({
            name: payload.name,
            document: payload.document,
            phone: payload.phone,
            email: payload.email,
            occupation: payload.occupation,
            workHourBegin: payload.workHourBegin,
            workHourEnd: payload.workHourEnd,
            lunchTimeBegin: payload.lunchTimeBegin,
            lunchTimeEnd: payload.lunchTimeEnd,
        }).then(() => res.send('ok'))
            .catch(err => {
                console.log(err);
                res.status(500).send('Error');
            });
    }).catch(err => {
        console.log(err);
        return res.status(404).send('Not Found');
    });
});

app.delete('/employees/:id', (req, res) => {
    Employees.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (data) {
            return res.send('ok');
        }

        return res.status(404).send('Not Found');
    })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error');
        });
});

app.post('/login', (req, res) => {

    Users.findOne({
        where: {
            email: req.body.email
        }
    }).then( user => {

        if(user)
        {
            bcrypt.compare(req.body.password, user.password, function(err, result) {

                if(result)
                {
                    return res.send(user);
                }

                return res.status(401).send('Wrong email/password');
            });

        }else{
            return res.status(401).send('Wrong email/password');
        }



    }).catch(err => {
        console.log(err);
        return res.send('Fail');
    });

});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});