import { create } from "zustand";
import Consumer from "../types/Consumer";

type ConsumersStoreType = {
  consumers: Consumer[];
  setConsumers: (newConsumers: Consumer[]) => void;
  resetConsumers: () => void;
};

const defaultConsumer: Consumer[] = [];

const useConsumersStore = create<ConsumersStoreType>((set) => ({
  consumers: defaultConsumer,
  setConsumers: (newConsumers: Consumer[]) => {
    set({
      consumers: newConsumers,
    });
  },
  resetConsumers: () => {
    set({ consumers: defaultConsumer });
  },
}));

export default useConsumersStore;
