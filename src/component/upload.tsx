import React from 'react';
import { useState } from 'react';
import '../scss/upload.scss';


export default function Upload() {

  const [imageSrc, setImageSrc]: any = useState(null);

  const onUpload = (e:any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise<void>((resolve)=>{
        reader.onload= () => {
          setImageSrc(reader.result || null); //파일의 컨텐츠
          resolve();
        };
    });
  }

  return(
          <>
            <div className='upload_image_view'
                style={{
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
             ></div>
            

            <label className="input-file-button" for="input-file">upload</label>
            <input
              accept='image/*'
              multiple type="file"
              id="input-file"
              onChange={e => onUpload(e)}
              style={{display:'none'}}
            />         
          </>
        )
    };

