
const admin = require("../config/config");
const db = admin.firestore();
const usersRef = db.collection('users');
const skillRef = db.collection('skills');


const createUser = async (userData) => {
  const docRef = await usersRef.add(userData);
  const docSnapshot = await docRef.get();
  const userDatas = docSnapshot.data();
  userDatas.id = docRef.id; // add the document ID to the user data
  return userDatas
};

const getUserById = async (userId) => {
  const userRef = usersRef.doc(userId);
  const user = await userRef.get();
  return user.data();
};

const createSkills = async (skillData) => {
  try {
    // Create a reference to the user document
    const userRef = usersRef.doc(skillData.userId);
    const docRef = await skillRef.add(skillData);
    await docRef.update({ userRef: userRef });
    const docSnapshot = await docRef.get();
    const skill = docSnapshot.data();
    skill.id = docRef.id;
    return skill;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const getSkillByid = async (skillId) => {
  const skillDoc = await skillRef.doc(skillId).get();
  if (!skillDoc.exists) {
    return res.status(404).json({ error: 'Skill not found' });
  }

  // Extract the skill data from the document
  const skillData = skillDoc.data();

  // Get the user document referenced by the skill
  const userDoc = await skillData.userRef.get();


  // Extract the user data from the document
  const userData = userDoc.data();

  // Add the user data to the skill data
  skillData.user = userData;
  delete skillData.userRef;
  return skillData;
}
module.exports = { createUser, getUserById, createSkills, getSkillByid };
