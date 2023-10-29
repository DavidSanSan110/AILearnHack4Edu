import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLFloat, GraphQLNonNull, GraphQLScalarType } from 'graphql';
import { PostgresSingleton } from '../../database/pdb.js'

export const answerType = new GraphQLObjectType({
    name: 'answer',
    fields: () => ({
        id: { type: GraphQLInt },
        exercise_id: { type: GraphQLInt },
        user_id: { type: GraphQLInt },
        answer: { type: GraphQLString },
        iscorrect: { type: GraphQLBoolean },
        feedback: { type: GraphQLString },
    })
});

export const exerciseType = new GraphQLObjectType({
    name: 'exercise',
    fields: () => ({
        id: { type: GraphQLInt },
        lesson_id: { type: GraphQLInt },
        type: { type: GraphQLString },
        question: { type: GraphQLString },
        explanation: { type: GraphQLString },
        options: { type: GraphQLString },
        correct_option: { type: GraphQLString },
        answer: {
            type: new GraphQLList(answerType),
            resolve(parent, args, ctx) {
                let client = PostgresSingleton.getInstance().client;
                let query = `SELECT * FROM answer WHERE exercise_id = ${parent.id} AND user_id = ${ctx.id}`;
                return client.query(query)
                    .then(res => res.rows)
                    .catch(err => err.stack);
            }
        }
    })
});

export const lessonType = new GraphQLObjectType({
    name: 'lesson',
    fields: () => ({
        id: { type: GraphQLInt },
        section_id: { type: GraphQLInt },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        exercises: {
            type: new GraphQLList(exerciseType),
            resolve(parent, args, ctx) {
                let client = PostgresSingleton.getInstance().client;
                let query = `SELECT * FROM exercise WHERE lesson_id = ${parent.id}`;
                return client.query(query)
                    .then(res => res.rows)
                    .catch(err => err.stack);
            }
        },
        isDone: {
            type: GraphQLBoolean,
            resolve(parent, args, ctx) {
                let client = PostgresSingleton.getInstance().client;
                let query = `SELECT * FROM progress WHERE user_id = ${ctx.id} AND lesson_id = ${parent.id}`;
                return client.query(query)
                    .then(res => res.rows.length > 0)
                    .catch(err => err.stack);
            }
        }
    })
});

export const sectionType = new GraphQLObjectType({
    name: 'section',
    fields: () => ({
        id: { type: GraphQLInt },
        course_id: { type: GraphQLInt },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        lessons: {
            type: new GraphQLList(lessonType),
            resolve(parent, args, ctx) {
                let client = PostgresSingleton.getInstance().client;
                let query = `SELECT * FROM lesson WHERE section_id = ${parent.id}`;
                return client.query(query)
                    .then(res => res.rows)
                    .catch(err => err.stack);
            }
        },
        progress: {
            type: GraphQLFloat,
            resolve(parent, args, ctx) {
                let client = PostgresSingleton.getInstance().client;
                let query = `SELECT COUNT(*) AS done, (SELECT COUNT(*) FROM lesson WHERE section_id = ${parent.id}) AS total FROM progress WHERE user_id = ${ctx.id} AND lesson_id IN (SELECT id FROM lesson WHERE section_id = ${parent.id})`;
                return client.query(query)
                    .then(res => res.rows[0].done > 0 ? res.rows[0].done / res.rows[0].total * 100 : 0)
                    .catch(err => err.stack);

            }
        }
    })
});

export const courseType = new GraphQLObjectType({
    name: 'course',
    fields: () => ({
        id: { type: GraphQLInt },
        subject: { type: GraphQLString },
        difficulty: { type: GraphQLInt },
        code: { type: GraphQLString },
        isgenerated: { type: GraphQLBoolean },
        issv: { type: GraphQLBoolean },
        progress: {
            type: GraphQLFloat,
            resolve(parent, args, ctx) {
                let client = PostgresSingleton.getInstance().client;
                let query = `SELECT COUNT(*) AS done, (SELECT COUNT(*) FROM lesson WHERE section_id IN (SELECT id FROM section WHERE course_id = ${parent.id})) AS total FROM progress WHERE user_id = ${ctx.id} AND lesson_id IN (SELECT id FROM lesson WHERE section_id IN (SELECT id FROM section WHERE course_id = ${parent.id}))`;
                return client.query(query)
                    .then(res => res.rows[0].done > 0 ? res.rows[0].done / res.rows[0].total * 100 : 0)
                    .catch(err => err.stack);

            }
        },
        sections: {
            type: new GraphQLList(sectionType),
            resolve(parent, args, ctx) {
                let client = PostgresSingleton.getInstance().client;
                let query = `SELECT * FROM section WHERE course_id = ${parent.id}`;
                return client.query(query)
                    .then(res => res.rows)
                    .catch(err => err.stack);
            }
        }
    })
});

export const performanceType = new GraphQLObjectType({
    name: 'performance',
    fields: () => ({
        score: { type: GraphQLFloat },
        accuracy: { type: GraphQLFloat },
    })
});

export const userPerformanceType = new GraphQLObjectType({
    name: 'userPerformance',
    fields: () => ({
        user_id: { type: GraphQLInt },
        score: { type: GraphQLFloat },
        accuracy: { type: GraphQLFloat },
    })
});

export const minimalCourseType = new GraphQLObjectType({
    name: 'minimalCourse',
    fields: () => ({
        id: { type: GraphQLInt },
        subject: { type: GraphQLString },
        difficulty: { type: GraphQLInt },
        code: { type: GraphQLString },
        isgenerated: { type: GraphQLBoolean },
        issv: { type: GraphQLBoolean },
        progress: {
            type: GraphQLFloat,
            resolve(parent, args, ctx) {
                let client = PostgresSingleton.getInstance().client;
                let query = `SELECT COUNT(*) AS done, (SELECT COUNT(*) FROM lesson WHERE section_id IN (SELECT id FROM section WHERE course_id = ${parent.id})) AS total FROM progress WHERE user_id = ${ctx.id} AND lesson_id IN (SELECT id FROM lesson WHERE section_id IN (SELECT id FROM section WHERE course_id = ${parent.id}))`;
                return client.query(query)
                    .then(res => res.rows[0].done > 0 ? res.rows[0].done / res.rows[0].total * 100 : 0)
                    .catch(err => err.stack);

            }
        },
        performance: {
            type: performanceType,
            resolve(parent, args, ctx) {
                let client = PostgresSingleton.getInstance().client;
                //From all the answers of the user of this course, how many are correct? correct/total answers
                let query = `SELECT COUNT(*) AS correct, (SELECT COUNT(*) FROM answer WHERE user_id = ${ctx.id} AND exercise_id IN (SELECT id FROM exercise WHERE lesson_id IN (SELECT id FROM lesson WHERE section_id IN (SELECT id FROM section WHERE course_id = ${parent.id})))) AS total FROM answer WHERE user_id = ${ctx.id} AND iscorrect = true AND exercise_id IN (SELECT id FROM exercise WHERE lesson_id IN (SELECT id FROM lesson WHERE section_id IN (SELECT id FROM section WHERE course_id = ${parent.id})))`;
                return client.query(query)
                    .then(res => {
                        let accuracy = res.rows[0].total > 0 ? res.rows[0].correct / res.rows[0].total * 100 : 0;
                        return { score: res.rows[0].correct, accuracy: accuracy };
                    })
                    .catch(err => err.stack);
            }
        }
    })
});


export const course = {
    type: courseType,
    args: { id: { type: GraphQLInt } },
    resolve(parent, args, ctx) {
        let client = PostgresSingleton.getInstance().client;
        let query = `SELECT * FROM course WHERE id = (SELECT course_id FROM enrollment WHERE user_id = ${ctx.id} AND course_id = ${args.id})`;
        return client.query(query)
            .then(res => res.rows[0])
            .catch(err => err.stack);
    }
};

export const myCourses = {
    type: new GraphQLList(minimalCourseType),
    resolve(parent, args, ctx) {
        let client = PostgresSingleton.getInstance().client;
        let query = `SELECT * FROM course WHERE id IN (SELECT course_id FROM enrollment WHERE user_id = ${ctx.id})`;
        return client.query(query)
            .then(res => res.rows)
            .catch(err => err.stack);
    }
};

export const rankingCourse = {
    type: new GraphQLList(userPerformanceType),
    args: { id: { type: GraphQLInt } },
    async resolve(parent, args, ctx) {
        const client = PostgresSingleton.getInstance().client;
        const query1 = `SELECT user_id FROM enrollment WHERE course_id = ${args.id} AND user_id NOT IN (SELECT id FROM public.user WHERE role = 'admin')`;

        const res = await client.query(query1);

        let promises = res.rows.map(async row => {

            const query2 = `SELECT user_id, COUNT(*) AS correct, (SELECT COUNT(*) FROM answer WHERE user_id = ${row.user_id} AND exercise_id IN (SELECT id FROM exercise WHERE lesson_id IN (SELECT id FROM lesson WHERE section_id IN (SELECT id FROM section WHERE course_id = ${args.id})))) AS total FROM answer WHERE user_id = ${row.user_id} AND iscorrect = true AND exercise_id IN (SELECT id FROM exercise WHERE lesson_id IN (SELECT id FROM lesson WHERE section_id IN (SELECT id FROM section WHERE course_id = ${args.id}))) GROUP BY user_id`;
            const nestedResult = await client.query(query2);
            return { user_id: nestedResult.rows[0].user_id, score: nestedResult.rows[0].correct, accuracy: nestedResult.rows[0].total > 0 ? (nestedResult.rows[0].correct / nestedResult.rows[0].total) * 100 : 0}

        });

        //Sort the performance array by score
        promises.sort((a, b) => (a.score < b.score) ? 1 : -1);

        return Promise.all(promises);
    }
};

export const lesson = {
    type: lessonType,
    args: { id: { type: GraphQLInt } },
    resolve(parent, args, ctx) {
        let client = PostgresSingleton.getInstance().client;
        let query = `SELECT * FROM lesson WHERE id = ${args.id}`;
        return client.query(query)
            .then(res => res.rows[0])
            .catch(err => err.stack);
    }
};





