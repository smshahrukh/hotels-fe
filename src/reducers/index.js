
export const SET_HOTELS = "SET_HOTELS"
export const SET_DATA_POINTS = "SET_DATA_POINTS"

export const initialState = {
  hotels: [],
  datapoints: [],
  groupedDate: "monthly",
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOTELS: {
      return {
        ...state,
        hotels: action.hotels,
      }
    }
    case SET_DATA_POINTS: {
      return {
        ...state,
        datapoints: action.datapoints,
        groupedDate: action.groupedDate,
      }
    }
    default: {
      return state
    }
  }
}
