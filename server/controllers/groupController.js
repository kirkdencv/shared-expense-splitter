const mongoose = require('mongoose');
const Group = require('../models/Group');
const User = require('../models/User');

// Create Group
exports.createGroup = async (req, res) => {
  try {
    const creatorId = req.user._id;
    const { name, description, members = [] } = req.body;

    // validate group name
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Group name is required' });
    }

    // check for existing group name by same user
    const existingGroup = await Group.findOne({ name: name.trim(), createdBy: creatorId });
    if (existingGroup) {
      return res.status(400).json({ error: 'You already created a group with this name' });
    }

    // check if each member IDs are valid
    const allMemberIds = [...members, creatorId.toString()];
    const uniqueMemberIds = [...new Set(allMemberIds)];

    const invalidIds = uniqueMemberIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return res.status(400).json({ error: 'One or more member IDs are invalid' });
    }

    // check if all members exist
    const users = await User.find({ _id: { $in: uniqueMemberIds } });
    if (users.length !== uniqueMemberIds.length) {
      return res.status(400).json({ error: 'One or more member IDs do not exist' });
    }

    const group = new Group({
      name: name.trim(),
      description: description?.trim(),
      createdBy: creatorId,
      members: uniqueMemberIds
    });

    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Get all groups
exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('members createdBy', 'name email');
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single group by ID
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('members createdBy', 'name email');
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update group
exports.updateGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    // Only creator can update
    if (group.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Only the group creator can update this group' });
    }

    const updates = req.body;

    // 1. Group name must not be empty if being updated
    if ('name' in updates && (!updates.name || updates.name.trim() === '')) {
      return res.status(400).json({ error: 'Group name cannot be empty' });
    }

    // 2. Prevent duplicate group name by same creator
    if (updates.name) {
      const duplicate = await Group.findOne({
        _id: { $ne: req.params.id },
        name: updates.name.trim(),
        createdBy: req.user._id
      });
      if (duplicate) {
        return res.status(400).json({ error: 'You already have a group with that name' });
      }
    }

    // 3. Validate updated member IDs and ensure creator is in the list
    if (updates.members && Array.isArray(updates.members)) {
      const creatorIdStr = group.createdBy.toString();

      // Validate format
      const allValid = updates.members.every(id => mongoose.Types.ObjectId.isValid(id));
      if (!allValid) {
        return res.status(400).json({ error: 'One or more member IDs are invalid' });
      }

      // Validate existence
      const memberIds = Array.from(new Set([...updates.members.map(id => id.toString()), creatorIdStr]));
      const users = await User.find({ _id: { $in: memberIds } });
      if (users.length !== memberIds.length) {
        return res.status(400).json({ error: 'One or more member IDs do not exist' });
      }

      updates.members = memberIds;
    }

    // Final update
    const updatedGroup = await Group.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updatedGroup);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete group
exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.json({ message: 'Group deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
