import pg from 'pg';
import fs from 'fs';
import 'dotenv/config';

const {Client} = pg

// Initialize DB here
const client = new Client()

await client.connect()
await client.query('DROP TABLE IF EXISTS farm_data;')
const text = "CREATE TABLE farm_data (\
                    farm_name text,\
                    created_at timestamp,\
                    metric_type varchar(20),\
                    metric_value float\
);"
await client.query(text)


const validateEntry = entry => {
    if (entry.length !== 4)
        return null
    const [farmName, dateString, metricType, metricValue] = entry

    if (!farmName.length || !dateString.length || !metricType.length || !metricValue.length){
        console.log('empty column on: ', entry)
        return null
    }
    if (isNaN(metricValue)) {
        console.log('invalid metric value on: ', entry)
        return null
    }
    if (!Date.parse(dateString)) {
        console.log('invalid datetime on entry: ', entry)
        return null
    }
// TODO: add more detailed input validation
}

const parseSeedFile = filePath => {
    const fileContent = fs.readFileSync(filePath).toString().split('\n')
    const headerRow = fileContent.shift()
    if (headerRow !== 'location,datetime,sensorType,value')
        console.log('invalid header row on file on: ', filePath)

// validate each row of the .csv, remove invalid entries
    return fileContent.flatMap(row => {
        const entryArray = row.split(',')
        if (!validateEntry(entryArray)) return [entryArray]
        return []
    })

}

const insertIntoDB = async values => {
    try {
        const text = "INSERT INTO farm_data(farm_name, created_at, metric_type, metric_value) VALUES ($1, $2, $3, $4);"
        const res = await client.query(text, values)
    } catch (err) {
        console.log(err, values)
    }
}


const pathName = `${process.cwd()}/config/seed_data/`
const seedDataFiles = fs.readdirSync(pathName)

const validatedFiles = seedDataFiles.map(fileName => parseSeedFile(pathName + fileName))
validatedFiles.forEach(file => file.forEach(async content => await insertIntoDB(content)))

await client.end()