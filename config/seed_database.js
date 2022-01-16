import fs from 'fs';
import db from '../utilities/db.js'
import validateEntry from "../utilities/validateEntry.js";


await db.query('DROP TABLE IF EXISTS farm_data;')
const text = "CREATE TABLE farm_data (\
                    id serial,\
                    farm_name text,\
                    created_at timestamp,\
                    metric_type varchar(20),\
                    metric_value float\
);"
await db.query(text)


const parseSeedFile = filePath => {
    const fileContent = fs.readFileSync(filePath).toString().split('\n')
    const headerRow = fileContent.shift()
    if (headerRow !== 'location,datetime,sensorType,value')
        console.log('invalid header row on file on: ', filePath)

// validate each row of the .csv, remove invalid rows
    return fileContent.flatMap(row => {
        const entryArray = row.split(',')
        if (!validateEntry(entryArray)) return []
        return [entryArray]
    })

}

// [farm_name, created_at, metric_type, metric_value]
const insertIntoDB = async valueArray => {
    try {
        const text = "INSERT INTO farm_data(farm_name, created_at, metric_type, metric_value) VALUES ($1, $2, $3, $4);"
        await db.query(text, valueArray)
    } catch (err) {
        console.log(err, valueArray)
    }
}

const seedDatabase = async () => {
    const pathName = `${process.cwd()}/config/seed_data/`
    const seedDataFiles = fs.readdirSync(pathName)

    const validatedFiles = seedDataFiles.map(fileName => parseSeedFile(pathName + fileName))
    validatedFiles.forEach(file => file.forEach(async content => await insertIntoDB(content)))
}

seedDatabase()
    .then(() => {
        console.log('DB seed OK')
        return 0
    })


