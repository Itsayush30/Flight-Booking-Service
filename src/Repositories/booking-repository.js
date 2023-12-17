const { StatusCodes } = require('http-status-codes');

const { Booking } = require('../models');
const CrudRepository = require('./crud-repository');

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }

    async createBooking(data, transaction) {
        const response = await Booking.create(data, {transaction: transaction});
        return response;
    } 
}
/**an additional parameter called transaction. 
 * This indicates that the method can be executed within the context of a database transaction. */

module.exports = BookingRepository;