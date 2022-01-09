const list = document.querySelectorAll('.drop_list select'),
     getButton = document.querySelector('form button'),
    icon = document.querySelector('.drop_list .icon')

icon.addEventListener('click', () => {
    const from = document.querySelector('.from select'),
        to = document.querySelector('.to select')
    let temp = from.value
    from.value = to.value
    to.value = temp
    changeFlag(from)
    changeFlag(to)
    getRate()
})



for (let i = 0; i < list.length; i++) {
    for(let currency_code in country_list) {
        let selected;
        if(!i) {
            selected = currency_code === "USD" ? "selected" : ""
        }else if(i === 1){
            selected = currency_code === "UAH" ? "selected" : ""
        }
        let option = `<option value="${currency_code}" ${selected}>${currency_code}</option>`
        list[i].insertAdjacentHTML("beforeend", option)
    }
    list[i].addEventListener('change', element => {
        changeFlag(element.target)
    })
}

function changeFlag(element) {
    element.parentElement.querySelector("img").src = `https://flagcdn.com/w20/${country_list[element.value].toLowerCase()}.png`
}

getButton.addEventListener('click', element => {
    element.preventDefault()
    getRate()
})

getRate()

function getRate() {
    const from = document.querySelector('.from select'),
        to = document.querySelector('.to select')
    const amount = document.querySelector(".summ input")
    let amountVal = amount.value
    if(amountVal === '' || amountVal === '0') {
        amount.value = '1'
        amountVal = 1
    }
    let requestUrl = `https://api.exchangerate.host/latest?base=${from.value}`
    try {
        fetch(requestUrl).then(response => response.json().then(result => {
            console.log(result)
            let exchangeRate = result.rates[to.value]
            document.querySelector('.rate').innerText = `${amountVal} ${from.value} = ${(amountVal * exchangeRate).toFixed(2)} ${to.value}`
        }))
    } catch (e) {
        let button = document.getElementsByClassName('button')
        button.innerText = `Error! Please try again later.`
        button.style.backgroundColor = '#ff4e4e'
        button.style.borderColor = '#ff4e4e'
    }
}

