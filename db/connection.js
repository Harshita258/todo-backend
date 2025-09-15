const mongoose = require('mongoose');


module.exports = function connectDB() {
const uri = process.env.MONGODB_URI;
if (!uri) {
console.error('MONGODB_URI missing in .env');
process.exit(1);
}
mongoose.connect(uri, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
console.error('MongoDB connection error', err);
process.exit(1);
});
};
