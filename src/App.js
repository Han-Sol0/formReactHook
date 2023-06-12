import "./App.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";

const loginChangeScheme = yup
    .string()
    .matches(/^\S{2,}@\S{2,}\.[a-zA-Z]{2,10}$/, "Неверный логин.");

const passwordChangeScheme = yup
    .string()
    .matches(
        /^\S+$/ && /[a-zA-Z]+/ && /[0-9]+/ && /[\W_]+/,
        "Пароль не удовлетворяет политикам безопасности."
    );

/*  const repeatPasswordChangeScheme = yup
    .string()
    .matches(
        /^\S+$/ && /[a-zA-Z]+/ && /[0-9]+/ && /[\W_]+/,
        "Пароль не удовлетворяет политикам безопасности."
    ); */
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
}

export default App;
