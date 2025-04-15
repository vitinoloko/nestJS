import { LoginPayload } from 'src/auth/dtos/loginPayload.dto';
import { buffer } from 'stream/consumers';

export const authorizantionToLoginPayload = (
  authorization: string,
): LoginPayload | undefined => {
  const authorizationSplited = authorization.split('.');
  if (authorizationSplited.length < 3 || !authorizationSplited[1]) {
    return undefined;
  }

  return JSON.parse(
    Buffer.from(authorizationSplited[1], 'base64').toString('ascii'),
  );
};
