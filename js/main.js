const user = document.querySelector('.usuario')
const modal = document.querySelector('[data-modal]')
const form = document.querySelector('.modal .form')
const listItens = document.querySelector('.listItens')
const formCreate = document.querySelector('#formCreate')

const key = localStorage.getItem('key') || 0

let users = JSON.parse(localStorage.getItem('users')) || []

if (!localStorage.getItem('users')) {
  document.location.href = '/rettiwT/cadastro.html'
}

let posts = users[key].posts

function autoLogin(nome) {
  users.forEach((item, key) => {
    if (item.nome === nome) {
      user.setAttribute('key', key)
      user.innerHTML = `
      <div class="user">${item.nome}</div>
      <div class="avatar">
      <img src="${item.avatar || '/assets/account_circle.svg'}" alt="${
        item.nome
      }" />
      </div>    
      `
      localStorage.setItem('key', key)
    }
  })
}
autoLogin(users[key].nome)

function handlePost() {
  if (user.children[0].innerText === 'Login') {
    modal.setAttribute('data-modal', true)
  } else {
    const message = document.getElementById('message')

    const post = {
      message: message.value,
    }

    posts.push(post)
    localStorage.setItem('users', JSON.stringify(users))
    message.value = ''
    listItens.innerHTML = ''
    createPost()
  }
}

function createPost() {
  posts.forEach(({ message }, id) => {
    const li = document.createElement('li')
    li.setAttribute('key', id)
    li.innerHTML = `
      <div class="userPost">
        <div class="avatar">
        <img src="${users[key].avatar}" alt="${users[key].nome}" />
        </div>
        @${user.children[0].innerText}
      </div>
      <p>${message}</p>
      <div class="btns">
        <button onClick="handleEdit(${id})">Editar</button>
        <button onClick="handleDelete(${id})">Excluir</button>
      </div>
      `
    listItens.appendChild(li)
  })
}
createPost()

function handleEdit(id) {
  const modal = document.createElement('div')
  modal.classList = 'modal'
  modal.setAttribute('data-modal', true)
  modal.innerHTML = `
    <form class="form formEdit">
      <h1>Editar</h1>
      <div class="inputContent">
        <textarea class="input" name="newMessage" id="newMessage" cols="30" rows="5" placeholder="Novo pensamento" autofocus></textarea>
      </div>
      <button type="submit">Salvar</button>
    </form>
  `
  document.body.appendChild(modal)

  const newMessage = document.querySelector('#newMessage')
  newMessage.value = posts[id].message
  const formEdit = document.querySelector('.formEdit')

  formEdit.addEventListener('submit', () => {
    console.log(newMessage.value)
    posts[id].message = newMessage.value
    localStorage.setItem('users', JSON.stringify(users))
    listItens.innerHTML = ''
    createPost()
  })
}

function handleDelete(id) {
  posts.splice(id, 1)
  listItens.innerHTML = ''
  createPost()
  localStorage.setItem('users', JSON.stringify(users))
}

function handleLogin(e) {
  const nome = document.getElementById('name').value.toLowerCase()
  const password = document.getElementById('password').value

  const loginUser = users.some((item) => item.nome === nome)
  const loginPassword = users.some((item) => item.password === password)

  if (loginUser && loginPassword) {
    autoLogin(nome)
    modal.setAttribute('data-modal', false)
  } else {
    e.preventDefault()
    document.querySelector('.erroLogin').textContent =
      'Usuario ou senha incorreto!'
  }
}

function handleModal() {
  modal.setAttribute('data-modal', true)
}

function modalClose(event) {
  if (event.target === modal) {
    modal.setAttribute('data-modal', false)
  }
}

user.addEventListener('click', handleModal)
modal.addEventListener('click', modalClose)
form.addEventListener('submit', handleLogin)
formCreate.addEventListener('submit', handlePost)
