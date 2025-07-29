const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const opts = { overwrite: true, invalidate: true, resource_type: "image", access_mode: 'public' };

exports.uploadMedia = async (files) => {
    try {
        if (!Array.isArray(files)) {
            files = [files];
        }

        const validImageFiles = files.filter(file => file.mimetype && file.mimetype.startsWith('image/'));

        if (validImageFiles.length === 0) {
            throw new Error("No valid image files provided.");
        }

        const uploadedFiles = await Promise.all(
            validImageFiles.map(file =>
                new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(opts, (error, result) => {
                        if (error) {
                            return reject(new Error(error.message));
                        }
                        if (result && result.secure_url) {
                            return resolve(result.secure_url);
                        }
                        return reject(new Error("Image upload failed."));
                    }).end(file.buffer);
                })
            )
        );

        return uploadedFiles;
    } catch (error) {
        throw new Error(error.message);
    }
};


exports.deleteMedia = async (imageUrls) => {
    try {
        const urls = Array.isArray(imageUrls) ? imageUrls : [imageUrls];

        const deletePromises = urls.map(url => {
            const segments = url.split('/');
            const resourceTypeIndex = segments.findIndex(seg => seg === 'upload') - 1;
            const resourceType = segments[resourceTypeIndex];

            const publicIdWithExtension = segments[segments.length - 1];
            const publicId = publicIdWithExtension.split('.')[0];

            return cloudinary.uploader.destroy(publicId, {
                resource_type: resourceType || 'image',
            });
        });

        await Promise.all(deletePromises);
        return true;
    } catch (error) {
        throw new Error(`Failed to delete image(s): ${error.message}`);
    }
};

