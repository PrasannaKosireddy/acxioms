import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

const dashboardData = {
  kpis: [
    { title: 'Total Customers', value: '1,248', trend: '+12.5%', icon: 'bi-people-fill', color: 'blue' },
    { title: 'Total Leads', value: '356', trend: '+8.2%', icon: 'bi-person-plus-fill', color: 'violet' },
    { title: 'Open Opportunities', value: '87', trend: '+4.6%', icon: 'bi-bullseye', color: 'orange' },
    { title: 'Won Opportunities', value: '42', trend: '+18.3%', icon: 'bi-trophy-fill', color: 'green' },
    { title: 'Lost Opportunities', value: '18', trend: '-2.1%', icon: 'bi-x-circle-fill', color: 'red', negative: true },
    { title: 'Total Pipeline Value', value: '₹24.6M', trend: '+14.8%', icon: 'bi-currency-rupee', color: 'teal' },
    { title: 'Open Leads', value: '214', trend: '+6.4%', icon: 'bi-chat-left-text-fill', color: 'indigo' },
    { title: 'Pending Follow-Ups', value: '36', trend: 'Needs attention', icon: 'bi-clock-fill', color: 'yellow', warning: true },
  ],
  activities: [
    { icon: 'bi-person-plus-fill', color: 'blue', text: 'Admin User created a new customer', time: '2 minutes ago' },
    { icon: 'bi-lightning-fill', color: 'violet', text: 'Sales Executive created a new lead', time: '15 minutes ago' },
    { icon: 'bi-pencil-fill', color: 'orange', text: 'Manager updated an opportunity', time: '1 hour ago' },
    { icon: 'bi-check-lg', color: 'green', text: 'Admin User completed a follow-up', time: '2 hours ago' },
  ],
  followUps: [
    { company: 'Acme Corporation', type: 'Call', date: 'Today - 4:00 PM', icon: 'bi-telephone-fill', color: 'blue' },
    { company: 'Tech Solutions Ltd', type: 'Meeting', date: 'Tomorrow - 10:30 AM', icon: 'bi-camera-video-fill', color: 'violet' },
    { company: 'Global Enterprises', type: 'Email', date: 'Tomorrow - 3:00 PM', icon: 'bi-envelope-fill', color: 'orange' },
  ],
  leadStatus: {
    labels: ['New', 'Contacted', 'Qualified', 'Lost', 'Converted'],
    datasets: [{
      data: [86, 64, 52, 38, 42],
      backgroundColor: ['#4d7cff', '#9b7bff', '#f5a44b', '#f06e81', '#39c69a'],
      borderWidth: 0,
      borderRadius: 5,
      barThickness: 18,
    }],
  },
  opportunityPipeline: {
    labels: ['Qualification', 'Proposal', 'Negotiation', 'Won', 'Lost'],
    datasets: [{
      data: [42, 30, 22, 18, 9],
      backgroundColor: ['#537cff', '#8c74f5', '#f0a24d', '#36c594', '#ed7081'],
      borderWidth: 0,
      borderRadius: 4,
      barThickness: 18,
    }],
  },
  salesTrend: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [38, 46, 42, 61, 55, 74],
      borderColor: '#4d7cff',
      backgroundColor: 'rgba(77,124,255,.12)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 2,
    }],
  },
}

const users = [
  { email: 'admin@acxioms.com', password: 'admin123', name: 'Admin User' },
]

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'AcxiomCRM API is running' })
})

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {}
  const normalizedEmail = String(email || '').trim().toLowerCase()
  const user = users.find(
    (item) => item.email.toLowerCase() === normalizedEmail && item.password === String(password || ''),
  )

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' })
  }

  return res.json({
    message: 'Login successful',
    user: { name: user.name, email: user.email },
    dashboard: dashboardData,
  })
})

app.get('/api/dashboard', (_req, res) => {
  res.json(dashboardData)
})

app.listen(PORT, () => {
  console.log(`AcxiomCRM backend running on http://localhost:${PORT}`)
})
