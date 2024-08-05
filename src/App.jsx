import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import CreateTherapistsTable from './components/TherapistsTable/CreateTherapistsTable'
import Patients from './pages/Patients/Patients'
import CreatePatientsTable from './components/PatientsTable.jsx/CreatePatientTable'
import Session from './pages/Session/Session'
import CreateSessionTable from './components/Sessions/CreateSessionTable'
import TherapistHistory from './pages/TherapistHistory/TherapistHistory'
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
          <Route path='/history' element={<TherapistHistory />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
