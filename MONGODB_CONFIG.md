/**
 * MongoDB Configuration Guide for Render Deployment
 * 
 * IMPORTANT: Update your Render environment variables with this format:
 * 
 * OLD FORMAT (DEPRECATED):
 * mongodb://username:password@host1:27017,host2:27017,host3:27017/?replicaSet=...
 * 
 * NEW FORMAT (REQUIRED):
 * mongodb+srv://username:password@cluster.xxxxx.mongodb.net/database_name?retryWrites=true&w=majority
 * 
 * For your specific case, update MONGODB_URI in Render to:
 * mongodb+srv://963sohamraut:4UBuMhgi5Y8VUz4v@cluster0.pkusma9.mongodb.net/cloud-laundry?retryWrites=true&w=majority
 * 
 * Steps to fix on Render:
 * 1. Go to your Render dashboard
 * 2. Select your service
 * 3. Go to Environment tab
 * 4. Find MONGODB_URI variable
 * 5. Update it with the new format above
 * 6. Redeploy your service
 */

module.exports = {
  connectionString: {
    development: 'mongodb://localhost:27017/cloud-laundry',
    production: 'mongodb+srv://username:password@cluster.mongodb.net/cloud-laundry?retryWrites=true&w=majority'
  },
  
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  
  // Recommended MongoDB Atlas URI format
  atlasFormat: 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority'
};
