const { authReducer } = require("../../auth/authReducer");
const { types } = require("../../types/types");

describe("Pruebas en el authReducer", () => {
  const loginState = {
    name: "Alexson",
    logged: true,
  };
  const loggedOutState = {
    logged: false,
  };
  const loginAction = {
    payload: { name: "Alexson" },
    type: types.login,
  };
  const logoutAction = {
    type: types.logout,
  };

  test("debe de retornar el estado por defecto", () => {
    const state = authReducer(loggedOutState, {});
    expect(state).toEqual(loggedOutState);
  });
  test("debe de autenticar y colocar el name de el usuario", () => {
    const state = authReducer(loggedOutState, loginAction);
    expect(state).toEqual(loginState);
  });
  test("debe de borar el name del usuario y logged en false", () => {
    const state = authReducer(loginState, logoutAction);
    expect(state).toEqual(loggedOutState);
  });
});
