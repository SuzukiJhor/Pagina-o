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
    totalPage: Math.ceil(data.length / perPage),
    maxVisibleButtons: 5
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
        state.page = parseInt(page)
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

const buttons = {
    create(number) {
        const button = document.createElement('div')

        button.innerHTML = number

        if (state.page == number) {
            button.classList.add('active')
        }

        button.addEventListener('click', (e) => {
            const page = e.target.innerText
            controls.goTo(page)
            up()
        })

        html.get('.numbers').appendChild(button)

    },

    update() {
        html.get('.pagination .numbers').innerHTML = "";

        const { maxRight, maxLeft } = this.calculateMaxVisible()

        for (let page = maxLeft; page <= maxRight; page++) {
            buttons.create(page)

        }
    },

    calculateMaxVisible() {
        const { maxVisibleButtons } = state

        let maxLeft = state.page - Math.floor(maxVisibleButtons / 2)
        let maxRight = state.page + Math.floor(maxVisibleButtons / 2)

        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = maxVisibleButtons
        }
        if (maxRight > state.totalPage) {
            maxLeft = state.totalPage - (maxVisibleButtons - 1)
            maxRight = state.totalPage
            if (maxLeft < 1) maxLeft = 1
        }

        return { maxRight, maxLeft }

    }
}

function up() {
    list.update()
    buttons.update()
}

function init() {
    up()
    controls.createListeners()
}


init()