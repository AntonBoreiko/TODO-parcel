
class Todo {
  data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : []

  inputTitleElement = document.querySelector('#title')

  inputEstimateElement = document.querySelector('#estimate')

  selectPriorityElement = document.querySelector('#priority')

  buttonSubmitElement = document.querySelector('#submit')

  formElement = document.querySelector('#form')

  divListElement = document.querySelector('#list')

  listWrapElement = document.querySelector('#list-wrap')

  searchInputElement = document.querySelector('#search')

  openFormButtonElement = document.querySelector('#open-form')

  formSearchElement = document.querySelector('#form-search')

  openMainButtonElement = document.querySelector('#open-mainForm')

  closeMainButtonElement = document.querySelector('#cancel')

  selectSortElement = document.querySelector('#sort')

  constructor() {
    this.init()

  }
  init() {
    this.formElement.addEventListener('submit', this.handleSubmit.bind(this))

    this.searchInputElement.addEventListener('input', this.handleInputSearch.bind(this))

    this.selectSortElement.addEventListener('change', this.handleChangeSelectSort.bind(this))

    this.openFormButtonElement.addEventListener('click', this.handleOpenForm.bind(this))

    this.openMainButtonElement.addEventListener('click', this.handleOpenMainForm.bind(this))

    this.closeMainButtonElement.addEventListener('click', this.handleCloseMainForm.bind(this))

    this.listWrapElement.addEventListener('click', this.handleRemoveButton.bind(this))

    window.addEventListener('beforeunload', this.handleBeforeunload.bind(this))

    this.renderList(this.data)
  }


  handleBeforeunload() {
    localStorage.setItem('data', JSON.stringify(this.data))
  }

  handleSubmit(event) {
    event.preventDefault()
    const content = this.inputTitleElement.value.trim()
    const Obj = {}
    Obj.id = Date.now()
    Obj.title = this.inputTitleElement.value
    Obj.date = this.buildDate()
    Obj.createStar = this.createStar()
    Obj.priority = this.selectPriorityElement.value
    Obj.estimate = this.createEstimate()

    if (content) {
      this.data.push(Obj)

      this.formElement.reset()

      this.renderList(this.data)
    } else {
      alert('Заполните поле!!!')
    }

  }


  createListItem(Obj) {
    const template =
      `<li class="list-item" >
      <div class = "span-title">${Obj.title} ${Obj.date} </div>
      <div class="div-estimate" ><span>${Obj.estimate} ч.</span>
      <span class= "calc-star">${Obj.createStar}</span>
      <button  data-id="${Obj.id}" class="remove-button">🗑</button></div>
      </li>
    `
    return template
  }

  renderList(data) {
    const listElement = document.createElement('ul')
    listElement.classList.add('list')

    this.listWrapElement.innerHTML = ''

    this.listWrapElement.append(listElement)

    data.forEach((item, index) => {
      const listItem = this.createListItem(item, index)
      listElement.innerHTML = listElement.innerHTML + listItem
    })
  }

  buildDate() {
    const date = new Date()
    let day = date.getDate()

    let month = date.getMonth() + 1
    let year = date.getFullYear()
    if (day < 10) day = '0' + day
    if (month < 10) month = '0' + month
    let fullDate = day + '.' + month + '.' + year
    return fullDate
  }

  createEstimate() {
    let time = +(this.inputEstimateElement.value)

    if (time > 0) {
      return time

    } else {
      alert('время должно быть больше 0 часов!')
      return '❓'
    }
  }

  handleRemoveButton(event) {
    const target = event.target
    if (target.hasAttribute('data-id')) {
      const idElement = target.getAttribute('data-id')
      this.data.forEach((item, index) => {
        if (item.id == idElement) {
          this.data.splice(index, 1)

          this.renderList(this.data)
        }
        if (this.data.length == 0) {
          this.listWrapElement.innerHTML = '<div class="div-list">Список пуст</div>'
        }
      })
    }
  }

  handleInputSearch() {
    const value = this.searchInputElement.value

    const filterData = this.data.filter((item) => {
      if (item.title.includes(value)) {
        return true
      }
      return false
    })
    if (filterData.length) {
      this.renderList(filterData)
    } else {
      this.listWrapElement.innerHTML = '<div>Ничего не найдено</div>'
    }
  }

  createStar() {
    if (this.selectPriorityElement.value == 1) {
      return `<i class="fas fa-star" id="#star"></i>`
    }
    if (this.selectPriorityElement.value == 2) {
      return `<i class="fas fa-star" id="#star"></i>
      <i class="fas fa-star" id="#star"></i>`
    }
    if (this.selectPriorityElement.value == 3) {
      return `<i class="fas fa-star" id="#star"></i>
      <i class="fas fa-star" id="#star"></i>
      <i class="fas fa-star" id="#star"></i>`
    }
  }

  handleChangeSelectSort() {
    const sortElement = this.selectSortElement.value

    const resultSort = this.data.sort((a, b) => {
      if ('estimate' == sortElement) {
        return a.estimate - b.estimate
      }
      if ('priority' == sortElement) {
        return a.priority - b.priority
      }
    })
    this.renderList(resultSort)
  } 1

  handleOpenForm() {
    if (this.formSearchElement.classList.contains('open')) {
      this.formSearchElement.classList.remove('open')
      this.formSearchElement.classList.add('close')
    } else {
      this.formSearchElement.classList.remove('close')
      this.formSearchElement.classList.add('open')
    }
  }

  handleOpenMainForm() {
    if (this.formElement.classList.contains('close')) {
      this.formElement.classList.remove('close')
      this.formElement.classList.add('open')
    }
  }

  handleCloseMainForm() {
    if (this.formElement.classList.contains('open')) {
      this.formElement.classList.remove('open')
      this.formElement.classList.add('close')
    }
  }


}

export { Todo }

