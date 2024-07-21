import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import CreateTherapistsTable from './components/TherapistsTable/CreateTherapistsTable'
import Patients from './pages/Patients/Patients'
import CreatePatientsTable from './components/PatientsTable.jsx/CreatePatientTable'
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
        </Routes>
      </Router>
    </>
  )
}

export default App
