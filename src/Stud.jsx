import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Stud() {
  const [show, setShow] = useState(false);
  const [ushow, setUShow] = useState(false);

  const [nm, setName] = useState("");
  const [mb, setMob] = useState("");
  const [ct, setCity] = useState("");
  const [id, setId] = useState("");

  const [cs, setCs] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUClose = () => setUShow(false);
  const handleUShow = () => setUShow(true);

  // Fetch Data
  const api = () => {
    axios.get("http://localhost:8080/get").then((res) => {
      setCs(res.data);
    });
  };

  useEffect(() => {
    api();
  }, []);

  // Save Data
  const save = () => {
    const dt = {
      sname: nm,
      mob: mb,
      city: ct,
    };

    axios.post("http://localhost:8080/save", dt).then(() => {
      alert("Saved Successfully");
      api();
      setShow(false);
    });
  };

  // Update Data
  const updt = () => {
    const dt = {
      sname: nm,
      mob: mb,
      city: ct,
      sid: id,
    };

    axios.put("http://localhost:8080/updt", dt).then(() => {
      alert("Update Success");
      api();
      setUShow(false);
    });
  };

  // Delete Data
  const del = (id) => {
    axios.delete(`http://localhost:8080/del/${id}`).then(() => {
      alert("Delete Success");
      api();
    });
  };

  // Set data for update
  const getId = (id, nm, mb, ct) => {
    setId(id);
    setName(nm);
    setMob(mb);
    setCity(ct);
    handleUShow();
  };

  return (
    <div className="container mt-3">
      <h2>View API Data</h2>

      <Button variant="primary" onClick={handleShow}>
        Launch demo model
      </Button>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cs.map((item) => (
            <tr key={item.sid}>
              <td>{item.sid}</td>
              <td>{item.sname}</td>
              <td>{item.mob}</td>
              <td>{item.city}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() =>
                    getId(item.sid, item.sname, item.mob, item.city)
                  }
                >
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => del(item.sid)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Control
              placeholder="Mobile"
              className="mt-2"
              onChange={(e) => setMob(e.target.value)}
            />
            <Form.Control
              placeholder="City"
              className="mt-2"
              onChange={(e) => setCity(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={save}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal show={ushow} onHide={handleUClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control value={nm} onChange={(e) => setName(e.target.value)} />
            <Form.Control
              value={mb}
              className="mt-2"
              onChange={(e) => setMob(e.target.value)}
            />
            <Form.Control
              value={ct}
              className="mt-2"
              onChange={(e) => setCity(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={updt}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}