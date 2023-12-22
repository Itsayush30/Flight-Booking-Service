const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

const { Booking } = require("../models");
const CrudRepository = require("./crud-repository");
const AppError = require("../utils/errors/app-error");
const { Enums } = require('../utils/common');
const { CANCELLED, BOOKED } = Enums.BOOKING_STATUS;


class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }

  async createBooking(data, transaction) {
    const response = await Booking.create(data, { transaction: transaction });
    return response;
  }

  async getBooking(data, transaction) {
    const response = await Booking.findByPk(data, { transaction: transaction });
    //console.log(transaction);
    if (!response) {
      throw new AppError(
        "Not able to find booking for given bookingId",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }
  async updateBooking(id, data, transaction) {
    // data -> {col: value, ....}
    const response = await Booking.update(
      data,
      {
        where: {
          id: id,
        },
      },
      { transaction: transaction }
    );
    return response;
  }

  async cancelOldBookings(timestamp) {
    const response = await Booking.update(
      { status: CANCELLED },
      {
        where: {
          [Op.and]: [
            {
              createdAt: {
                [Op.lt]: timestamp,
              },
            },
            {
              status: {
                [Op.ne]: BOOKED,
              },
            },
            {
              status: {
                [Op.ne]: CANCELLED,
              },
            },
          ],
        },
      }
    );
    return response;
  }
}

/**an additional parameter called transaction.
 * This indicates that the method can be executed within the context of a database transaction. */

module.exports = BookingRepository;
