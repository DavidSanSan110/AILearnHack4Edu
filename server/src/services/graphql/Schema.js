import {GraphQLObjectType, GraphQLSchema} from "graphql";
import * as courses from "./courseSchema.js";

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        course: courses.course,
        myCourses: courses.myCourses,
        rankingCourse: courses.rankingCourse,
        lesson: courses.lesson,
    }
});

export const Schema = new GraphQLSchema({
    query: RootQuery
});