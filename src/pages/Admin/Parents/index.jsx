import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useAxiosWithAuth } from "../../../hooks/UseAxiosWithAuth"
import { Modal, Button } from "react-bootstrap"
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router"
import Swal from "sweetalert2"
const Parents = () => {
  const [parents, setParents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedParent, setSelectedParent] = useState(null)
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
  const navigate = useNavigate()

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
    return gender === 0 ? "Kişi" : gender === 1 ? "Qadın" : "Naməlum"
  }

  useEffect(() => {
    const fetchParents = async () => {
      try {
        setLoading(true)
        const res = await axiosAuth.get("https://turanapi2-001-site1.jtempurl.com/api/User/GetAllParents/parents")
        setParents(res.data.data)
      } catch (err) {
        console.error("Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchParents()
  }, [])

  const handleDetail = (parent) => {
    setSelectedParent(parent)
    setShowModal(true)
  }

  const handleUpdate = (parent) => {
    setEditData({
      ...parent,
      dob: parent.dob?.split("T")[0] || ""
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


  const handleDelete = async (parent) => {
    const result = await Swal.fire({
      title: `Silinsin?`,
      text: `${parent.firstName} ${parent.lastName} adlı valideyni silmək istəyirsiniz?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Bəli, sil!',
      cancelButtonText: 'Ləğv et'
    })

    if (result.isConfirmed) {
      try {
        await axiosAuth.delete(`https://turanapi2-001-site1.jtempurl.com/api/User/DeleteParent/parents/${parent.id}`)
        setParents((prev) => prev.filter(p => p.id !== parent.id))
        Swal.fire(
          'Silindi!',
          'Valideyn uğurla silindi.',
          'success'
        )
      } catch (error) {
        console.error("Valideyni silərkən xəta baş verdi:", error)
        Swal.fire(
          'Xəta!',
          'Valideyni silmək mümkün olmadı. Yenidən cəhd edin.',
          'error'
        )
      }
    }
  }

  const renderProfileImage = (parent) => {
    if (parent.imgUrl) {
      return <img src={parent.imgUrl} alt="profile" className="rounded-circle" width={40} height={40} />
    }
    return (
      <div
        className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
        style={{ width: "40px", height: "40px", fontSize: "14px" }}
      >
        {parent.firstName?.charAt(0)}
        {parent.lastName?.charAt(0)}
      </div>
    )
  }

  const handleSaveChanges = () => {
    console.log("Updated Parent Data:", editData)
    setShowEditModal(false)
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
            <div className="card-header bg-danger text-white">
              <h4 className="mb-0">
                <i className="bi bi-person-workspace me-2"></i>
                Valideynlərin İdarəolunması
              </h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Profil</th>
                      <th>Ad</th>
                      <th>Soyad</th>
                      <th>Yaş</th>
                      <th>Cins</th>
                      <th>Tam Ad</th>
                      <th className="text-center">Əməliyyatlar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parents.map((parent, index) => (
                      <motion.tr
                        key={parent.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="align-middle"
                      >
                        <td>{index + 1}</td>
                        <td>{renderProfileImage(parent)}</td>
                        <td>{parent.firstName}</td>
                        <td>{parent.lastName}</td>
                        <td>{calculateAge(parent.dob)}</td>
                        <td>{getGenderLabel(parent.gender)}</td>
                        <td>{parent.firstName} {parent.lastName}</td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn btn-outline-info btn-sm"
                              onClick={() => handleDetail(parent)}
                            >
                              <FaEye />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn btn-outline-warning btn-sm"
                              onClick={() => handleUpdate(parent)}
                            >
                              <FaEdit />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(parent)}
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

              {parents.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-person-x display-1 text-muted"></i>
                  <h5 className="text-muted mt-3">Valideyn tapılmadı</h5>
                </div>
              )}
            </div>
            <div className="card-footer d-flex justify-content-between bg-light">
              <small className="text-muted">Ümumi Valideynlər: {parents.length}</small>
              <button className="btn btn-success btn-sm" onClick={() => navigate("/admin-panel/add-parent")}>
                <FaPlus /> Yeni Valideyn Əlavə Et
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Valideyn Məlumatları</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedParent && (
            <div>
              <p><strong>ID:</strong> {selectedParent.id}</p>
              <p><strong>Tam Ad:</strong> {selectedParent.firstName} {selectedParent.lastName}</p>
              <p><strong>Cins:</strong> {getGenderLabel(selectedParent.gender)}</p>
              <p><strong>Yaş:</strong> {calculateAge(selectedParent.dob)}</p>
              <p><strong>Ünvan:</strong> {selectedParent.address}</p>
              <p><strong>Doğum Tarixi:</strong> {new Date(selectedParent.dob).toLocaleDateString()}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Bağla
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Valideyni Redaktə Et</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex flex-column gap-3">
            <input
              type="text"
              name="firstName"
              value={editData.firstName}
              onChange={handleEditChange}
              className="form-control"
              placeholder="Ad"
            />
            <input
              type="text"
              name="lastName"
              value={editData.lastName}
              onChange={handleEditChange}
              className="form-control"
              placeholder="Soyad"
            />
            <select
              name="gender"
              value={editData.gender}
              onChange={handleEditChange}
              className="form-select"
            >
              <option value={0}>Kişi</option>
              <option value={1}>Qadın</option>
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
              placeholder="Ünvan"
              rows={3}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Ləğv et
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Dəyişiklikləri yadda saxla
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  )
}

export default Parents
