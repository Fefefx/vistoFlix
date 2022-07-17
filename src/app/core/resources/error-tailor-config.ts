import { ErrorTailorConfig } from "@ngneat/error-tailor";

export const errorTailorConfig: ErrorTailorConfig = {
  blurPredicate(element) {
    return (
      element.tagName === 'INPUT' ||
      element.tagName === 'SELECT'||
      element.tagName.startsWith('APP-INPUT-')
    );
  },
  errors: {
    useValue: {
      required: 'Campo obrigatório',
      email: 'E-mail inválido',
      minlength: ({ requiredLength, actualLength }) => `Mínimo de ${requiredLength} caracteres, atual ${actualLength}`
    }
  }
}
