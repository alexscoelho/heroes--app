import React from "react";
import { mount } from "enzyme";
import { AppRouter } from "../../components/routers/AppRouter";
import { AuthContext } from "../../auth/AuthContext";

describe("Pruebas en AppRouter", () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };
  test("debe de mostrar el login si no esta autentiocado", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    console.log(wrapper.html());
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de mostrar el componnete de Marvel esta autentiocado", () => {
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        logged: true,
        name: "Alexson",
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper.find(".navbar").exists()).toBe(true);
  });
});
