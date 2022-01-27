import { factory, primaryKey } from "@mswjs/data";
import faker from "faker";

const eventTypes = ["管理员", "普通管理员", "用户"];
const getRandomValue = (array: any[], index: number) => array[index];

const models = {
  user: {
    id: primaryKey(String),
    name: () => faker.fake("{{name.firstName}} {{name.lastName}}"),
    email: faker.internet.email,
    password: String,
    teamId: String,
    role: String,
    bio: String,
    createdAt: Number,
    type: () =>
    getRandomValue(eventTypes, faker.datatype.number({ min: 0, max: 2 })),
  },
  team: {
    id: primaryKey(String),
    name: String,
    description: String,
    createdAt: Number,
  },
  discussion: {
    id: primaryKey(String),
    title: String,
    body: String,
    teamId: String,
    createdAt: Number,
  },
  comment: {
    id: primaryKey(String),
    body: String,
    authorId: String,
    discussionId: String,
    createdAt: Number,
  },
};

export const db = factory(models);

export type Model = keyof typeof db;

export const loadDb = () =>
  Object.assign(JSON.parse(window.localStorage.getItem("msw-db") || "{}"));

export const persistDb = (model: Model) => {
  if (process.env.NODE_ENV === "test") return;
  const data = loadDb();
  // @ts-ignore
  data[model] = db[model].getAll();
  window.localStorage.setItem("msw-db", JSON.stringify(data));
};

export const initializeDb = () => {
  const database = loadDb();
  Object.entries(db).forEach(([key, model]) => {
    const dataEntres = database[key];
    if (dataEntres) {
      dataEntres?.forEach((entry: Record<string, any>) => {
        model.create(entry);
      });
    }
  });
};

export const resetDb = () => {
  window.localStorage.clear();
};

initializeDb();
