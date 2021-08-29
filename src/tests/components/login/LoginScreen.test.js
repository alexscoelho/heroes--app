import React from "react";
import { mount } from "enzyme";
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";

describe("Pruebas en <LoginScreen />", () => {
  const history = {
    replace: jest.fn(),
  };
  const authContext = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: "Alexson",
    },
  };
  const wrapper = mount(
    <AuthContext.Provider value={authContext}>
      <LoginScreen history={history} />
    </AuthContext.Provider>
  );
  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("debe de hacer el dispatch y la navegacion", () => {
    const handleClick = wrapper.find("button").prop("onClick");
    handleClick();
    expect(authContext.dispatch).toHaveBeenCalled();
    expect(history.replace).toHaveBeenCalledWith("/");
    localStorage.setItem("lastPath", "/dc");
    handleClick();
    expect(history.replace).toHaveBeenCalledWith("/dc");
  });
});
