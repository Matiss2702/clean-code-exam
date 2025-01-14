import { ref } from "vue";

export default function useFormValidation(formData: any, isRegister: boolean) {
  const errors = ref<{ [key: string]: string }>({});

  const validateForm = () => {
    errors.value = {};

    return Object.keys(errors.value).length === 0;
  };

  return {
    errors,
    validateForm,
  };
}
