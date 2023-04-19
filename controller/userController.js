const { createUser, getUserById, createSkills, getSkillByid } = require("../services/userServices");

const createUserHandler = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.send(user)
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getUserByIdHandler = async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);
    res.send(user)
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const createSkill = async (req, res) => {
  try {
    const skill = await createSkills(req.body);
    res.send(skill)
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getSkill = async (req, res) => {
  try {
    const skillId = req.params.skillId;
    const skill = await getSkillByid(skillId)
    res.status(200).json(skill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { createUserHandler, getUserByIdHandler, createSkill, getSkill };
