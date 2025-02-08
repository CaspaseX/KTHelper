import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  killTeams: [],
  value: [],
};

export const operativesSlice = createSlice({
  name: "operatives",
  initialState,
  reducers: {
    addKillTeam: (state, action) => {
      state.killTeams.push({
        id: Date.now(),
        name: action.payload.name,
      });
    },
    updateKillTeam: (state, action) => {
      const { id, name } = action.payload;
      const killTeam = state.killTeams.find((team) => team.id === id);
      if (killTeam) {
        killTeam.name = name;
      }
    },
    deleteKillTeam: (state, action) => {
      const { id } = action.payload;
      state.killTeams = state.killTeams.filter((team) => team.id !== id);
      state.value = state.value.filter((operative) => operative.killTeamId !== id);
    },
    addOperative: (state, action) => {
      const { name, maxHealth, killTeamId, photo } = action.payload;
      state.value.push({
        id: Date.now(),
        name,
        health: maxHealth,
        maxHealth,
        killTeamId,
        photo: photo || null,
      });
    },
    updateOperative: (state, action) => {
      const { id, name, maxHealth, photo } = action.payload;
      const operative = state.value.find((op) => op.id === id);
      if (operative) {
        if (name !== undefined) operative.name = name;
        if (maxHealth !== undefined) operative.maxHealth = maxHealth;
        if (photo !== undefined) operative.photo = photo;
      }
    },
    updateHealth: (state, action) => {
      const { id, delta, maxHealth } = action.payload;
      const operative = state.value.find((op) => op.id === id);
      if (operative) {
        operative.health = Math.max(0, Math.min(operative.health + delta, maxHealth));
      }
    },
    deleteOperative: (state, action) => {
      const { id } = action.payload;
      state.value = state.value.filter((operative) => operative.id !== id);
    },
  },
});

export const {
  addKillTeam,
  updateKillTeam,
  deleteKillTeam,
  addOperative,
  updateOperative,
  updateHealth,
  deleteOperative,
} = operativesSlice.actions;

export default operativesSlice.reducer;
