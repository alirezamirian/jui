import { DividerItem } from "./src/Collections/Divider";

export type Legend = { name: string };
export const legends: Array<
  Legend | DividerItem | { items: Legend[]; title: string }
> = [
  { name: "Paco de Lucia" },
  { name: "Vicente Amigo" },
  new DividerItem(),
  { name: "Gerardo Nunez" },
  { name: "Paco Serrano" },
  new DividerItem(),
  { name: "Sabicas" },
  {
    title: "Super legends",
    items: [{ name: "Sabicas2" }],
  },
  { name: "Pepe Habichuela" },
  { name: "El Amir" },
  { name: "Paco Peña" },
];
