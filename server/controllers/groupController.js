const Group = require('../models/Group');
const User = require('../models/User');

// Create a new group
const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    // Ensure creator is included in the members list
    const allMembers = new Set([...members, req.user._id.toString()]);
    
    const group = new Group({
      name,
      members: Array.from(allMembers)
    });

    await group.save();
    res.status(201).json(group);
  } catch (err) {
    console.error('Create group error:', err);
    res.status(500).json({ error: 'Failed to create group' });
  }
};

// Get all groups the logged-in user is a member of
const getUserGroups = async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user._id });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
};

// Get a single group by ID
const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('members', 'name email');

    if (!group) return res.status(404).json({ error: 'Group not found' });

    // Optional: restrict access only to members
    if (!group.members.some(member => member._id.equals(req.user._id))) {
      return res.status(403).json({ error: 'Access denied. You are not in this group.' });
    }

    res.json(group);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch group' });
  }
};

// Update group name or members
const updateGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    if (name) group.name = name;
    if (members) group.members = members;

    await group.save();
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update group' });
  }
};

// Delete a group
const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    if (!group.members.includes(req.user._id)) {
      return res.status(403).json({ error: 'Access denied.' });
    }

    await group.remove();
    res.json({ message: 'Group deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete group' });
  }
};

module.exports = {
  createGroup,
  getUserGroups,
  getGroupById,
  updateGroup,
  deleteGroup
};
