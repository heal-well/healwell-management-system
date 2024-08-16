import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import CreateTherapistsTable from './components/TherapistsTable/CreateTherapistsTable'
import Patients from './pages/Patients/Patients'
import CreatePatientsTable from './components/PatientsTable.jsx/CreatePatientTable'
import Session from './pages/Session/Session'
import CreateSessionTable from './components/Sessions/CreateSessionTable'
import TherapistHistory from './pages/TherapistHistory/TherapistHistory'
import SignIn from './pages/Authentication/Signin'
import { AuthProvider } from './components/context/authContext'
import PrivateRoute from './routes/PrivateRoutes/PrivateRoutes'

function App () {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<SignIn />} />
          <Route path='/' element={<PrivateRoute element={AdminDashboard} />} />
          <Route
            path='/therapists/create'
            element={<PrivateRoute element={CreateTherapistsTable} />}
          />
          <Route
            path='/therapists/edit/:id'
            element={<PrivateRoute element={CreateTherapistsTable} />}
          />
          <Route
            path='/patients'
            element={<PrivateRoute element={Patients} />}
          />
          <Route
            path='/patients/create'
            element={<PrivateRoute element={CreatePatientsTable} />}
          />
          <Route
            path='/patients/edit/:id'
            element={<PrivateRoute element={CreatePatientsTable} />}
          />
          <Route
            path='/treatments'
            element={<PrivateRoute element={Session} />}
          />
          <Route
            path='/treatments/create'
            element={<PrivateRoute element={CreateSessionTable} />}
          />
          <Route
            path='/treatments/edit/:id'
            element={<PrivateRoute element={CreateSessionTable} />}
          />
          <Route
            path='/history'
            element={<PrivateRoute element={TherapistHistory} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
