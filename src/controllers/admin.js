const moment = require("moment");
const momentTZ = require("moment-timezone");
// const Entries = require("../models/entries");

exports.report = async function (req, res) {
  //   const { timezone } = req.query;
  try {
    // let TIME_ZONE = timezone || "UTC";
    // const format = "YYYY-MM-DD";

    // const currentWeekRange = {
    //   end: moment().endOf("day").toISOString(),
    //   start: moment().subtract(7, "days").endOf("day").toISOString(),
    // };
    // const lastWeekRange = {
    //   end: moment().subtract(7, "days").endOf("day").toISOString(),
    //   start: moment().subtract(14, "days").endOf("day").toISOString(),
    // };

    // const currentWeekCount = await Entries.countDocuments({
    //   date: { $gte: currentWeekRange.start, $lt: currentWeekRange.end },
    // }).exec();
    // const lastWeekCount = await Entries.countDocuments({
    //   date: { $gte: lastWeekRange.start, $lt: lastWeekRange.end },
    // }).exec();
    // const aggregateQuery = [
    //   {
    //     $match: {
    //       date: {
    //         $gte: new Date(currentWeekRange.start),
    //         $lt: new Date(currentWeekRange.end),
    //       },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$userId",
    //       entries: { $push: "$$ROOT" },
    //       entries_count: { $sum: 1 },
    //       total_calories_count: { $sum: "$calories" },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       entries_avg: { $avg: "$entries_count" },
    //       calories_avg: { $avg: "$total_calories_count" },
    //     },
    //   },
    // ];
    // const report = await Entries.aggregate(aggregateQuery);
    // const reportData = {
    //   currentWeekRange,
    //   lastWeekRange,
    //   currentWeekCount,
    //   lastWeekCount,
    //   avgEntryPerUserLastWeek: report && report[0] ? report[0].entries_avg : 0,
    //   avgCaloriesPerUserLastWeek:
    //     report && report[0] ? report[0].calories_avg : 0,
    // };
    res
      .status(200)
      .json({ report: [], message: "Report Generated Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
