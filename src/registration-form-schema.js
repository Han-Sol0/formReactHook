import * as yup from "yup";
export const registrationFormSchema = yup.object().shape({
    email: yup.string().required("Заполните почту").email("Неверная почта."),
    password: yup
        .string()
        .matches(/^\S+$/, "Пароль не удовлетворяет политикам безопасности.")
        .matches(/[a-zA-Z]+/, "Пароль не удовлетворяет политикам безопасности.")
        .matches(/[0-9]+/, "Пароль не удовлетворяет политикам безопасности.")
        .matches(/[\W_]+/, "Пароль не удовлетворяет политикам безопасности."),
    repeatPassword: yup
        .string()
        .required("Повторите пароль.")
        .oneOf([yup.ref("password"), null], "Пароли не совпадают."),
});
