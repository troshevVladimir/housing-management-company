import db from './../db/db.js'

export const getAll = async (req, res) => {
  const allHouses = await db.query(`SELECT * from houses`)
  res.status(200).json(allHouses.rows)
}

export const create = async (req, res) => {
  const newHouse = await db.query(`INSERT INTO houses (address, livers, tenants) values ($1, $2, $3) RETURNING *`, [req.body.address, req.body.livers, req.body.tenants])
  // req.files; - files form data
  res.status(201).json(newHouse.rows[0])
}

export const remove = async (req, res) => {
  const removedHouse = await db.query(`DELETE FROM houses WHERE id = ${req.params.id} RETURNING *;`)
  res.status(200).json(removedHouse.rows[0].id)
}

export const update = async (req, res) => {
  const id = req.params.id
  const updatedHouse = await db.query(`UPDATE houses SET (address, livers, tenants) = ('${req.body.address}', ${req.body.livers}, ${req.body.tenants}) WHERE id = '${id}' RETURNING *;`)
  res.status(200).json(updatedHouse.rows[0])
}