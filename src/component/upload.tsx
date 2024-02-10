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
      
      //이미지를 업로드 한 상태에서 취소 버튼을 누르면 e.target.files[0]이 1에서 0으로 변경이 되어서 조건문으로 에러를 방지
      if(file) {
        reader.readAsDataURL(file);
      }

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
            

            <label className="input-file-button" htmlFor="input-file">upload</label>
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
                  <>
                      {data && data.map((color, index)=>(
                        <div id='palette_list' key={index} style={{ backgroundColor: color, height: '100px', width: '100px', borderRadius: '50%' }}></div>
                      ))}
                  </>
                );
              }}
             </Palette>
            </div>
          </>
        )
    };

