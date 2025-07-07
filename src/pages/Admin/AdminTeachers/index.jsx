import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useAxiosWithAuth } from "../../../hooks/UseAxiosWithAuth"
import { Modal, Button } from "react-bootstrap"
import { FaEdit, FaEye, FaTrash } from "react-icons/fa"
import Swal from "sweetalert2"

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const axiosAuth = useAxiosWithAuth()
  const [showEditModal, setShowEditModal] = useState(false)
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    gender: 0,
    dob: "",
    address: ""
  })




  const calculateAge = (dob) => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const getGenderLabel = (gender) => {
    return gender === 0 ? "Male" : gender === 1 ? "Female" : "Unknown"
  }

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true)
        const res = await axiosAuth.get("https://turansalimli-001-site1.ntempurl.com/api/User/GetAllTeachers/teachers")
        setTeachers(res.data.data)
        console.log(res.data)
      } catch (err) {
        console.error("Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTeachers()
  }, [])

  const handleDetail = (teacher) => {
    setSelectedTeacher(teacher)
    setShowModal(true)
  }

  const handleUpdate = (teacher) => {
    setEditData({
      ...teacher,
      dob: teacher.dob?.split("T")[0] || ""
    })
    setShowEditModal(true)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDelete = async (teacher) => {
    console.log(teacher.id)
    const result = await Swal.fire({
      title: 'Silinsin?',
      text: `${teacher.firstName} ${teacher.lastName} adlı müəllimi silmək istəyirsiniz?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Bəli, sil!',
      cancelButtonText: 'Ləğv et'
    })

    if (result.isConfirmed) {
      try {
        await axiosAuth.delete(`https://turansalimli-001-site1.ntempurl.com/api/User/DeleteTeacher/teachers/${teacher.id}`)
        setTeachers((prev) => prev.filter(t => t.id !== teacher.id))
        Swal.fire(
          'Silindi!',
          'Müəllim uğurla silindi.',
          'success'
        )
      } catch (error) {
        console.error("Müəllimi silərkən xəta baş verdi:", error)
        Swal.fire(
          'Xəta!',
          'Müəllimi silmək mümkün olmadı. Yenidən cəhd edin.',
          'error'
        )
      }
    }
  }


  const renderProfileImage = (teacher) => {
    if (teacher.imgUrl) {
      return <img src={teacher.imgUrl} alt="profile" className="rounded-circle" width={40} height={40} />
    }
    return (
      <div
        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
        style={{ width: "40px", height: "40px", fontSize: "14px" }}
      >
        {teacher.firstName?.charAt(0)}
        {teacher.lastName?.charAt(0)}
      </div>
    )
  }
  const handleSaveChanges = () => {
    console.log("Updated Teacher Data:", editData)
    setShowEditModal(false)

    // Əgər istəsən, burada PUT və ya PATCH request də ata bilərik:
    // await axiosAuth.put(`/api/User/update/${editData.id}`, editData)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container-fluid p-4"
      style={{ width: "130%", display: "flex", justifyContent: "center" }}
    >
      <div className="row" style={{ width: "900px", padding: "10px" }}>
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                <i className="bi bi-person-workspace me-2"></i>
                Teachers Management
              </h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Profile</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Full Name</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher, index) => (
                      <motion.tr
                        key={teacher.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="align-middle"
                      >
                        <td>{index + 1}</td>
                        <td>{renderProfileImage(teacher)}</td>
                        <td>{teacher.firstName}</td>
                        <td>{teacher.lastName}</td>
                        <td>{calculateAge(teacher.dob)}</td>
                        <td>{getGenderLabel(teacher.gender)}</td>
                        <td>
                          {teacher.firstName} {teacher.lastName}
                        </td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn btn-outline-info btn-sm"
                              onClick={() => handleDetail(teacher)}
                            >
                              <FaEye />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn btn-outline-warning btn-sm"
                              onClick={() => handleUpdate(teacher)}
                            >
                              <FaEdit />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(teacher)}
                            >
                              <FaTrash />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {teachers.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-person-x display-1 text-muted"></i>
                  <h5 className="text-muted mt-3">No teachers found</h5>
                </div>
              )}
            </div>
            <div className="card-footer d-flex justify-content-between bg-light">
              <small className="text-muted">Total Teachers: {teachers.length}</small>
              <button className="btn btn-primary btn-sm">
                <i className="bi bi-plus-circle me-1"></i>Add New Teacher
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Teacher Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTeacher && (
            <div>
              <p><strong>ID:</strong> {selectedTeacher.id}</p>
              <p><strong>Full Name:</strong> {selectedTeacher.firstName} {selectedTeacher.lastName}</p>
              <p><strong>Gender:</strong> {getGenderLabel(selectedTeacher.gender)}</p>
              <p><strong>Age:</strong> {calculateAge(selectedTeacher.dob)}</p>
              <p><strong>Address:</strong> {selectedTeacher.address}</p>
              <p><strong>Date of Birth:</strong> {new Date(selectedTeacher.dob).toLocaleDateString()}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex flex-column gap-3">
            <input
              type="text"
              name="firstName"
              value={editData.firstName}
              onChange={handleEditChange}
              className="form-control"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={editData.lastName}
              onChange={handleEditChange}
              className="form-control"
              placeholder="Last Name"
            />
            <select
              name="gender"
              value={editData.gender}
              onChange={handleEditChange}
              className="form-select"
            >
              <option value={0}>Male</option>
              <option value={1}>Female</option>
            </select>
            <input
              type="date"
              name="dob"
              value={editData.dob}
              onChange={handleEditChange}
              className="form-control"
            />
            <textarea
              name="address"
              value={editData.address}
              onChange={handleEditChange}
              className="form-control"
              placeholder="Address"
              rows={3}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </motion.div>
  )
}

export default AdminTeachers
