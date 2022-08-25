const populateList = () => {
    const data = Array.from({ length: 100 })
        .map((_, index) => `<div class='item'> item ${index +1}</div>`)

    const list = document.querySelector('.list')
    list.innerHTML = data.join("")

    return data;

}

const data = populateList()


const html = {
    get(element) {
        return document.querySelector(element)
    }
}


let perPage = 5
const state = {
    page: 1,
    totalPage: Math.ceil(data.length / perPage)
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

function up() {
    console.log(state.page)
}

controls.createListeners()