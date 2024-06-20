import cache from '../configs/cache.js';

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    console.log('Cache hit');
    return res.json(cachedResponse);
  } else {
    console.log('Cache miss');
    res.originalJson = res.json;
    res.json = (body) => {
      cache.set(key, body);
      console.log('Cache set for', key);
      res.originalJson(body);
    };

    next();
  }
};

export default cacheMiddleware;
