import React from 'react';
import { useState } from 'react';
import Color ,{Palette} from "color-thief-react";
import '../scss/upload.scss';

const Loading = () => <div>Loading...</div>;
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
          <div className='lmage_upload'>
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
          </div>    

            <div className='image_color_value'>
             <Color src={imageSrc} crossOrigin='anonymous' format="hex">
              {({data, loading}) => {
                 if(loading) return <Loading />;
                 return(
                    <div>
                       Predominant color: <strong>{data}</strong>
                    </div>
                )
             }}
            </Color>
            <br/>

            <Palette src={imageSrc} crossOrigin='anonymous' format="hex" colorCount={4}>
             {({data, loading})=>{
                if(loading) return <Loading />;
                return (
                  <div>
                    Palette:
                    <ul>
                      {data && data.map((color, index)=>(
                        <li key={index} style={{ color: color}}>
                          <strong>{color}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }}
             </Palette>
            </div>
          </>
        )
    };

