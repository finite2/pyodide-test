export {};
import { CardDetail } from "splinterlands-types";

declare global {
  interface Window {
    splinterlands: any;
    cards: CardDetail[];
  }
}
