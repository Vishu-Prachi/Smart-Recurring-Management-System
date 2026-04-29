import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Rduser() {
  const [cs, setCs] = useState([]);
  const [show, setShow] = useState(false);
  const [ushow, setUShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUClose = () => setUShow(false);
  const handleUShow = () => setUShow(true);

  // form states
  const [rid, setRid] = useState(0);
  const [nm, setName] = useState("");
  const [adr, setAdr] = useState("");
  const [dob, setDob] = useState("");
  const [gen, setGen] = useState("");
  const [rdt, setRdDate] = useState("");
  const [ramt, setRamt] = useState("");
  const [ocp, setOcp] = useState("");
  const [acno, setAcno] = useState("");
  const [adhno, setAdhno] = useState("");
  const [pnno, setPnno] = useState("");
  const [nnm, setNname] = useState("");
  const [nadr, setNadr] = useState("");
  const [nadhno, setNadhno] = useState("");
  const [npnno, setNpanno] = useState("");

  // handlers
  const getnm = (e) => setName(e.target.value);
  const getadr = (e) => setAdr(e.target.value);
  const getdob = (e) => setDob(e.target.value);
  const getgen = (e) => setGen(e.target.value);
  const getrdt = (e) => setRdDate(e.target.value);
  const getramt = (e) => setRamt(e.target.value);
  const getocp = (e) => setOcp(e.target.value);
  const getacno = (e) => setAcno(e.target.value);
  const getadno = (e) => setAdhno(e.target.value);
  const getpnno = (e) => setPnno(e.target.value);
  const getnnm = (e) => setNname(e.target.value);
  const getnadr = (e) => setNadr(e.target.value);
  const getnadhno = (e) => setNadhno(e.target.value);
  const getnpnno = (e) => setNpanno(e.target.value);

  // GET ALL USERS
  const rduser = () => {
    axios.get("http://localhost:8080/rduser").then((res) => {
      setCs(res.data);
    });
  };

  useEffect(() => {
    rduser();
  }, []);

  // SAVE
  const save = () => {
    const dt = {
      accupation: ocp,
      acno,
      addr: adr,
      adharno: adhno,
      dob,
      gender: gen,
      naddr: nadr,
      nadharno: nadhno,
      name: nm,
      nname: nnm,
      npanno: npnno,
      panno: pnno,
      rdamt: ramt,
      rddate: rdt,
    };

    axios.post("http://localhost:8080/save", dt).then(() => {
      alert("Saved Successfully");
      rduser();
      setShow(false);
    });
  };

  // DELETE
  const del = (id) => {
    axios
      .delete("http://localhost:8080/dlt/" + id)
      .then((res) => {
        if (res.status === 200) {
          alert("Deleted Successfully");
          rduser();
        }
      })
      .catch(() => alert("Delete Failed"));
  };

  // OPEN UPDATE MODAL (FIXED: removed duplicate getId)
  const getUser = (user) => {
    setRid(user.rid);
    setName(user.name);
    setAdr(user.addr);
    setDob(user.dob);
    setGen(user.gender);
    setRdDate(user.rddate);
    setRamt(user.rdamt);
    setOcp(user.accupation);
    setAcno(user.acno);
    setAdhno(user.adharno);
    setPnno(user.panno);
    setNname(user.nname);
    setNadr(user.naddr);
    setNadhno(user.nadharno);
    setNpanno(user.npanno);

    handleUShow();
  };

  // UPDATE
  const update = () => {
    const dt = {
       rid: rid,
  accupation: ocp,
  acno: acno,
  addr: adr,
  adharno: adhno,
  dob: dob,
  gender: gen,
  name: nm,
  nname: nnm,
  naddr: nadr,        // ✅ missing
  nadharno: nadhno,   // ✅ missing
  npanno: npnno,
  panno: pnno,
  rdamt: ramt,
  rddate: rdt,
    };

    axios
      .put("http://localhost:8080/updt", dt)
      .then(() => {
        alert("Updated Successfully");
        rduser();
        setUShow(false);
      })
      .catch(() => alert("Update Failed"));
  };

  return (
    <div className="container mt-3">
      <Button onClick={handleShow}>Add New RD User</Button>

      {/* ADD MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add RD User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Control onChange={getnm} placeholder="Name" className="mt-2" />
            <Form.Control onChange={getadr} placeholder="Address" className="mt-2" />
            <Form.Control type="date" onChange={getdob} className="mt-2" />
            <Form.Control onChange={getgen} placeholder="Gender" className="mt-2" />
            <Form.Control type="date" onChange={getrdt} className="mt-2" />
            <Form.Control onChange={getramt} placeholder="Amount" className="mt-2" />
            <Form.Control onChange={getocp} placeholder="Occupation" className="mt-2" />
            <Form.Control onChange={getacno} placeholder="Account No" className="mt-2" />
            <Form.Control onChange={getadno} placeholder="Aadhar No" className="mt-2" />
            <Form.Control onChange={getpnno} placeholder="PAN No" className="mt-2" />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={save}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* UPDATE MODAL */}
      <Modal show={ushow} onHide={handleUClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update RD User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Control value={nm || ""} onChange={getnm} className="mt-2" />
            <Form.Control value={adr} onChange={getadr} className="mt-2" />
            <Form.Control value={dob} onChange={getdob} className="mt-2" />
            <Form.Control value={gen} onChange={getgen} className="mt-2" />
            <Form.Control value={rdt} onChange={getrdt} className="mt-2" />
            <Form.Control value={ramt} onChange={getramt} className="mt-2" />
            <Form.Control value={ocp} onChange={getocp} className="mt-2" />
            <Form.Control value={acno} onChange={getacno} className="mt-2" />
            <Form.Control value={adhno} onChange={getadno} className="mt-2" />
            <Form.Control value={pnno} onChange={getpnno} className="mt-2" />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleUClose}>Close</Button>
          <Button onClick={update}>Update</Button>
        </Modal.Footer>
      </Modal>

      {/* TABLE */}
      <h3 className="mt-4">RD Users</h3>

      <table className="table table-dark table-bordered mt-3">
        <thead>
          <tr>
            <th>RID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Occupation</th>
            <th>Account</th>
            <th>Aadhar</th>
            <th>PAN</th>
            <th>Address</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {cs.map((user) => (
            <tr key={user.rid}>
              <td>{user.rid}</td>
              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>{user.dob}</td>
              <td>{user.accupation}</td>
              <td>{user.acno}</td>
              <td>{user.adharno}</td>
              <td>{user.panno}</td>
              <td>{user.addr}</td>
              <td>{user.rdamt}</td>
              <td>{user.rddate}</td>
              <td>
                <Button variant="danger" onClick={() => del(user.rid)}>Delete</Button>{" "}
                <Button variant="warning" onClick={() => getUser(user)}>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}