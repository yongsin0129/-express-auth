export const EmailValidator = (email: string) =>
  /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(email)
