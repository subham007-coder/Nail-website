import axios from 'axios';

/**
 * Cloudinary Upload Service for Site-Frontend
 * Based on the working implementation from the admin folder
 */

/**
 * Resize image to fixed dimensions using Pica (for consistency with admin implementation)
 * This is optional but maintains the same quality as the admin system
 */
const resizeImageToFixedDimensions = async (file, width = 800, height = 800) => {
  // For now, we'll return the original file since Pica is not installed
  // In the admin system, this uses Pica for image optimization
  return file;
  
  // TODO: If you want the same image optimization as admin, install Pica:
  // npm install pica
  // Then uncomment and modify the code below:
  
  /*
  const Pica = (await import('pica')).default;
  const pica = new Pica();
  
  const img = new Image();
  img.src = URL.createObjectURL(file);
  
  await img.decode();
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  return new Promise((resolve) => {
    pica
      .resize(img, canvas, {
        unsharpAmount: 80,
        unsharpRadius: 0.6,
        unsharpThreshold: 2,
      })
      .then((result) => pica.toBlob(result, file.type, 0.9))
      .then((blob) => {
        const resizedFile = new File([blob], file.name, { type: file.type });
        resolve(resizedFile);
      });
  });
  */
};

/**
 * Upload image to Cloudinary
 * Exactly the same implementation as admin Uploader.jsx
 */
export const uploadToCloudinary = async (file, folder = 'profile-images') => {
  if (!file) {
    throw new Error('No file provided');
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, JPG, PNG, and WebP are allowed.');
  }

  // Validate file size (5MB max, same as admin)
  const maxSize = 5242880; // 5MB in bytes
  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum 5MB allowed.');
  }

  try {
    // Optional: Resize image (currently disabled, enable if needed)
    const processedFile = await resizeImageToFixedDimensions(file);
    
    // Prepare form data exactly as in admin Uploader.jsx
    const name = processedFile.name.replaceAll(/\s/g, '');
    const public_id = name?.substring(0, name.lastIndexOf('.'));
    
    const formData = new FormData();
    formData.append('file', processedFile);
    formData.append('upload_preset', import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', import.meta.env.VITE_APP_CLOUD_NAME);
    formData.append('folder', folder);
    formData.append('public_id', public_id);

    // Upload to Cloudinary using the same configuration as admin
    const response = await axios({
      url: import.meta.env.VITE_APP_CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: formData,
    });

    return {
      success: true,
      url: response.data.secure_url,
      public_id: response.data.public_id,
      data: response.data
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(error.response?.data?.error?.message || error.message || 'Upload failed');
  }
};

/**
 * Helper function to create preview URL from file
 */
export const createPreviewUrl = (file) => {
  return URL.createObjectURL(file);
};

/**
 * Helper function to validate image file
 */
export const validateImageFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5242880; // 5MB

  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only JPEG, JPG, PNG, and WebP are allowed.' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size too large. Maximum 5MB allowed.' };
  }

  return { valid: true, error: null };
};

/**
 * Multiple file upload handler (for future use if needed)
 */
export const uploadMultipleToCloudinary = async (files, folder = 'profile-images') => {
  const uploadPromises = files.map(file => uploadToCloudinary(file, folder));
  
  try {
    const results = await Promise.all(uploadPromises);
    return {
      success: true,
      urls: results.map(result => result.url),
      data: results
    };
  } catch (error) {
    throw new Error(`Multiple upload failed: ${error.message}`);
  }
};

export default {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  createPreviewUrl,
  validateImageFile
};
