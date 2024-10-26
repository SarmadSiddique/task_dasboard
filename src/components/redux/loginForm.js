import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    updated: 0,
    tempUserData: null,
    applicationDetail: null,
    token: '',
    subscriptionData: null,
    userData: null,
    currentLocation: null
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setTempUserData: (state, action) => {
      state.tempUserData = action.payload;
      window.sessionStorage.setItem('react_template_tempData', JSON.stringify(action.payload))
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('react_template_token', action.payload)
    },
    setApplicationDetail: (state, action) => {
      state.applicationDetail = action.payload;
      //localStorage.setItem('werkenDeIn_user_application_detail', JSON.stringify(action.payload))
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setSubscriptionData: (state, action) => {
      state.subscriptionData = action.payload;
    },
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    handleLogin: (state, action) => {
      state.userData = action.payload
      //localStorage.setItem('werkenDeIn_user_data', JSON.stringify(action.payload))
    },
    handleUserData: (state, action) => {
      state.updated = action.payload
    },
    setLogout: (state, action) => {
      state.isLogin = false;
      localStorage.removeItem('react_template_token')
      state.updated = 0
      state.applicationDetail = null;
      state.tempUserData = null;
      state.token = '';
      state.userData = null;
    }
  },
});

export const { setLogin, handleLogin, setCurrentLocation,setSubscriptionData, handleUserData, setLogout, setApplicationDetail, setToken, setUserData, setTempUserData } = authSlice.actions;

export default authSlice.reducer;