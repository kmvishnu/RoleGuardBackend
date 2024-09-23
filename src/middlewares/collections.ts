import express, { Application } from "express";

export module MiddleWareCollections {
  export function essentials(app: Application): void {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
  }
}
