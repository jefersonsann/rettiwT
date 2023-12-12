const formNewUser = document.getElementById('formNewUser')
const nome = document.getElementById('name')
const password = document.getElementById('password')
const avatar = document.getElementById('avatar')
const userExist = document.querySelector('.userExist')

let users = JSON.parse(localStorage.getItem('users')) || []

function handleSubmit(event) {
  event.preventDefault()
  createUser()
}

function createUser() {
  const nomeFormated = nome.value.toLowerCase()

  const newUser = {
    nome: nomeFormated,
    password: password.value,
    avatar: avatar.value,
    posts: [],
  }

  if (users.some((item) => item.nome === nomeFormated)) {
    userExist.textContent = 'usuario ja esxiste'
  } else {
    users.push(newUser)
    users.forEach((item, key) => {
      localStorage.setItem('key', key)
    })
    localStorage.setItem('users', JSON.stringify(users))
    userExist.textContent = 'cadastro realizado com sucesso'
    nome.value = ''
    password.value = ''
    avatar.value = ''
    document.location.href = '/'
  }
}

formNewUser.addEventListener('submit', handleSubmit)
