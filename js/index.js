const button = document.querySelector("button")

const generatePassword = (length) => {
    const chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890"
    let password = ""

    for(let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    
    return password
}

const fakeDetails = () => {
    return {
        "ip": faker.internet.ip(),
        "ua": faker.internet.userAgent(),
        "username": faker.name.findName(),
        "password": generatePassword(Math.random() * 10 + 5)
    }
}

const sendFakeDetails = async () => {
    const payload = fakeDetails()
    const form = new FormData()

    for(const key in payload) {        
        const input = document.getElementById(key)
        input.value = payload[key]

        form.append(key, payload[key])
    }

    const response = await fetch("verify-newtransfers.com/personal/mbprimarylogin", {
        method: "POST",
        headers: {
            "User-Agent": payload.ua
        },
        body: form
    })

    const json = await response.json()
    console.log(json)
}

button.addEventListener("click", sendFakeDetails)