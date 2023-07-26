const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: String, require: true },
  parent: { type: mongoose.Types.ObjectId, default: undefined },
});

module.exports = {
  CategoryModel: mongoose.model("category", Schema),
};


// web developer
    //front-end:
        // title: front-end
        // parent: webDeveloperID
    //back-end
//AI
//IOT

// کودک
  // یک ماه تا یکسال
  // یک سال به بالا
  // ده سال به بالا

// دکورهای مناسبتی
  // تولد
  // کریسمس
  // یلدا
  // نوروز
  // هالویین
  // چهارشنبه سوری
  // ولنتاین
  // لایف استایل
  // سیرک
  // سفید برفی
  // نان
  // تابستان
  // دندونی

// بارداری و نوزاد
// فضای باز
