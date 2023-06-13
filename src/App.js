import { useEffect, useRef } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationFormSchema } from "./registration-form-schema";
import { Field } from "./components/field";

export const App = () => {
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            repeatPassword: "",
        },
        resolver: yupResolver(registrationFormSchema),
        mode: "onTouched",
    });

    const submitButtonRef = useRef(null);

    const onSubmit = ({ email, password, repeatPassword }) => {
        console.log({ email, password, repeatPassword });
    };

    useEffect(() => {
        if (isValid) {
            submitButtonRef.current.focus();
        }
    }, [isValid]);
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field
                    type="text"
                    placeholder="Почта"
                    error={errors.email?.message}
                    {...register("email")}
                />
                <Field
                    type="password"
                    placeholder="Пароль"
                    error={errors.password?.message}
                    {...register("password")}
                />
                <Field
                    type="password"
                    placeholder="Повтор пароля"
                    error={errors.repeatPassword?.message}
                    {...register("repeatPassword")}
                />
                <button type="submit" disabled={!isValid} ref={submitButtonRef}>
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};

/* const loginChangeScheme = yup
    .string()
    .required("Заполните почту")
    .email("Неверный логин.");
const passwordChangeScheme = yup
    .string()
    .matches(/^\S+$/, "Пароль не удовлетворяет политикам безопасности.")
    .matches(/[a-zA-Z]+/, "Пароль не удовлетворяет политикам безопасности.")
    .matches(/[0-9]+/, "Пароль не удовлетворяет политикам безопасности.")
    .matches(/[\W_]+/, "Пароль не удовлетворяет политикам безопасности.");

const validateAndGetErrorMessage = (scheme, value) => {
    let errorMessage = null;
    try {
        scheme.validateSync(value);
    } catch ({ errors }) {
        errorMessage = errors[0];
    }
    return errorMessage;
};

const initialState = {
    email: "",
    password: "",
    repeatPassword: "",
};
const useStore = () => {
    const [state, setState] = useState(initialState);
    return {
        getState: () => state,
        updateState: (fieldName, newValue) =>
            setState({ ...state, [fieldName]: newValue }),
    };
};

const setData = (formData) => {
    console.log(formData);
};

function App() {
    const { getState, updateState } = useStore();
    const [loginError, setLoginError] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();
        setData(getState());
    };
    const { email, password, repeatPassword } = getState();

    const buttonRef = useRef();

    useEffect(() => {
        if (
            email !== "" &&
            password !== "" &&
            repeatPassword !== "" &&
            loginError === null
        ) {
            buttonRef.current.focus();
        }
    }, [loginError]);
    return (
        <div className="App">
            <form onSubmit={onSubmit}>
                {loginError && <div className="App-link">{loginError}</div>}
                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Почта"
                    onChange={({ target }) => {
                        updateState(target.name, target.value);
                        const error = validateAndGetErrorMessage(
                            loginChangeScheme,
                            target.value
                        );

                        setLoginError(error);
                    }}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Пароль"
                    onChange={({ target }) => {
                        updateState(target.name, target.value);

                        const error = validateAndGetErrorMessage(
                            passwordChangeScheme,
                            target.value
                        );
                        setLoginError(error);
                    }}
                />
                <input
                    type="password"
                    name="repeatPassword"
                    value={repeatPassword}
                    placeholder="Повтор пароля"
                    onChange={({ target }) => {
                        updateState(target.name, target.value);

                        let error = null;

                        if (target.value !== password) {
                            error = "Пароли не совпадают.";
                        }
                        setLoginError(error);
                    }}
                />
                <button
                    type="submit"
                    disabled={loginError !== null}
                    ref={buttonRef}
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
} */

export default App;
