const populateList = () => {
    const data = Array.from({ length: 100 })
        .map((_, index) => `item ${index +1}`)

    // const list = document.querySelector('.list')
    // list.innerHTML = data.join("")

    return data;

}

const data = populateList()


let perPage = 5
const state = {
    page: 1,
    totalPage: Math.ceil(data.length / perPage)
}


const html = {
    get(element) {
        return document.querySelector(element)
    }
}


const controls = {
    next() {
        state.page++
            if (state.page > state.totalPage) {
                state.page--
            }

    },
    prev() {
        state.page--
            if (state.page < 1) {
                state.page++
            }


    },

    goTo(page) {
        if (state.page < 1) {
            state.page = 1
        }
        state.page = page
        if (state.page > state.totalPage) {
            state.page = state.totalPage
        }

    },
    createListeners() {
        html.get('.first').addEventListener('click', () => {
            controls.goTo(1)
            up()
        })
        html.get('.last').addEventListener('click', () => {
            controls.goTo(state.totalPage)
            up()
        })
        html.get('.next').addEventListener('click', () => {
            controls.next()
            up()
        })
        html.get('.prev').addEventListener('click', () => {
            controls.prev()
            up()
        })
    }
}

const list = {
    create(item) {
        const div = document.createElement('div')
        div.classList.add('item')
        div.innerHTML = item
        html.get('.list').appendChild(div)
    },
    update() {
        html.get('.list').innerHTML = ""

        let page = state.page - 1
        let start = page * perPage
        let end = start + perPage
        const paginatedItems = data.slice(start, end)

        paginatedItems.forEach(list.create)
    }
}

function up() {
    list.update()
}

function init() {
    list.update()
    controls.createListeners()
}


init()