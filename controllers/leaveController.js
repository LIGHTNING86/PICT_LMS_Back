const { StudentLeave, FacultyLeave } = require('../models/leaveModel');

// Controller functions for Student leave
exports.createStudentLeave = async (req, res) => {
  try {
    const newLeave = await StudentLeave.create(req.body);
    res.status(201).json(newLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getStudentLeaves = async (req, res) => {
  const { registrationNo, studentFacultyID, studentMentorID, approvedMentor } = req.query; // Extract registrationNo from query parameters

  try {
    let query = {};
    if (studentFacultyID) {
      query.studentFacultyID = studentFacultyID;
    }
    if (studentMentorID) {
      query.studentMentorID = studentMentorID;
    }
    if (registrationNo) {
      query.registrationNo = registrationNo;
    }
    if (approvedMentor) {
      query.approvedMentor = true;
    }
    const leaves = await StudentLeave.find(query);
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentLeaveById = async (req, res) => {
  try {
    const leave = await StudentLeave.findById(req.params.id);
    if (!leave) {
      return res.status(404).send({ message: 'Leave application not found' });
    }
    res.status(200).send(leave);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Controller functions for Faculty leave
exports.createFacultyLeave = async (req, res) => {
  try {
    const newLeave = await FacultyLeave.create(req.body);
    res.status(201).json(newLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFacultyLeaves = async (req, res) => {
  try {
    const leaves = await FacultyLeave.find();
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve and Decline student leave
exports.approveStudentLeave = async (req, res) => {
  try {
    const { remarkFaculty } = req.body;
    const updatedLeave = await StudentLeave.findByIdAndUpdate(
      req.params.id,
      { approvedFaculty: true, remarkFaculty, approvedFacultyAt: new Date(), discussFaculty: null, discussFacultyAt: null },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave application not found' });
    }

    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.declineStudentLeave = async (req, res) => {
  try {
    const { remarkFaculty } = req.body;
    const updatedLeave = await StudentLeave.findByIdAndUpdate(
      req.params.id,
      { approvedFaculty: false, remarkFaculty, approvedFacultyAt: new Date(), discussFaculty: null, discussFacultyAt: null },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave application not found' });
    }

    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.discussStudentLeave = async (req, res) => {
  try {
    const { remarkFaculty } = req.body;
    const updatedLeave = await StudentLeave.findByIdAndUpdate(
      req.params.id,
      { discussFaculty: true, remarkFaculty, discussFacultyAt: new Date(), approvedFaculty: null, approvedFacultyAt: null },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave application not found' });
    }

    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Cancel student leave application
exports.cancelStudentLeave = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await StudentLeave.findByIdAndUpdate(id, {
      cancelled: true,
      cancelledAt: new Date()
    }, { new: true });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling application', error });
  }
};

// Approve and Decline mentor-specific student leave
exports.approveMentorStudentLeave = async (req, res) => {
  try {
    const { remarkMentor } = req.body;
    const updatedLeave = await StudentLeave.findByIdAndUpdate(
      req.params.id,
      { approvedMentor: true, remarkMentor, approvedMentorAt: new Date(), discussMentor: null, discussMentorAt: null, approvedFaculty: null, approvedFacultyAt: null },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave application not found' });
    }

    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.declineMentorStudentLeave = async (req, res) => {
  try {
    const { remarkMentor } = req.body;
    const updatedLeave = await StudentLeave.findByIdAndUpdate(
      req.params.id,
      { approvedMentor: false, remarkMentor, approvedMentorAt: new Date(), discussMentor: null, discussMentorAt: null, approvedFaculty: null, approvedFacultyAt: null },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave application not found' });
    }

    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Discuss
exports.discussMentorStudentLeave = async (req, res) => {
  try {
    const { remarkMentor } = req.body;
    const updatedLeave = await StudentLeave.findByIdAndUpdate(
      req.params.id,
      { discussMentor: true, remarkMentor, discussMentorAt: new Date(), approvedMentor: null, approvedMentorAt: null },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave application not found' });
    }

    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
