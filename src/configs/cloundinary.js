const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dzi76lgy2', 
  api_key: '861683568625511', 
  api_secret: 'Ec_HHhxYWCDFo6Ob7YFwPb-1cJk' 
});

module.exports = cloudinary;