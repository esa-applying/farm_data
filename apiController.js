import db from './utilities/db.js'

const PER_PAGE = 500

const getEntries = async (request, response) => {
    const { page } = request.query
    const pageNb = parseInt(page) || 1
    const offset = (page - 1) * PER_PAGE || 0

    const res = await db.query("SELECT * FROM farm_data ORDER BY id LIMIT $1 OFFSET $2;", [PER_PAGE, offset])
    return response.json(res.rows)
}

const getMetric = async (request, response) => {
    const { metric } = request.params
    const { page } = request.query

    const pageNb = parseInt(page) || 1
    const offset = (page - 1) * PER_PAGE || 0

    const res = await db.query("SELECT * FROM farm_data WHERE metric_type ILIKE $1 ORDER BY id LIMIT $2 OFFSET $3;", [metric, PER_PAGE, offset])
    return response.json(res.rows)
}

export default {getEntries, getMetric}