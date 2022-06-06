import supertest from 'supertest';
import app from '../index';
import ResizeImage from '../resize';

const request = supertest(app);
describe('Test endpoint responses', () => {
  it('gets the get endpoint', async (): Promise<void> => {
    const response = await request.get(
      '/api/image?filename=encenadaport&width=200&height=200'
    );
    expect(response.status).toEqual(200);
  });

  it('gets the delete endpoint', async (): Promise<void> => {
    const response = await request.delete('/api/images/delete');
    expect(response.status).toEqual(200);
  });
});

describe('Test Resizing function', () => {
  it('get true when dimensions and path is true', async (): Promise<void> => {
    expect(async (): Promise<void> => {
      await ResizeImage('images/encenadaport.jpg', 200, 200);
    }).not.toThrow();
  });
});
