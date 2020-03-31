const express = require('express')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
const url = require('url')

const app = express()
app.use(cookieParser())

app.use(bodyparser.urlencoded({extended: false}))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	if (req.query) {
		console.log("req", req.query)
		const userCookie = req.cookies['user']
		const query = req.query
		res.render('form', {query, userCookie})
	} else {
		res.render('form')
	}
})

app.post('/form', (req, res) => {
	// console.log('TCL: req', req.body)
	const {nombre, apellido, password} = req.body

	const userCredentials = {
		name: nombre,
		surname: apellido,
	}

	res.cookie('user', userCredentials)
	res.redirect(
		302,
		url.format({
			pathname: '/',
			query: {
				validPass: !password ? 0 : 1,
				validName: !nombre ? 0 : 1,
				validSurname: !apellido ? 0 : 1,
			},
		})
	)
})

app.listen(9000, () => console.log('Listening on port 9000!'))
