export const readSingleFile = ({ file, returnType = 'url' }) => {
  console.log('FILE: ', file)
  const fr = new FileReader()
  return new Promise((resolve, reject) => {
    fr.onerror = () => {
      fr.abort()
      reject(new DOMException('Problem parsing input file.'))
    }
    fr.onload = (e) => {
      resolve(e.target.result)
      // resolve(fr.result)
    }
    if (returnType === 'url') {
      fr.readAsDataURL(file)
    } else if (returnType === 'txt') {
      fr.read.readAsText(file)
    } else {
      reject(
        new DOMException(
          `returnType: '${returnType}' not matched in readSingleFile`
        )
      )
    }
  })
}

export const fileToElement = (f) => {
  const E = (f) => {
    throw new Error('NotImplemented Content Type: ', f.type)
  }
  // in accordance with MDN MIME Type
  return new Promise((resolve, reject) => {
    let element = null
    try {
      if (f.type.startsWith('text')) {
        readSingleFile({ file: f, returnType: 'txt' }).then((txt) => {
          resolve(document.createTextNode(txt))
        })
      } else if (f.type.startsWith('image')) {
        readSingleFile({ file: f, returnType: 'url' }).then((url) => {
          element = new Image()
          element.src = url
          element.style.maxWidth = '50vw'
          resolve(element)
        })
      } else if (f.type.startsWith('audio')) {
        reject(E(f))
      } else if (f.type.startsWith('video')) {
        reject(E(f))
      } else if (f.type.startsWith('application')) {
        reject(E(f))
      } else {
        reject(E(f))
      }
    } catch (err) {
      reject(err)
    }
  })
}
