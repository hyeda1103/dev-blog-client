const convertToBase64 = (file: File) => 
  new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
  })

export default convertToBase64
