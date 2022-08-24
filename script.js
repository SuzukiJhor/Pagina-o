const populateList = () => {
    const data = Array.from({ length: 100 })
        .map((_, index) => `<div class='item'> item ${index +1}</div>`)

    const list = document.querySelector('.list')
    list.innerHTML = data.join("")

    return data;

}

const data = populateList()