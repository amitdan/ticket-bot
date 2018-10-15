// Import ticket model
Ticket = require('../models/ticket');

// Handle index actions
exports.index = function(req, res) {
    Ticket.getTickets(function(err, tickets) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Tickets retrived successfully",
            data: tickets
        });
    });
};

// Handle create ticket actions
exports.new = function(req, res) {
    console.log("#######"+req.body)
    var ticket = new Ticket();
    ticket.first_name = req.body.first_name;
    ticket.last_name = req.body.last_name;
    ticket.gender = req.body.gender;
    ticket.marital_status = req.body.marital_status;
    ticket.state = req.body.state;
    ticket.email = req.body.email;
    ticket.phone = req.body.phone;
    ticket.dob = req.body.dob;
    ticket.institution = req.body.institution;
    ticket.department = req.body.department;

    // save the ticket and check for errors
    ticket.save(function(err) {
        if (err)
            res.json(err);

        res.json({
            message: 'New Ticket created!',
            data: ticket
        });
    });
};


// Handle view ticket info
exports.view = function(req, res) {
    Ticket.findById(req.params.ticket_id, function(err, ticket) {
        if (err)
            res.send(err);
        res.json({
            message: 'Ticket details loading..',
            data: ticket
        });
    });
};

// Handle update ticket info
exports.update = function(req, res) {

    Ticket.findById(req.params.ticket_id, function(err, ticket) {
        if (err)
            res.send(err);

        ticket.first_name = req.body.first_name ? req.body.first_name : ticket.first_name;
        ticket.last_name = req.body.last_name ? req.body.last_name : ticket.last_name;
        ticket.gender = req.body.gender;
        ticket.marital_status = req.body.marital_status;
        ticket.state = req.body.state;
        ticket.email = req.body.email;
        ticket.phone = req.body.phone;
        ticket.dob = req.body.dob;
        ticket.institution = req.body.institution;
        ticket.department = req.body.department;


        // save the ticket and check for errors
        ticket.save(function(err) {
            // if (err)
            //     res.json(err);

            res.json({
                message: 'Ticket Info updated',
                data: ticket
            });
        });
    });
};


// Handle delete ticket
exports.delete = function(req, res) {
    Ticket.remove({
        _id: req.params.ticket_id
    }, function(err, ticket) {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'Ticket deleted'
        });
    });
};