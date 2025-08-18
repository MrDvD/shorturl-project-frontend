import { FastifyInstance, FastifyRequest } from 'fastify';
import { connectPostgres } from './postgres';
import { User } from '../abstracts/types';
import { UserRepository } from '../implementations/cruds';

const sql = connectPostgres();
const userRepository = new UserRepository(sql);

export function initEndpoints(fastify: FastifyInstance) {
  initEnterEntrypoints(fastify);
}

// export function initLoginEntrypoints(fastify: FastifyInstance) {
//   fastify.get('/enter', function(request: FastifyRequest<{ Querystring: { register?: string } }>, reply) {
//     const userId = request.cookies.user_id;
//     if (userId) {
//       reply.redirect("/");
//     } else {
//       reply.sendFile('index.html', request.query.register === 'true' ? 'dist/register' : 'dist/login');
//     }
//   });
// }

export function initEnterEntrypoints(fastify: FastifyInstance): void {
  fastify.route({
    method: 'POST',
    url: '/register',
    handler: async function (
      request: FastifyRequest<{
        Body: { login: string; email: string; password: string };
      }>,
      reply
    ) {
      const { login, email, password } = request.body;
      const newUser: User = {
        login: login,
        email: email,
        password: password,
      };
      try {
        const registeredUser = await userRepository.create(newUser);
        reply.setCookie('user_id', String(registeredUser.id), {
          httpOnly: true,
          signed: true,
        });
        reply.code(201).send(registeredUser);
      } catch {
        reply.code(403).send({
          error: "Couldn't register a new user with these credentials.",
        });
      }
    },
  });

  fastify.route({
    method: 'POST',
    url: '/login',
    handler: async function (
      request: FastifyRequest<{
        Body: { login: string; email: string; password: string };
      }>,
      reply
    ) {
      const { login, password } = request.body;
      const newUser: User = {
        login: login,
        password: password,
      };
      try {
        const result = await userRepository.check(newUser);
        reply.setCookie('user_id', String(result.user.id), {
          httpOnly: true,
          signed: true,
        });
        reply.code(200).send(result);
      } catch {
        reply.code(403).send({
          error: "Couldn't login with these credentials.",
        });
      }
    },
  });
}
