import React from "react";
import { mount } from "enzyme";
import { PrivateRoute } from "../../components/routers/PrivateRoute";
import { MemoryRouter } from "react-router-dom";
describe("Prueba en <PrivateRoute/>", () => {
  const props = {
    location: {
      pathname: "/marvel",
    },
  };

  Storage.prototype.setItem = jest.fn(); //localstorage have been called

  test("debe de mostrar el componente si esta autenticado y guardar localstorage", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <span>Hola!</span>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
  });
  test("debe de bloquear el componente si no esta autenticado", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={() => <span>Hola!</span>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(false);
  });
});
