const Destination = require("../models/destinationModel");
const TourPackage = require("../models/packageModel");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const Review = require("../models/reviewModel");
const Contact = require("../models/contactModel");

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/stats
// @access  Protected (Admin)
const getDashboardStats = async (req, res) => {
  try {
    // ── Run all count queries in parallel for speed ──
    const [
      totalDestinations,
      totalPackages,
      totalBookings,
      totalUsers,
      totalReviews,
      totalMessages,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      completedBookings,
    ] = await Promise.all([
      Destination.countDocuments(),
      TourPackage.countDocuments(),
      Booking.countDocuments(),
      User.countDocuments(),
      Review.countDocuments(),
      Contact.countDocuments(),
      Booking.countDocuments({ status: "Pending" }),
      Booking.countDocuments({ status: "Confirmed" }),
      Booking.countDocuments({ status: "Cancelled" }),
      Booking.countDocuments({ status: "Completed" }),
    ]);

    // ── Revenue from confirmed + completed bookings ──
    const revenueResult = await Booking.aggregate([
      { $match: { status: { $in: ["Confirmed", "Completed"] } } },
      { $group: { _id: null, total: { $sum: "$estimatedTotal" } } },
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // ── Bookings this month vs last month ──
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [bookingsThisMonth, bookingsLastMonth] = await Promise.all([
      Booking.countDocuments({ createdAt: { $gte: startOfThisMonth } }),
      Booking.countDocuments({
        createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth },
      }),
    ]);

    // ── Recent 5 bookings with populated references ──
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email phone")
      .populate("destination", "title name")
      .populate("packageId", "title name")
      .lean();

    res.status(200).json({
      totalDestinations,
      totalPackages,
      totalBookings,
      totalUsers,
      totalReviews,
      totalMessages,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      completedBookings,
      totalRevenue,
      recentBookings,
      bookingsThisMonth,
      bookingsLastMonth,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
};

// @desc    Get detailed admin insights
// @route   GET /api/admin/insights
// @access  Protected (Admin)
const getInsights = async (req, res) => {
  try {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
      totalDestinations,
      totalPackages,
      totalUsers,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      completedBookings,
      bookingsThisMonth,
      bookingsLastMonth,
      pendingReviews,
      approvedReviews,
      hiddenReviews,
      unreadMessages,
      readMessages,
      allConfirmedCompletedBookings,
      recentBookings,
      recentReviews,
      recentMessages,
      packages
    ] = await Promise.all([
      Destination.countDocuments(),
      TourPackage.countDocuments(),
      User.countDocuments(),
      Booking.countDocuments(),
      Booking.countDocuments({ status: "Pending" }),
      Booking.countDocuments({ status: "Confirmed" }),
      Booking.countDocuments({ status: "Cancelled" }),
      Booking.countDocuments({ status: "Completed" }),
      Booking.countDocuments({ createdAt: { $gte: startOfThisMonth } }),
      Booking.countDocuments({ createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth } }),
      Review.countDocuments({ status: "Pending" }),
      Review.countDocuments({ status: "Approved" }),
      Review.countDocuments({ status: "Hidden" }),
      Contact.countDocuments({ $or: [{ isRead: false }, { status: 'New' }, { status: 'Unread' }] }),
      Contact.countDocuments({ $or: [{ isRead: true }, { status: { $in: ['Read', 'Replied'] } }] }),
      Booking.find({ status: { $in: ["Confirmed", "Completed"] } }).select("estimatedTotal"),
      Booking.find().sort({ createdAt: -1 }).limit(5).populate("user", "name email").populate("destination", "title name").populate("packageId", "title name"),
      Review.find().sort({ createdAt: -1 }).limit(5).populate("user", "name"),
      Contact.find().sort({ createdAt: -1 }).limit(5),
      TourPackage.find().select("category")
    ]);

    const totalRevenue = allConfirmedCompletedBookings.reduce((acc, b) => acc + (b.estimatedTotal || 0), 0);
    const averageBookingValue = allConfirmedCompletedBookings.length > 0 ? totalRevenue / allConfirmedCompletedBookings.length : 0;

    let growthPercentage = 0;
    if (bookingsLastMonth === 0 && bookingsThisMonth > 0) growthPercentage = 100;
    else if (bookingsLastMonth !== 0) growthPercentage = ((bookingsThisMonth - bookingsLastMonth) / bookingsLastMonth) * 100;

    // Top Destination
    const destStats = await Booking.aggregate([
      { $match: { destination: { $exists: true, $ne: null } } },
      { $group: { _id: "$destination", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    let topDestinationResult = { name: "No data yet", bookings: 0 };
    if (destStats.length > 0) {
      const dest = await Destination.findById(destStats[0]._id).select("title name");
      if (dest) topDestinationResult = { name: dest.title || dest.name, bookings: destStats[0].count };
    }

    // Top Package
    const pkgStats = await Booking.aggregate([
      { $match: { packageId: { $exists: true, $ne: null } } },
      { $group: { _id: "$packageId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    let topPackageResult = { name: "No data yet", bookings: 0 };
    if (pkgStats.length > 0) {
      const pkg = await TourPackage.findById(pkgStats[0]._id).select("title name");
      if (pkg) topPackageResult = { name: pkg.title || pkg.name, bookings: pkgStats[0].count };
    }

    // Popular Category
    const categoryCount = {};
    packages.forEach(p => {
      if (p.category) categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });
    let topCat = "No data yet";
    let topCatCount = 0;
    for (const cat in categoryCount) {
      if (categoryCount[cat] > topCatCount) {
        topCatCount = categoryCount[cat];
        topCat = cat;
      }
    }

    res.status(200).json({
      summary: { totalRevenue, averageBookingValue, totalBookings, totalUsers, totalDestinations, totalPackages },
      bookingStatus: { pending: pendingBookings, confirmed: confirmedBookings, cancelled: cancelledBookings, completed: completedBookings },
      bookingTrend: { thisMonth: bookingsThisMonth, lastMonth: bookingsLastMonth, growthPercentage },
      engagement: { pendingReviews, approvedReviews, hiddenReviews, unreadMessages, readMessages },
      topPerformance: { topDestination: topDestinationResult, topPackage: topPackageResult, popularCategory: { name: topCat, count: topCatCount } },
      recentActivity: { recentBookings, recentReviews, recentMessages }
    });

  } catch (error) {
    console.error("Insights error:", error);
    res.status(500).json({ message: "Failed to fetch insights", error: error.message });
  }
};

module.exports = { getDashboardStats, getInsights };
