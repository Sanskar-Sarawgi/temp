export const dashboardSummary = async (req, res) => {
    res.renderView('./dashboard/index.ejs', {data: req.user})
}