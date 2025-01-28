import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  SetEmailOrLoginPayload,
  StateEmail,
  StateLogin,
  StatePassword,
} from "../../interface/interface";

export const loginCheckInDB = createAsyncThunk(
  "user/loginCheckInDB",
  async (login: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/signup/checkfields?login=${login}`);
      const data = await response.json();

      if (response.status === 200) {
        switch (data.status) {
          case "ok":
            return true;

          default:
            return rejectWithValue("error");
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// const initialState: State = {
//   login: {
//     login: "",
//     loginLength: 0,
//     loginLetters: 0,
//   },
//   password: {
//     password: "",
//     passwordLength: 0,
//   }, 
//   email: {
//     email: "",
//     emailIsValid: false,
//   }
// };

const stateLogin: StateLogin = {
  login: {
    login: "",
    loginLength: 0,
    loginLetters: 0,
  }
}

const statePassword: StatePassword = {
  password: {
    password: "",
    passwordLength: 0,
  }
}

const stateEmail: StateEmail = {
  email: {
    email: "",
    emailIsValid: false,
  }
}

const initialState = {...stateEmail, ...stateLogin, ...statePassword}

const fieldsCheckSlice = createSlice({
  name: "filedsCheck",
  initialState,
  reducers: {
    setEmailOrLogin: (
      state,
      action: PayloadAction<SetEmailOrLoginPayload>
    ) => {
      const { field, value } = action.payload;
      
      if (field === "login") {
        state[field][field] = value
      } else {
        state[field][field] = value
      }
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(loginCheckInDB.fulfilled, (state: StateCheckFieldSlice, action: PayloadAction<SetEmailOrLoginPayload>) => {
  //       state.loginString = action.payload.login;
  //     });
  //   },
});

export const { setEmailOrLogin } = fieldsCheckSlice.actions;
export default fieldsCheckSlice.reducer;
