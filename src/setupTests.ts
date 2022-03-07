import "@testing-library/jest-dom";
import { server } from "./__mocks__/mockServer";

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});
