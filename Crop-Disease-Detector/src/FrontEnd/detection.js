import React, { useState, useEffect } from "react";

export default function Detection() 
{
  const [image, setImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => 
  {
    setIsMobile(
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        navigator.maxTouchPoints > 0
    );
  }, []);

  const handleDrop = (e) => 
  {
    if (isMobile) return;
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) { setImage(URL.createObjectURL(file)); }
  };

  const handleFileChange = (e) => 
  {
    const file = e.target.files[0];
    if (file) { setImage(URL.createObjectURL(file)); }
  };

  const detect = async (e) => 
  {
    console.log("submitted");
    e.preventDefault();
    const formData = new FormData(e.target);
    try 
    {
      const response = await fetch('/api/detect', { method: 'POST', body: formData });
      console.log(response);
    } 
    catch (error) 
    {
      console.error('Error sending image:', error);
    }
  };

  return React.createElement('section', null,
    React.createElement('div',
      {
        className: 'image-uploader',
        onDragOver: (e) => !isMobile && e.preventDefault(),
        onDrop: handleDrop,
        onClick: () => document.getElementById('fileInput').click()
      },
      
      image
        ? React.createElement('img', { src: image, alt: 'Uploaded', className: 'uploaded-image'})
        : React.createElement('p', { className: 'upload-text' },
            isMobile ? 'Tap to Capture or Select an Image' : 'Drag & Drop or Click to Upload'),
      
      React.createElement('input', {
        type: 'file',
        id: 'fileInput',
        accept: 'image/*',
        className: 'file-input',
        capture: isMobile ? 'environment' : undefined,
        onChange: handleFileChange,
        name: 'image'
      })
    ),
    
    React.createElement('div', null, React.createElement('button', { onClick: detect }, 'Submit'))
    
  );
}
