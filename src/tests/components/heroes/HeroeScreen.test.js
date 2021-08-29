import React from "react";
import { mount } from "enzyme";
import { HeroeScreen } from "../../../components/heroes/HeroeScreen";
import { MemoryRouter, Route } from "react-router-dom";

describe("pruebas en <HeroeScreen/>", () => {
  const history = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn(),
  };
  test("debe de mostrar el componente redirect si no hay argumentos en el url", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <HeroeScreen history={history} />
      </MemoryRouter>
    );
    expect(wrapper.find("Redirect").exists()).toBe(true);
  });
  test("debe de mostrar un heroe si el parametro existe y se encuentra", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/heroe/dc-batman"]}>
        <Route path='/heroe/:heroeId' component={HeroeScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find(".row").exists()).toBe(true);
  });
  test("debe de regresar a la pantalla anterior con push", () => {
    const history = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn(),
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={["/heroe/dc-batman"]}>
        <Route
          path='/heroe/:heroeId'
          component={() => <HeroeScreen history={history} />}
        />
      </MemoryRouter>
    );
    wrapper.find("button").prop("onClick")();
    expect(history.push).toHaveBeenCalledWith("/");
    expect(history.goBack).not.toHaveBeenCalled();
  });
  test("debe de regresar a la pantalla anterior GOBACK", () => {
    const history = {
      length: 3,
      push: jest.fn(),
      goBack: jest.fn(),
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={["/heroe/dc-batman"]}>
        <Route
          path='/heroe/:heroeId'
          component={() => <HeroeScreen history={history} />}
        />
      </MemoryRouter>
    );
    wrapper.find("button").prop("onClick")();
    expect(history.push).not.toHaveBeenCalled();
    expect(history.goBack).toHaveBeenCalledWith();
  });
  test("debe de llamar al redicrect si el hero no existe", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/heroe/dc-batmanjghig65"]}>
        <Route
          path='/heroe/:heroeId'
          component={() => <HeroeScreen history={history} />}
        />
      </MemoryRouter>
    );
    expect(wrapper.text()).toBe("");
  });
});
