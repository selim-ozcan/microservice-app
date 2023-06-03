import request from "supertest";
import { app } from "../../app";

const createTicket = async (body: any) => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send(body);
};

it("can fetch a list of tickets", async () => {
  await createTicket({ title: "test", price: 20 });
  await createTicket({ title: "test", price: 20 });
  await createTicket({ title: "test", price: 20 });

  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(3);
});
