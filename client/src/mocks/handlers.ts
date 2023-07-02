
import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3000/products", (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get("http://localhost:3000/categories", (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get("http://localhost:3000/types", (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get("http://localhost:3000/uoms", (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get("http://localhost:3000/carts", (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.post("http://localhost:3000/categories", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.post("http://localhost:3000/products", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.post("http://localhost:3000/types", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.post("http://localhost:3000/uoms", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.post("http://localhost:3000/carts", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.patch("http://localhost:3000/products/:id", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.patch("http://localhost:3000/categories/:id", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.patch("http://localhost:3000/uoms/:id", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.patch("http://localhost:3000/types/:id", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.patch("http://localhost:3000/carts/:id", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.put("http://localhost:3000/products/:id", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.put("http://localhost:3000/uoms/:id", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.put("http://localhost:3000/categories/:id", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.put("http://localhost:3000/types/:id", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.put("http://localhost:3000/carts/:id", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.delete("http://localhost:3000/products/:id", (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.delete("http://localhost:3000/types/:id", (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.delete("http://localhost:3000/uoms/:id", (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.delete("http://localhost:3000/categories/:id", (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.delete("http://localhost:3000/carts/:id", (req, res, ctx) => {
    return res(ctx.json({}));
  }),
];