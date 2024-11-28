import Image from 'next/image';

const ImagePreview = ({ images }) => {
  // Split the images string by commas and remove any leading/trailing whitespace
  const imageUrls = images.split(',').map((url) => url.trim()).filter((url) => url);  // Ensure no empty strings

  return (
    <div className="overflow-x-auto mt-4 text-black">
      {/* Display images in a horizontal grid */}
      <div className="flex space-x-4">
        {imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <div key={index} className="relative w-32 h-32">
              <Image 
                src={url} 
                alt={`Image Preview ${index + 1}`} 
                layout="fill" 
                objectFit="cover" 
                className="rounded-lg shadow-lg"
              />
            </div>
          ))
        ) : (
          <p>No images to display.</p>  // In case no valid images are provided
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
