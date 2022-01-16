# Farm data exercise

My brief and naive implementation of the farm data backend. A simple NodeJS backend connected to a PostgreSQL server, 
providing two endpoints and a NodeJS script to parse and validate the .csv data files for seeding the database.


### Requirements:
- Node 17.0.1 or above
- Locally hosted PostgreSQL server (tested with 13.4)

### Endpoints
`GET /api/farm_data` returns all data in order of insertion.

`GET /api/farm_data/metrics/{metric}` returns only the data with the requested metric.

Both endpoints are paginated using the GET parameter `page`. For example:

`GET /api/farm_data?page=5` should give you the entries with ids 2001-2500.

### How to run:

1. `git clone [address] farm_data` 
2. `cp env_sample .env` and set the variables on `.env` to match your PostgreSQL server
3. `cd farm_data && npm install`
4. `bash start_server.sh`
   1. You will be prompted with a dialog to seed the database, on the first run answer `y`.
5. Server listens to port 5000 or env variable `PORT`

### TODO:
Stuff I would have liked to include on the assignment:
- A frontend... A simple React based one would have been great.
- Real logging instead of `console.log()`
- In general: more use of postgres such as
  - proper statistics such as max, min with `from`, `to` as query parameters to specify datetime
  - more tables: `farms`, `farm_measurements` to make it easier to look for information
  - filtering by farm name
- `jest` for simple endpoint tests because I'm reinventing the wheel by using raw SQL 