const [
  name, email, phone, work, purpose, description
] = document.querySelectorAll("input")
const form = document.querySelector("form")

form.addEventListener("submit", (event) => {
  event.preventDefault()
  const contactDetails = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    work: work.value,
    purpose: purpose.value,
    description: description.value
  }
  
  fetch("/sendMessage", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(contactDetails)
  })
  
  name.value = ""
  email.value = ""
  phone.value = ""
  work.value = ""
  purpose.value = ""
  description.value = ""
  alert("Successful 🎈🎈")
})
