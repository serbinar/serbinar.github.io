const news = document.getElementById('newsContainer');
function calcNewsHeight(columns) {
    const newsChildren = news.querySelectorAll(".news__content:not(.news__content-break)")
    const allRows = Math.ceil(newsChildren.length / columns)
    const maxColumn = Math.min(columns, newsChildren.length)
    let maxHeight = 0
    for (let column = 0; column < maxColumn; column++) {
        let height = 0
        for (let row = 0; row < allRows; row++ ) {
            const newsChildNum = column + row * columns
            const lastHeight = height
            if (newsChildNum < newsChildren.length) {
                height = lastHeight + newsChildren[newsChildNum].offsetHeight
            } else {
                break
            }
        }
        if (maxHeight < height) {
            maxHeight = height
        }
    }
    const gap = 15
    return maxHeight + gap * allRows
}
function createNewsElement(imageUrl, title, informationText) {
    const newElement = document.createElement("div")
    newElement.className = "news__content"
    const img = document.createElement("img")
    img.src = imageUrl;
    newElement.append(img)
    const titleWrap = document.createElement("div")
    titleWrap.className = "news__content_name"
    const titleText = document.createElement("p")
    titleText.innerText = title
    titleWrap.appendChild(titleText)
    newElement.appendChild(titleWrap)
    const info = document.createElement("div")
    info.classList.add("show_inf")
    info.classList.add("show_inf-centered")
    info.classList.add("show_inf-white")
    const infoText = document.createElement("div")
    infoText.className = "show_inf__text"
    infoText.innerText = informationText
    info.appendChild(infoText)
    newElement.appendChild(info)
    const removeButton = document.createElement("button")
    removeButton.className = "remove_news"
    removeButton.innerText = "-"
    removeButton.addEventListener("click", removeNews)
    newElement.appendChild(removeButton)
    return newElement
}
function addNews (event) {
    event.preventDefault()
    const form = document.forms.newsForm
    const imageUrl = window.URL.createObjectURL(form.image.files[0])
    const lastNews = news.children[news.children.length - getColumns(window.innerWidth)]
    const newNews = createNewsElement(imageUrl, form.title.value, form.information.value)
    lastNews.insertAdjacentElement("afterend", newNews)
    setTimeout(refreshNewsHeight, 450)
    closeModalNews()
    const newsChildren = news.querySelectorAll(".news__content")
    putOrders(newsChildren)
}
function refreshNewsHeight () {
    const newsHeight = calcNewsHeight(getColumns(window.innerWidth))
    news.style.height = `${newsHeight}px`
}
function removeNews (event) {
    const button = event.target
    button.parentElement.remove()
    refreshNewsHeight()
    const newsChildren = news.querySelectorAll(".news__content")
    putOrders(newsChildren)
}
function getColumns (width) {
    if (width < 1440 && width >= 1024) {
        return 3
    }
    if (width < 1024 && width >= 640) {
        return 2
    }
    if (width < 640) {
        return 1
    }
    return 4
}
function putOrders (parent) {
    columns = getColumns(window.innerWidth)
    parent.forEach((child, index) => {
        child.style.order = `${index % columns}`
    })
}
function updateColumnBreaks (currentColumns, lastColumns) {
    const columnsDifference = currentColumns - lastColumns;
    if (columnsDifference > 0) {
        addContentBreaks(columnsDifference)
    }
    if (columnsDifference < 0) {
        removeContentBreaks(Math.abs(columnsDifference))
    }
}
function addContentBreaks (count) {
    const contentBreak = document.createElement('div');
    contentBreak.classList.add('news__content');
    contentBreak.classList.add('news__content-break');
    for (let i = 0;  i < count; i++) {
        news.append(contentBreak);
    }
}
function removeContentBreaks (count) {
    const contentBreaksAll = news.querySelectorAll(".news__content-break");
    for (let i = 0;  i < count; i++) {
        contentBreaksAll[i].remove()
    }
}
function refreshNews () {
    const columns = getColumns(window.innerWidth)
    const contentBreaksAll = news.querySelectorAll(".news__content-break");
    updateColumnBreaks(columns, contentBreaksAll.length + 1)
    refreshNewsHeight()
    const newsChildren = news.querySelectorAll(".news__content")
    putOrders(newsChildren)
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(refreshNews, 200)
})

window.addEventListener('resize', () => {
    refreshNews()
})