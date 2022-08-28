const mockData = [
  {
      id: 1,
      address: 'address',
      tenants: 2,
      livers: 3,
  },
  {
      id: 2,
      address: '123address',
      tenants: 53,
      livers: 123,
  },
  {
      id: 3,
      address: '123address',
      tenants: 53,
      livers: 123,
  }
]

export const getAll = (req, res) => {
  setTimeout(() => {
    res.status(200).json(mockData)
  }, 2000)
}

export const create = (req, res) => {
  const newHouse = req.body
  mockData.push(newHouse)
  console.log(newHouse);
  setTimeout(() => {
    // req.files; - files form data
    res.status(201).json(newHouse)
  }, 2000)
}

export const remove = (req, res) => {
  setTimeout(() => {
    res.status(200).send(mockData)
  }, 2000)
}