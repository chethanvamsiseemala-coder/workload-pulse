export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error, req, res, next) {
  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors).map((item) => item.message).join('. ');
    return res.status(400).json({ message });
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid value supplied' });
  }
  if (error.code === 11000) {
    return res.status(409).json({ message: 'A record with this value already exists' });
  }
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
