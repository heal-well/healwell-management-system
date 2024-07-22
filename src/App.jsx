import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import CreateTherapistsTable from './components/TherapistsTable/CreateTherapistsTable'
import Patients from './pages/Patients/Patients'
import CreatePatientsTable from './components/PatientsTable.jsx/CreatePatientTable'
import Session from './pages/Session/Session'
import CreateSessionTable from './components/Sessions/CreateSessionTable'
function App () {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<AdminDashboard />} />
          <Route
            path='/therapists/create'
            element={<CreateTherapistsTable />}
          />
          <Route path='/patients' element={<Patients />} />
          <Route path='/patients/create' element={<CreatePatientsTable />} />
          <Route path='/treatments' element={<Session />} />
          <Route path='/treatments/create' element={<CreateSessionTable />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
