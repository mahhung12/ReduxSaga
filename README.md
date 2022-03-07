# Mini Project - Student Management

react-router-dom
@types/react-router-dom

/login
/admin

/admin/*
feature: /admin/dashboard
feature: /admin/students

auth / authentication
- login
- sign up / register
- forget password


Click LOGIN
- Call API to login
- Success --> Redirect to Admin
- Failed --> Show ERROR

#
LOGIN
LOGOUT

authSaga
- If logged in -> watch LOGGOUT
- else -> watch LOGIN


LOGIN
- Call Login API to get token + user info
- set Token to localStorage 
- Redirect to admin page

LOGOUT
- Clear token from localStorage
- Redirect to Login page

authSlice
authSaga