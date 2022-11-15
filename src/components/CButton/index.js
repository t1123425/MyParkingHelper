const CButton = props => {
    return (
      <button type="button" onClick={props.btnClick} className={'inline-block mb-3 px-6 py-2.5'+
      ' text-white font-medium text-xs leading-tight text-center rounded-full shadow-md '+ 
      'hover:shadow-lg '+ 
      'focus:shadow-lg focus:outline-none focus:ring-0 '+ 
      'active:shadow-lg transition duration-150 ease-in-out '+
      `${props.bgColor}`}>
        {
          props.element
        }
        <span>
          {props.text}
        </span>
      </button>
    )
}

export default CButton;