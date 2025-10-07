import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
});

const orderSchema = new mongoose.Schema(
  {
    grid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grid",
      required: true,
    },
    restaurantid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: [(arr) => arr.length > 0, "Order must contain at least one item"],
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", function (next) {
  this.items.forEach((item) => {
    item.total = item.rate * item.quantity;
  });
  this.total = this.items.reduce((acc, item) => acc + item.total, 0);
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
