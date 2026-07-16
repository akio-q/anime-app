export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'anisurf_profiles'); 

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/s4v1bhce/image/upload`, 
      { method: 'POST', body: formData }
    );
    
    const data = await response.json();
    if (data.secure_url) return data.secure_url; 
    
    throw new Error("Failed to get image URL from Cloudinary");
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};