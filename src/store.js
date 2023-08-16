import { proxy } from "valtio";

export const state = proxy({
  intro: true,
  selectedColor: "",
});
