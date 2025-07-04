
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useAxiosWithAuth } from "../../../hooks/UseAxiosWithAuth"

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const axiosAuth = useAxiosWithAuth()

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true)
        const res = await axiosAuth.get("http://turansalimli-001-site1.ntempurl.com/api/User/teachers")
        console.log(res)
        setTeachers(res.data.data)
      } catch (err) {
        console.error("Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTeachers()
  }, [])

  const handleUpdate = (teacher) => {
    console.log("Update teacher:", teacher)
  }

  const handleDelete = (teacher) => {
    console.log("Delete teacher:", teacher)
    // Add your delete logic here
  }

  const handleDetail = (teacher) => {
    console.log("View teacher details:", teacher)
    // Add your detail view logic here
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container-fluid p-4"
    >
      <div className="row">
        <div className="col-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="card shadow-sm"
          >
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
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Full Name</th>
                      <th scope="col" className="text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="align-middle"
                      >
                        <th scope="row" className="text-muted">
                          {index + 1}
                        </th>
                        <td>
                          <span className="fw-medium">{teacher.firstName}</span>
                        </td>
                        <td>
                          <span className="fw-medium">{teacher.lastName}</span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2"
                              style={{ width: "32px", height: "32px" }}
                            >
                              <span className="text-white fw-bold small">
                                {teacher.firstName?.charAt(0)}
                                {teacher.lastName?.charAt(0)}
                              </span>
                            </div>
                            <span className="text-dark fw-semibold">
                              {teacher.firstName} {teacher.lastName}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn btn-outline-info btn-sm"
                              onClick={() => handleDetail(teacher)}
                              title="View Details"
                            >
                              <i className="bi bi-eye"></i>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn btn-outline-warning btn-sm"
                              onClick={() => handleUpdate(teacher)}
                              title="Update Teacher"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(teacher)}
                              title="Delete Teacher"
                            >
                              <i className="bi bi-trash"></i>
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {teachers.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-5">
                  <i className="bi bi-person-x display-1 text-muted"></i>
                  <h5 className="text-muted mt-3">No teachers found</h5>
                  <p className="text-muted">There are no teachers to display at the moment.</p>
                </motion.div>
              )}
            </div>
            <div className="card-footer bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Total Teachers: <span className="fw-bold">{teachers.length}</span>
                </small>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-sm"
                >
                  <i className="bi bi-plus-circle me-1"></i>
                  Add New Teacher
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminTeachers
