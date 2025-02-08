import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
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
};

export const pointsSlice = createSlice({
  name: "points",
  initialState,
  reducers: {
    increaseCounter: (state, action) => {
      if (
        ["tacOps", "critOps"].includes(action.payload) &&
        state.value[action.payload] < 6
      ) {
        state.value[action.payload]++;
      }
      if (
        ["startingEnemyOperatives", "killedEnemyOperatives"].includes(
          action.payload
        ) &&
        state.value[action.payload] < 14
      ) {
        state.value[action.payload]++;
      } else if (
        ![
          "tacOps",
          "critOps",
          "startingEnemyOperatives",
          "killedEnemyOperatives",
        ].includes(action.payload)
      ) {
        state.value[action.payload]++;
      }
    },
    decreaseCounter: (state, action) => {
      if (state.value[action.payload] > 0) {
        state.value[action.payload]--;
      }
    },
    updateKillOpsVP: (state, action) => {
      state.value.killOpsVP = action.payload;
    },
    toggleKillOpsPoints: (state, action) => {
      state.value.hasMoreKillOpsPoints =
        !state.value.hasMoreKillOpsPoints;
    },
    updatePrimaryOp: (state, action) => {
      state.value.primaryOp = action.payload;
    },
    resetPoints: (state, action) => {
      state.value = {
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
} = pointsSlice.actions;
export default pointsSlice.reducer;
