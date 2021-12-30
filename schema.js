import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
export const typeDefs = mergeTypeDefs(loadedTypes);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);
export const resolvers = mergeResolvers(loadedResolvers);
