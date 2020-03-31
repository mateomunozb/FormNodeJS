const express = require('express')
const bodyparser = require('body-parser')
const url = require('url')

const app = express()

app.use(bodyparser.urlencoded({extended: false}))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	if (req.query) {
		const {validName, validSurname, validPass} = req.query
		res.render('form2', {validName, validSurname, validPass})
	} else {
		res.render('form2')
	}
})

app.post('/form2', (req, res) => {
	// console.log('TCL: req', req.body)
	const {nombre, apellido, password} = req.body

	res.redirect(
		302,
		url.format({
			pathname: '/',
			query: {
				validName: !nombre ? 0 : 1,
				validSurname: !apellido ? 0 : 1,
				validPass: !password ? 0 : 1,
			},
		})
	)
})

app.listen(9000, () => console.log('Listening on port 9000!'))
