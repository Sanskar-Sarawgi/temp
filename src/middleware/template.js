export const AddTemplateView = (req, res, next) => {
    res.renderView = (viewFile, data={}) => {
        res.render('index', {
            ...data,
            viewFile
        })
    }
    next()
}