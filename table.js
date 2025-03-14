const tableCustom = (columnDefineArray = [{label: "", value: "", render: () => {}, sortable: true, align: "left"}], insertElementId, option) => {

    const optionDefault = {
        displayCheckColumn: true,
        displayDetailColumn: true,
        numberPerPage: 20,
        emptyResultLabel: "검색 결과가 없습니다.",
        searchingLabel: "검색 중입니다...",
        wideSelectArea: true,
        multipleSelect: true,
        serverSideUrl: null,
        frontSideData: null,
        excelName: "excel - " + new Date().toLocaleString(),
        detailClickEvent: () => {},
        rowClickEvent: () => {},
        cellEditEvent: () => {},
    }
    option = {
        ...optionDefault,
        ...option
    }
    
    let nowData = []
    const pageLabel = "tableCustomIndex"
    const getPageItem = item => {
        const data = sessionStorage[pageLabel]
        return data ? JSON.parse(data)[item] : undefined
    }

    const tableCustomId = `tableCustomId_No${Math.floor(Math.random() * 10e5)}`
    document.head.insertAdjacentHTML("beforeend", `<style>
    #${tableCustomId} {
        width: 100%;
        font-size: 14px;
        padding: 5px;
    }
    #${tableCustomId} * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }
    #${tableCustomId} *::-webkit-scrollbar {
        width: 5px;
    }
    #${tableCustomId} *::-webkit-scrollbar-thumb {
        background-color: #aaa;
        border-radius: 10px;
        border: 2px solid transparent;
    }
    #${tableCustomId} *::-webkit-scrollbar-track {
        background-color: #eee;
    }

    #${tableCustomId} [data-id="tableWrap"] {
        border-top: 1px solid #333;
        border-bottom: 1px solid #ccc;
        color: #333;
    }
    #${tableCustomId} [data-id="tableWrap"] > .rowWrap {
        display: flex;
        flex-direction: column;
    }
    #${tableCustomId} [data-id="tableWrap"] > .rowWrap .row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #eee;
        width: 100%;
    }
    #${tableCustomId} [data-id="tableWrap"] > .rowWrap .row.hide {display: none;}
    #${tableCustomId} [data-id="tableWrap"] > .rowWrap .row li {
        width: 100%;
    }
    #${tableCustomId} [data-id="tableWrap"] > .rowWrap .row:nth-child(even) {
        background-color: #fcfcfc;
    }
    #${tableCustomId} [data-id="tableWrap"] li {
        padding: 12px;
    }
    #${tableCustomId} [data-id="tableWrap"] [data-align="center"] {
        text-align: center;
    }
    #${tableCustomId} [data-id="tableWrap"] [data-align="center"] > * {
        margin: 0 auto;
    }
    #${tableCustomId} [data-id="tableWrap"] [data-align="right"] {
        text-align: right;
    }
    #${tableCustomId} [data-id="tableWrap"] > .rowWrap[data-id="head"] .row {
        border-bottom: 1px solid #ccc;
    }
    #${tableCustomId} [data-id="head"] li {
        position: relative;
    }
    #${tableCustomId} [data-id="head"] li[data-sort="true"] {
        cursor: pointer;
    }
    #${tableCustomId} [data-id="head"] li[data-sort="true"]::after {
        content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 -960 960 960" fill="%23aaa"><path d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z"/></svg>');
        margin-left: 10px;
        position: absolute;
        opacity: .7;
    }
    #${tableCustomId} [data-id="head"] li[data-sort="true"][data-order="1"]::after {
        content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 -960 960 960" fill="%23aaa"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg>');
    }
    #${tableCustomId} [data-id="head"] li[data-sort="true"][data-order="2"]::after {
        content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 -960 960 960" fill="%23aaa"><path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/></svg>');
    }
    #${tableCustomId} [data-id="head"] li:not(:last-child)::before {
        content: "";
        width: 1px;
        height: 60%;
        border-right: 1px solid #eee;
        position: absolute;
        right: 0;
        bottom: 20%;
    }
    #${tableCustomId} [data-id="tableWrap"] button[title="상세보기"] {
        border: 0;
        background: 0;
        cursor: pointer;
    }
    #${tableCustomId} [data-id="body"] {
        height: 400px;
        overflow-y: auto;
    }

    #${tableCustomId} [data-id="search"] {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 5px;
        gap: 5px;
        width: 100%;
        height: 35px;
    }
    #${tableCustomId} [data-id="search"] [data-id="searchBox"] {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #${tableCustomId} [data-id="search"] [data-id="searchBox"] [data-id="searchText"] {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 0 10px;
        color: #555;
        outline: 0;
    }
    #${tableCustomId} [data-id="search"] [data-id="searchBox"] [data-id="searchButton"] {
        border: 0;
        background: none;
        position: absolute;
        right: 10px;
        cursor: pointer;
    }

    #${tableCustomId} [data-id="body"] [data-id="rowCheck"] {
        display: none;
    }
    #${tableCustomId} [data-id="body"] [data-id="rowCheck"] + label {
        width: 15px;
        height: 15px;
        border: 1px solid #aaa;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2px;
        margin: 0 auto;
    }
    #${tableCustomId} [data-id="body"] [data-id="rowCheck"]:checked + label::after {
        content: "✔";
        color: deepskyblue;
    }
    #${tableCustomId} [data-id="body"] .row:has([data-id="rowCheck"]:checked) {
        background: #b0e8ff !important;
    }

    #${tableCustomId} [data-id="bottom"] {
        margin-top: 10px;
    }
    #${tableCustomId} [data-id="total"] span {
        font-weight: bold;
        font-size: larger;
    }
    #${tableCustomId} [data-id="page"], 
    #${tableCustomId} [data-id="page"] ul {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        letter-spacing: 1px;
    }
    #${tableCustomId} [data-id="page"] .arrow,
    #${tableCustomId} [data-id="page"] ul li {
        padding: 5px;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    #${tableCustomId} [data-id="page"] .active {
        border-radius: 50%;
        background: #b0e8ff;
        color: #fff;
        font-weight: bold;
    }
    #${tableCustomId} [data-id="page"] .arrow.hide {
        opacity: .5;
        pointer-events: none;
    }
    #${tableCustomId} .specialLabel {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #${tableCustomId} [data-id="excel"] {
        height: 100%;
        flex-shrink: 0;
    }
    #${tableCustomId} [data-id="excel"] button {
        cursor: pointer;
        height: 100%;
        border: 1px solid #ccc;
        color: #555;
        background: none;
        border-radius: 5px;
        padding: 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }
    #${tableCustomId} [data-id="cellEditBox"] {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 5px 10px;
        color: #555;
        outline: 0;
    }
    </style>`)
    const tableCustomWrap = document.querySelector(`#${insertElementId}`)
    tableCustomWrap.insertAdjacentHTML("afterbegin", `
    <div id="${tableCustomId}">

        <div data-id="search">
            <div data-id="searchBox">
                <input type="text" placeholder="검색어를 입력하세요." data-id="searchText">
                <button type="button" title="검색" data-id="searchButton">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px" fill="#777">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                    </svg>
                </button>
            </div>

            <div data-id="excel">
                <button type="button" title="엑셀 다운로드">
                    <!-- <img src="Microsoft_Office_Excel_(2019–present).svg" title="엑셀 아이콘"> -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 -960 960 960" fill="#107C41">
                        <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
                    </svg>
                    <span>엑셀 다운로드</span>
                </button>
            </div>
        </div>

        <div data-id="tableWrap">

            <div class="rowWrap" data-id="head">
                <ul class="row">
                    ${option.displayCheckColumn ? `<li style="width: 40px; flex-shrink: 0;" data-align="center">&nbsp;</li>` : ``}

                    ${columnDefineArray.map((item, index) => `
                        <li 
                            data-sort="${item.sortable === undefined ? true : item.sortable}"
                            data-align="${item.align || "left"}" 
                            data-order="${getPageItem("sortField") == item.value ? (getPageItem("sort") == "ASC" ? 1 : (getPageItem("sort") == "DESC" ? 2 : 0)) : 0}"
                            style="width: ${item.width ? (/[0-9]$/.test(item.width) ? item.width + "px" : item.width) + "; flex-shrink: 0;" : "100%"}"
                        >${item.label}</li>
                        `
                    ).join("")}

                    ${option.displayDetailColumn ? `<li style="width: 80px; flex-shrink: 0;" data-align="center">상세</li>` : ``}
                </ul>
            </div>

            <div class="rowWrap" data-id="body">
                <div class="specialLabel">${option.searchingLabel}</div>
            </div>

        </div>

        <div data-id="bottom">
            <span data-id="total">총 <span>-</span> 개</span>
            <div data-id="page">
                <div class="arrow" data-id="left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 -960 960 960" fill="#aaa">
                        <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                    </svg>
                </div>

                <ul data-id="pageItem">
                </ul>

                <div class="arrow" data-id="right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 -960 960 960" fill="#aaa">
                        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
                    </svg>
                </div>
            </div>
        </div>

    </div>
    `)

    const tableCustom = tableCustomWrap.querySelector(`#${tableCustomId}`)
    const tableBody = tableCustom.querySelector(`[data-id="body"]`)

    const setBody = (fetchItemObjectArray, scroll) => {
        tableCustom.querySelectorAll(`[data-id="body"] *`).forEach(element => element.remove())
        tableBody.insertAdjacentHTML("afterbegin", !fetchItemObjectArray?.length 
        ? `<div class="specialLabel">${option.emptyResultLabel}</div>` 
        : `
            ${fetchItemObjectArray.map((item, index) => `<ul class="row">
                ${option.displayCheckColumn ? `
                <li style="width: 40px; flex-shrink: 0;" data-align="center" data-id="tableCheck">
                    <input type="checkbox" data-id="rowCheck" id="checkBox_No${index}" title="체크박스">
                    <label for="checkBox_No${index}"></label>
                </li>` : ``}

                ${columnDefineArray.map((_item, index) => `
                    <li data-align="${_item.align || "left"}"
                        data-editable="${item.editable === undefined ? true : item.editable}" 
                        style="width: ${_item.width ? (/[0-9]$/.test(_item.width) ? _item.width + "px" : _item.width) + "; flex-shrink: 0;" : "100%"}"
                    >${_item.render?.(item) || item[_item.value]}</li>`
                ).join("")}

                ${option.displayDetailColumn ? `
                <li style="width: 80px; flex-shrink: 0;" data-align="center" data-id="tableDetail">
                    <button type="button" title="상세보기">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#777">
                            <path d="M80-200v-80h400v80H80Zm0-200v-80h200v80H80Zm0-200v-80h200v80H80Zm744 400L670-354q-24 17-52.5 25.5T560-320q-83 0-141.5-58.5T360-520q0-83 58.5-141.5T560-720q83 0 141.5 58.5T760-520q0 29-8.5 57.5T726-410l154 154-56 56ZM560-400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/>
                        </svg>
                    </button>
                </li>` : ``}
            </ul>`).join("")}
        `)
        
        tableBody.querySelectorAll(`.row`).forEach((element, index) => element.addEventListener("click", event => {
            if(!option.multipleSelect) 
            tableBody.querySelectorAll(`.row [data-id="tableCheck"] input[type="checkbox"]`).forEach(_element => {
                if(event.currentTarget.querySelector(`[data-id="tableCheck"] input[type="checkbox"]`) != _element)
                _element.checked = false
            })
            
            if(option.wideSelectArea)
            element.querySelector(`[data-id="tableCheck"] input[type="checkbox"]`).checked ^= 1

            const selectIndex = []
            tableBody.querySelectorAll(`.row`).forEach((element, index) => {
                if(element.querySelector(`[data-id="tableCheck"] input[type="checkbox"]:checked`))
                selectIndex.push(index)
            })
            option.rowClickEvent(nowData.filter((_, index) => selectIndex.includes(index)))

            if(event.target.closest(`[data-id="tableDetail"]`)) {
                savePage()
                option.detailClickEvent(nowData[index])
            }
            
            element.querySelectorAll(`li`).forEach((element, _index) => element.addEventListener("dblclick", event => {
                if(element.dataset.editable != "true") return

                const adjustIndex = option.displayCheckColumn ? _index - 1 : _index
                const adjustColumn = columnDefineArray[adjustIndex]
                element.innerHTML = `<input type="text" data-id="cellEditBox" value="${nowData[index][adjustColumn.value]}" autofocus>`
                const setEdit = value => {
                    element.innerHTML = adjustColumn.render?.(value) || value
                    nowData[index][adjustColumn.value] = value
                    option.cellEditEvent(nowData[index])
                }
                element.querySelector(`[data-id="cellEditBox"]`).addEventListener("blur", event => setEdit(event.target.value))
                element.querySelector(`[data-id="cellEditBox"]`).addEventListener("keypress", event => event.keyCode == 13 && event.target.blur())
            }))
        }))

        tableBody.scrollTo(0, scroll)
    }

    let nowIndex = 0
    let searchValue = ""
    let sort = 0
    let sortField = ""

    const minIndex = 0
    let maxIndex = 0

    const savePage = () => {
        sessionStorage[pageLabel] = JSON.stringify({
            index: nowIndex,
            searchField : "", 
            searchValue: searchValue,
            sort: sort,
            sortField: sortField,
            scroll: tableBody.scrollTop
        })
    }
    const getPage = () => {
        const data = sessionStorage[pageLabel]
        if(!data) return {}
        const page = JSON.parse(data)
        searchValue = page.searchValue || ""
        sort = page.sort || 0
        sortField = page.sortField || ""
        
        sessionStorage.removeItem(pageLabel)
        return {index: page.index, scroll: page.scroll}
    }
    const pageData = getPage()

    const setPagination = () => {
        tableCustom.querySelectorAll(`[data-id="pageItem"] *`).forEach(element => element.remove())
        const getPaginationHtml = () => {
            if(maxIndex > 9) {
                if(nowIndex < 4)
                return Array(5).fill().map((_, index) => `
                    <li class="${index == nowIndex ? "active" : ""}">${index + 1}</li>
                `).join("") + `<li>...</li><li>${maxIndex + 1}</li>`

                else if(maxIndex - nowIndex < 4)
                return `<li>${minIndex + 1}</li><li>...</li>` + Array(5).fill().map((_, index) => {
                    const newIndex = maxIndex + index - 4
                    return `
                        <li class="${newIndex == nowIndex ? "active" : ""}">${newIndex + 1}</li>
                `}).join("")

                else return `<li>${minIndex + 1}</li><li>...</li>` + 
                Array(3).fill().map((_, index) => `
                    <li class="${index == 1 ? "active" : ""}">${index + nowIndex}</li>
                `).join("")
                + `<li>...</li><li>${maxIndex + 1}</li>`
            } else return Array(maxIndex + 1).fill().map((_, index) => `
                    <li class="${index == nowIndex ? "active" : ""}">${index + 1}</li>
                `).join("")
        }
        tableCustom.querySelector(`[data-id="pageItem"]`).insertAdjacentHTML("afterbegin", getPaginationHtml())
        tableCustom.querySelectorAll(`[data-id="pageItem"] li`).forEach(element => element.addEventListener("click", () => {
            if(element.textContent == "...") return
            const index = element.textContent * 1 - 1
            fetchData(index)
        }))
    
        tableCustom.querySelectorAll(`.arrow`).forEach(element => element.classList.remove("hide"))
        if(!nowIndex) tableCustom.querySelector(`[data-id="left"]`).classList.add("hide")
        else if(nowIndex == maxIndex) tableCustom.querySelector(`[data-id="right"]`).classList.add("hide")
    }

    const setTotal = dataLength => {
        tableCustom.querySelector(`[data-id="total"] span`).textContent = dataLength.toLocaleString()
        maxIndex = (Math.ceil(dataLength / option.numberPerPage) - 1) || 0
    }

    const fetchDataAPI = (index = 0, numberPerPage) => {
        numberPerPage |= option.numberPerPage

        if(option.serverSideUrl)
        return fetch(new URL(option.serverSideUrl) + "?" + new URLSearchParams({
            index : index, 
            numberPerPage : numberPerPage,
            searchField : "", 
            search : searchValue, 
            sortField : sortField, 
            sort : sort,
        })).then(response => response.json())
        .then(data => data)

        else {
            const DB = option.frontSideData
            const searchField = null
            const filterData = DB.filter(item => {
                if(!searchValue) return true
                if(searchField) {
                    if(String(item[searchField]).includes(searchValue)) return true
                    return false
                } else {
                    for(const key in item) if(String(item[key]).includes(searchValue)) return true
                    return false
                }
            })

            const setSort = data => {
                if(!sortField) return data
                const key = sortField
                return data.sort((a, b) => {
                    if(typeof a[key] == "number") {
                        return sort == "ASC" 
                        ? a[key] - b[key]
                        : (sort == "DESC" ? b[key] - a[key] : null)
                    } else {
                        return sort == "ASC"  
                        ? String(a[key]).localeCompare( String(b[key]) ) 
                        : (sort == "DESC" ? String(b[key]).localeCompare( String(a[key]) ) : null)
                    }
                })
            }
            
            const sortData = setSort(filterData)
            const sliceData = sortData.slice(index * numberPerPage, index * numberPerPage + numberPerPage)
            
            return Promise.resolve({
                allDataLength: searchValue ? filterData.length : DB.length,
                data: sliceData
            })
        }
    }

    const fetchData = (index = 0, scroll) => {
        nowIndex = index
        tableCustom.querySelectorAll(`[data-id="pageItem"] li`)
        .forEach(element => element.classList[element.textContent * 1 - 1 == index ? "add" : "remove"]("active"))

        fetchDataAPI(index).then(data => {
            nowData = data.data || []
            setTotal(data.allDataLength || data.data?.length)
            setBody(data.data, scroll)
            setPagination()
        })
    }
    fetchData(pageData.index, pageData.scroll)

    tableCustom.querySelectorAll(`.arrow`).forEach(element => 
    element.addEventListener("click", () => fetchData(element.dataset.id == "left" ? nowIndex - 1 : nowIndex + 1)))

    const searchBox = tableCustom.querySelector(`[data-id="searchBox"]`)
    searchBox.querySelector(`input[type="text"]`).addEventListener("keypress", event => {
        if(event.keyCode == 13) searchData()
    })
    searchBox.querySelector(`button`).addEventListener("click", () => searchData())
    const searchData = () => {
        searchValue = searchBox.querySelector(`input[type="text"]`).value
        fetchData()
    }

    tableCustom.querySelectorAll(`[data-id="head"] li`).forEach((element, index) => element.addEventListener("click", () => {
        const key = columnDefineArray.find(item => item.label == element.textContent)?.value
        element.dataset.order |= 0
        if(element.dataset.sort != "true") return
        else if(!key) return
        else if(element.dataset.order == 0) element.dataset.order = 1
        else if(element.dataset.order == 1) element.dataset.order = 2
        else element.dataset.order = 0

        tableCustom.querySelectorAll(`[data-id="head"] li`).forEach(_element => {
            if(element != _element) _element.dataset.order = 0
        })

        sortField = key
        sort = element.dataset.order == 1 ? "ASC" : element.dataset.order == 2 ? "DESC" : ""
        fetchData()
    }))

    const createTableHtml = data => `
        <table>
            <colgroup>
                ${columnDefineArray.map((item, index) => `
                    <col width="${item.width ? (/[0-9]$/.test(item.width) ? item.width + "px" : item.width) : "*"}">
                `).join("")}
            </colgroup>

            <thead>
                <tr role="row">
                    ${columnDefineArray.map((item, index) => `
                        <td align="${item.align || "left"}">${item.label}</td>
                    `).join("")}
                </tr>
            </thead>

            <tbody>
                ${data.map(item => `
                    <tr>
                        ${columnDefineArray.map((_item, index) => `
                            <td align="${_item.align || "left"}">${item[_item.value]}</td>
                        `).join("")}
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `

    const excel = (fileName, content) => {
        const file = `
        <html xmlns:x="urn:schemas-microsoft-com:office:excel">
            <head>
                <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
                <xml>
                    <x:ExcelWorkbook>
                        <x:ExcelWorksheets>
                            <x:ExcelWorksheet>
                                <x:Name>Sheet</x:Name>
                                <x:WorksheetOptions>
                                    <x:Panes></x:Panes>
                                </x:WorksheetOptions>
                            </x:ExcelWorksheet>
                        </x:ExcelWorksheets>
                    </x:ExcelWorkbook>
                </xml>
            </head>
            <body>${content}</body>
        </html>
        `

        const a = document.createElement("a")
        a.href = URL.createObjectURL(new Blob([file], {type: "application/csv;charset=utf-8;"}))
        a.download = fileName + ".xls"
        a.click()
    }

    tableCustom.querySelector(`[data-id="excel"]`).addEventListener("click", () => {
        fetchDataAPI(0, 10000).then(data => excel(option.excelName, createTableHtml(data.data)))
    })
}

Element.prototype.tableCustom = function TableCustom(columnDef, option) {tableCustom(columnDef, this.id, option)}