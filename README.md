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


ADD/EDIT
- React Hook Form v7
- Yup

Routings
- /admin/students/add: add new student
- /admin/students/studentId: update a student

Student Form
- Mode: Add/Edit
- Initial values
- Values
  - name: Text Input
  - age: Number Input
  - gender: Radio options
  - city: Select
  - mark: Number
- Validations
  - name: at least one value
  - age: >= 18
  - gender: male | female
  - city: required
  - mark: 0 -> 10 
- Submission: redirect to student page list 






### Handle loading / error in redux saga

- RTK + Thunk : provide a way to await an async action right on component
-> Handle loading / error on component easily

- RTK + Saga : Doesn't have a way to do so
-> HOw to do?

Suggestion:
- LOADING: can based o redux store
- ERROR: eliminate the usage as much as you can

Considerations: 
- Trigger error toast from saga
- Consider to call API directly on component instead of going through saga.
