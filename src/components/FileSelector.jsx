import React, { useEffect, useState } from 'react'
import styled from 'styled-components'



const Input = styled.input`
`
const postData = (endpoint, data) => {
  try {
    fetch(`http://localhost:4545/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    })
  } catch (err) {
    console.log(err)
  }
}

const FileSelector = props => {
  const [path, setPath] = useState('')

  const onPathChange = (path) => {
    console.log('sending PATH ' + path)
    postData(props.endpoint, {path: path})
  }

  useEffect(() => onPathChange(path), [path])
  return (
    <>
      <Input type={'file'} id={props.id} onChange={(event) => {
        console.log(event.target.files[0].path)
        setPath(event.target.files[0].path)
      }} />
    </>
  )
}

export default FileSelector
