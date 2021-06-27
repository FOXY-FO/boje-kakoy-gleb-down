export const catchError = (props) => {
  switch (props) {
    case 403: {
      return "Запрещен запрос к ресурсу"
    }
    case 429: {
      return "Слишком много запросов"
    }
    case 500: {
      return "Сбой на сервере. Повторите попозже"
    }
    default: {
      return "Ошибка"
    }
  }
}
