import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    points: {
      command: 3,
      faction: 0,
      critOps: 0,
      tacOps: 0,
      startingEnemyOperatives: 12,
      killedEnemyOperatives: 0,
      killOpsVP: 0,
      primaryOp: "",
      hasMoreKillOpsPoints: false,
    },
    agents: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increaseCounter: (state, action) => {
      if (
        ["tacOps", "critOps"].includes(action.payload) &&
        state.value.points[action.payload] < 6
      ) {
        state.value.points[action.payload]++;
      }
      if (
        ["startingEnemyOperatives", "killedEnemyOperatives"].includes(
          action.payload
        ) &&
        state.value.points[action.payload] < 14
      ) {
        state.value.points[action.payload]++;
      } else if (
        ![
          "tacOps",
          "critOps",
          "startingEnemyOperatives",
          "killedEnemyOperatives",
        ].includes(action.payload)
      ) {
        state.value.points[action.payload]++;
      }
    },
    decreaseCounter: (state, action) => {
      if (state.value.points[action.payload] > 0) {
        state.value.points[action.payload]--;
      }
    },
    updateKillOpsVP: (state, action) => {
      state.value.points.killOpsVP = action.payload;
    },
    toggleKillOpsPoints: (state, action) => {
      state.value.points.hasMoreKillOpsPoints =
        !state.value.points.hasMoreKillOpsPoints;
    },
    updatePrimaryOp: (state, action) => {
      state.value.points.primaryOp = action.payload;
    },
    resetPoints: (state, action) => {
      state.value.points = {
        command: 3,
        faction: 0,
        critOps: 0,
        tacOps: 0,
        startingEnemyOperatives: 12,
        killedEnemyOperatives: 0,
        killOpsVP: 0,
        primaryOp: "",
        hasMoreKillOpsPoints: false,
      };
    },
  },
});

export const {
  increaseCounter,
  decreaseCounter,
  updateKillOpsVP,
  toggleKillOpsPoints,
  updatePrimaryOp,
  resetPoints,
} = userSlice.actions;
export default userSlice.reducer;
