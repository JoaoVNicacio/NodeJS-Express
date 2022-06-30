// Requerimento dos modulos fs e path:
const fs = require('fs')
const { join } = require('path')

// JSON com os users:
const filePath = join(__dirname, 'users.json')

const getUsers = () => {
    // Conferindo se o arquivo existe:
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : []

    // Retornando o JSON:
    try {
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

// Salvar os usuários:
const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

const userRoute = (app) => {
    app.route('/users/:id?').get((req, res) => {
        const users = getUsers()

        // Enviando os usuários:
        res.send({ users })
    })

        // Função POST:
        .post((req, res) => {
            const users = getUsers()

            users.push(req.body)
            saveUser(users)

            // Resposta:
            res.status(201).send('User added!')
        })

        // Função PUT:
        .put((req, res) => {
            const users = getUsers()

            saveUser(users.map(user => {
                if (user.id === req.params.id) {
                    // Mescla:
                    return {
                        ...user,
                        ...req.body
                    }
                }
                return user
            }))

            // Resposta:
            res.status(200).send('User edited!')
        })

        // Função DELETE:
        .delete((req, res) => {
            const users = getUsers()

            saveUser(users.filter(user => user.id !== req.params.id))

            // Resposta:
            res.status(200).send('User Removed!')
        })
}

// Exportando:
module.exports = userRoute