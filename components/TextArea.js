import React, { useCallback, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native';
import Textarea from 'react-expanding-textarea'

export default function TextArea() {
    const textareaRef = useRef(null)

    const handleChange = useCallback(e => {
      console.log('Changed value to: ', e.target.value)
    }, [])
  
    useEffect(() => {
      textareaRef.current.focus()
    }, [])
  
    return (
      <>
        <Textarea
          className="textarea"
          defaultValue="Lorem ipsum dolor sit amet, ..."
          id="my-textarea"
          maxLength="3000"
          name="pet[notes]"
          onChange={handleChange}
          placeholder="Enter additional notes..."
          ref={textareaRef}
        />
      </>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'white',
        marginBottom: 100,
        width: '100%',
        marginBottom: 15,
        padding: 15,
        alignSelf: "center",
        borderColor: '#ececec',
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
})