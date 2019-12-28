import React, { useRef } from 'react'
import clsx from 'clsx'

function Field({ name, type = 'text', value, options = [], onChange }) {
  let input = <input className="custom-input" {...{ name, type, value, onChange }} />
  if (type === 'boolean')
    input = (
      <input
        {...{ name, onChange }}
        type="checkbox"
        checked={value}
        className="custom-checkbox-input"
      />
    )
  else if (type === 'radio')
    input = <Radio {...{ name, value, options, onChange }} />
  else if (type === 'select')
    input = (
      <select {...{ name, value, onChange }}>
        {options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
    )
  else if (type === 'file')
    input = (
      <FileInput {...{ name, type, value, onChange }} />
    )

  return (
    <label className={clsx('field', type === 'checkbox' && 'checkbox')}>
      <span>{name}</span>
      {input}
    </label>
  )
}

function Radio({ options, ...props }) {
  return (
    <section className="custom-radio-group">
      {
        options.map(option => (
          <button 
            className={clsx("custom-btn custom-btn-radio", option === props.value && 'active')}
            {...props}
            value={option}
            onClick={props.onChange}
            >
            {option}
          </button>
        ))
      }
    </section>
  )
}


function FileInput (props) {
  const input = useRef(null);
  const value = input.current && input.current.value

  const filename = value && value.replace(/^.*[\\\/]/, '');

  return (
    <label className="custom-btn">
      { filename || 'Choose file' }
      <input ref={input} {...props } hidden/>
    </label>
  )
}

export default Field
