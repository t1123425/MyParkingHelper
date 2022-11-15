export const updateCarParkMarks = markArrays => {
    return {
        type:'UPDATE_CARPARKMARKS',
        markArray:markArrays
    }
}

export const updateLocation = location => {
    return {
        type:'UPDATE_LOCATION',
        currentLocation:location
    }
}

export const saveParkMarks = markArrays => {
    return {
        type:'SAVE_PARKMARKS',
        markArray:markArrays
    }
}

export const resetParkMarks = () => {
  return {
      type:'RESET_PARKMARKS'
  }
}
