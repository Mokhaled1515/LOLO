const dotenv = require("dotenv").config();
const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const app = express();
const connectDB = require("./config/db");
const roomsRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const diningRoutes = require("./routes/diningRoutes");
const offerRoutes = require("./routes/offerRoutes");
const amenityRoutes = require("./routes/amenityRoutes");
const contactRoutes = require("./routes/contactRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lavilla-admin.vercel.app",
      "https://admin-mo-o1.vercel.app",
      "https://lolo-mo-o1.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


app.use("/api/rooms", roomsRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

app.use("/api/dining", diningRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/amenities", amenityRoutes);
app.use("/api/contact", contactRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
