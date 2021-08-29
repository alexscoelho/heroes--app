import React from "react";
import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { DashboardRoutes } from "../../components/routers/DashboardRoutes";

describe("pruebas en <DashboardRoutes/>", () => {
  const authContext = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: "Pepe",
    },
  };
  test("debe hacer match con el snapshot", () => {
    const wrapper = mount(
      <AuthContext.Provider value={authContext}>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe("Pepe");
  });
});
