import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Admin from '../models/Admin.js'

export const register = async (req, res) => {
  try {
    const { username, password } = req.body

    const existingAdmin = await Admin.findOne({ username })
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const admin = await Admin.create({ username, password: hashedPassword })
    res.status(201).json({ message: 'Admin registered successfully', admin })
  } catch (error) {
    console.error('Error registering admin', error.message)
    res.status(50).json({ message: 'Internal server error' })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const admin = await Admin.findOne({ username })
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h'
    })

    res.status(200).json({
      message: 'Admin logged in successfully',
      token,
      username
    })
  } catch (error) {
    console.error('Error logging in', error.message)
    res.status(500).json({ message: 'Internal server error' })
  }
}
