import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import type { Component } from "vue";

export interface Toast {
  id: string;
  title?: string;
  description?: string | (() => void);
  action?: Component;
  variant?: "default" | "destructive";
  type?: "success" | "error" | "info" | "warning";
}

export const useToastStore = defineStore("toast", {
  state: () => ({
    toasts: [] as Toast[],
  }),
  actions: {
    /**
     * Ajoute un nouveau toast.
     * @param toast Les propriétés du toast à ajouter.
     */
    addToast(toast: Omit<Toast, "id">) {
      const id = uuidv4();
      this.toasts.push({ id, ...toast });

      // Supprime le toast après un certain délai
      setTimeout(() => {
        this.removeToast(id);
      }, 5000);
    },

    /**
     * Supprime un toast par son ID.
     * @param id L'ID du toast à supprimer.
     */
    removeToast(id: string) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },
  },
});
