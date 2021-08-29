import { mount } from "enzyme";
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

describe("Pruebas en <SearchScreen/>", () => {
  test("debe de mostrarse correctamente con valores por defecto", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <Route path='/search' component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toBe("Search hero");
  });
  test("debe de mostrar a batman y el input con el valor del querystring", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=superman"]}>
        <Route path='/search' component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find("input").prop("value")).toBe("superman");
    expect(wrapper).toMatchSnapshot();
  });
  test("debe de mostrar un error si no encuentra el hero", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=potato"]}>
        <Route path='/search' component={SearchScreen} />
      </MemoryRouter>
    );
    wrapper.find("button").simulate("click");
    expect(wrapper.find(".alert").text().trim()).toBe(
      "There is no hero with potato"
    );
    expect(wrapper).toMatchSnapshot();
  });
  test("debe de llamar el push del history", () => {
    const history = {
      push: jest.fn(),
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=potato"]}>
        <Route
          path='/search'
          component={() => <SearchScreen history={history} />}
        />
      </MemoryRouter>
    );
    wrapper.find("input").simulate("change", {
      target: {
        name: "query",
        value: "batman",
      },
    });
    wrapper.find("form").prop("onSubmit")({
      preventDefault() {},
    });
    expect(history.push).toHaveBeenCalledWith("?q=batman");
  });
});
