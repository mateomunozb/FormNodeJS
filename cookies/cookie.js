const express = require('express')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

app.use(bodyparser.urlencoded({extended: false}))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	console.log('req.cookies', req.cookies)
	const user = req.cookies['user']
	if (user) {
		console.log('user', user)
		res.render('form3', {user})
	} else {
		res.render('form3')
	}
})

app.post('/form3', (req, res) => {
	// console.log('TCL: req', req.body)
	const {nombre, apellido, password} = req.body

	const userCredentials = {
		validPassword: !password ? 0 : 1,
		name: nombre,
		surname: apellido,
	}

	res.cookie('user', userCredentials)
	res.redirect(302, '/')
})

app.listen(9000, () => console.log('Listening on port 9000!'))
