import scan from './models/site.model.js'


export const getSites = async (req, res, next) => {
    try {
        const get = await scan.find();
        res.status(200).json(get);
    } catch (error) {
        res.status(500).json({ error: error})
    }
}