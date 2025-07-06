// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

// DOM elements
const authModal = document.getElementById('authModal')
const authForm = document.getElementById('authForm')
const authTitle = document.getElementById('authTitle')
const authSubmit = document.getElementById('authSubmit')
const toggleAuth = document.getElementById('toggleAuth')
const dashboard = document.getElementById('dashboard')
const userApiKey = document.getElementById('userApiKey')
const copyApiKey = document.getElementById('copyApiKey')

// State
let isSignUp = true

// Event listeners
document.getElementById('loginBtn').addEventListener('click', () => {
    isSignUp = false
    updateAuthModal()
    showModal()
})

document.getElementById('signupBtn').addEventListener('click', () => {
    isSignUp = true
    updateAuthModal()
    showModal()
})

document.getElementById('heroSignupBtn').addEventListener('click', () => {
    isSignUp = true
    updateAuthModal()
    showModal()
})

document.getElementById('closeModal').addEventListener('click', hideModal)

document.getElementById('toggleAuth').addEventListener('click', () => {
    isSignUp = !isSignUp
    updateAuthModal()
})

authForm.addEventListener('submit', handleAuth)

document.getElementById('copyApiKey').addEventListener('click', copyToClipboard)

document.getElementById('signOutBtn').addEventListener('click', signOut)

// Check if user is already logged in
checkUser()

function updateAuthModal() {
    if (isSignUp) {
        authTitle.textContent = 'Create Your Account'
        authSubmit.textContent = 'Sign Up'
        toggleAuth.textContent = 'Already have an account? Sign in'
    } else {
        authTitle.textContent = 'Welcome Back'
        authSubmit.textContent = 'Sign In'
        toggleAuth.textContent = "Don't have an account? Sign up"
    }
}

function showModal() {
    authModal.classList.remove('hidden')
    authModal.classList.add('flex')
}

function hideModal() {
    authModal.classList.add('hidden')
    authModal.classList.remove('flex')
}

async function handleAuth(e) {
    e.preventDefault()
    
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    try {
        authSubmit.textContent = 'Loading...'
        authSubmit.disabled = true
        
        let result
        if (isSignUp) {
            result = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        api_key: generateApiKey()
                    }
                }
            })
        } else {
            result = await supabase.auth.signInWithPassword({
                email,
                password
            })
        }
        
        if (result.error) {
            alert(result.error.message)
        } else {
            hideModal()
            if (isSignUp) {
                alert('Account created! Please check your email to verify your account.')
            }
            showDashboard(result.data.user)
        }
    } catch (error) {
        alert('An error occurred: ' + error.message)
    } finally {
        authSubmit.textContent = isSignUp ? 'Sign Up' : 'Sign In'
        authSubmit.disabled = false
    }
}

async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
        showDashboard(user)
    }
}

function showDashboard(user) {
    // Hide main content
    document.querySelector('section').style.display = 'none'
    document.querySelectorAll('section')[1].style.display = 'none'
    document.querySelectorAll('section')[2].style.display = 'none'
    
    // Show dashboard
    dashboard.classList.remove('hidden')
    
    // Display API key
    const apiKey = user.user_metadata?.api_key || generateApiKey()
    userApiKey.textContent = apiKey
    
    // Update navigation
    document.getElementById('loginBtn').style.display = 'none'
    document.getElementById('signupBtn').style.display = 'none'
}

async function signOut() {
    await supabase.auth.signOut()
    location.reload()
}

function generateApiKey() {
    return 'pl_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function copyToClipboard() {
    navigator.clipboard.writeText(userApiKey.textContent)
    copyApiKey.textContent = 'Copied!'
    setTimeout(() => {
        copyApiKey.textContent = 'Copy'
    }, 2000)
}

// Close modal when clicking outside
authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        hideModal()
    }
})