const express = require("express")
const app = express()
const router = express.Router()
const uuid = require("uuid")
const members = require("../../members/members")
const data = require("../../data/data.json")

//get all data
router.get("/getData/members", (req, res) => {
  let userDoc = []
  members.forEach((doc) => {
    userDoc.push({
      name: doc.data().name,
    })
  })
  res.status(200).json(userDoc)
})

//get data by id
router.get("/databyId/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id))
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)))
  } else {
    return res
      .status(404)
      .json({ error: `User not found corresponding to the request id-${req.params.id}` })
  }
})

//create user
router.post("/postUser", (req, res) => {
  const newMember = {
    name: req.body.name,
    email: req.body.email,
    status: req.body.status,
    id: uuid.v4(),
  }
  if (!newMember.name || !newMember.email) {
    return res.status(200).json({ message: `name or email field is empty` })
  }
  members.push(newMember)
  return res.status(201).json({ members })
})

//update data
router.put("/update/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id))
  if (found) {
    const updateUser = req.body
    members.forEach((doc) => {
      if (doc.id === parseInt(req.params.id)) {
        doc.name = updateUser.name ? updateUser.name : doc.name
        doc.email = updateUser.email ? updateUser.email : doc.email
        return res.status(202).json({ message: `User updated successfully`, doc })
      }
    })
  } else {
    return res.status(404).json({ error: `There is no user corresponding to requested id` })
  }
})

//delete documents
router.delete("/deleteData/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id))

  if (found) {
    const usersLeft = members.filter((doc) => doc.id !== parseInt(req.params.id))
    res.status(200).json({
      message: "User deleted",
      usersLeft,
    })
  } else {
    return res.status(400).json({ error: `No user found-${req.params.id}` })
  }
})

module.exports = router
