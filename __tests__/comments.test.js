const request = require('supertest');
const express = require('express');
const router = require('../routes/comments'); // Import your router
const { mockReq, mockRes } = require('sinon-express-mock');
const commentsController = require('../controllers/comments');

// Mock the database functions
jest.mock('../data/data', () => ({
  getDatabase: jest.fn(() => ({
    db: jest.fn(() => ({
      collection: jest.fn(() => ({
        find: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockResolvedValue([
          { _id: '1', text: 'Comment 1' },
          { _id: '2', text: 'Comment 2' },
        ]),
      })),
    })),
  })),
}));

const app = express();
app.use(express.json());
app.use('/', router); // Mount your router on the app

describe('Comments Endpoints', () => {
  // Test case for GET /
  describe('GET /', () => {
    it('should return all comments with status code 200', async () => {
      // Mock the request and response objects
      const req = mockReq();
      const res = mockRes();

      // Call the controller function directly
      await commentsController.getAll(req, res);

      // Verify the response status code and JSON data
      expect(res.status.calledWith(200)).toBe(true);
      expect(
        res.json.calledWith([
          { _id: '1', text: 'Comment 1' },
          { _id: '2', text: 'Comment 2' },
        ])
      ).toBe(true);
    });
  });
});
