
import * as pg from 'pg'
const { Pool } = pg.default

const pool = new Pool({
  user: 'postgres',
  password: '280399v',
  host: 'localhost',
  port: 5432,
  database: 'housing_manage'
})

export default pool
