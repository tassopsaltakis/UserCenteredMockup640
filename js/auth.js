let users = []
async function loadUsers() {
  try {
    const res = await fetch('users.json')
    const fileUsers = await res.json()
    const stored = JSON.parse(localStorage.getItem('newUsers') || '[]')
    users = fileUsers.concat(stored)
  } catch {
    users = JSON.parse(localStorage.getItem('newUsers') || '[]')
  }
}
async function initAuth() {
  await loadUsers()
  const loginForm = document.getElementById('login-form')
  const errorDiv = document.getElementById('error')
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault()
      const u = document.getElementById('username').value
      const p = document.getElementById('password').value
      await loadUsers()
      if (users.find(x => x.username === u && x.password === p)) {
        localStorage.setItem('loggedIn', 'true')
        window.location.href = 'index.html'
      } else {
        errorDiv.textContent = 'Invalid credentials'
        errorDiv.classList.remove('d-none')
      }
    })
  } else {
    if (localStorage.getItem('loggedIn') !== 'true') {
      window.location.href = 'login.html'
    }
    const logoutBtn = document.getElementById('logout')
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn')
        window.location.href = 'login.html'
      })
    }
  }
}
initAuth()
