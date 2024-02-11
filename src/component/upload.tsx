import React from 'react';
import { useState } from 'react';
import {Color , Palette} from "color-thief-react";
import { useSpring, animated } from 'react-spring';
import '../scss/upload.scss';

const Loading = () => <div>Loading...</div>;

export default function Upload() {
  const [imageSrc, setImageSrc]:any = useState(null);
  const [showColorInfo, setShowColorInfo] = useState(false);

  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if(file) {
      reader.readAsDataURL(file);
    }

    reader.onload= () => {
      setImageSrc(reader.result);
      setShowColorInfo(false); // 이미지를 새로 업로드하면 색상 정보를 숨깁니다.
    };
  }

  const handleClick = () => {
    setShowColorInfo(!showColorInfo); // 'Click' 버튼을 누르면 색상 정보를 보여줍니다.
  }

  const slideAnimation = useSpring({
    from: { transform: 'translate3d(0,-100%,0)' },
    to: { transform: `translate3d(0,${showColorInfo ? '0%' : '-100%'},0)` },
  });

  return (
    <>
    <div className='image_palette_value_view'>
      <div className='lmage_upload'>
        <div 
          className='upload_image_view'
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >

<button className={`click-button ${showColorInfo ? 'active' : ''}`} onClick={handleClick}>Click</button>
        </div>

        <label className="input-file-button" htmlFor="input-file">upload</label>
        <input
          accept='image/*'
          multiple type="file"
          id="input-file"
          onChange={e => onUpload(e)}
          style={{display:'none'}}
        />
      </div>

    <animated.div className='result_slider' style={slideAnimation}>
      {showColorInfo && (
        <div className='image_color_value'>
          <Color src={imageSrc} crossOrigin='anonymous' format="hex">
            {({data, loading}) => {
              if(loading) return <Loading />;
              return (
                <div>
                  Predominant color: <strong>{data}</strong>
                </div>
              )
            }}
          </Color>
          <br/>
          <Palette src={imageSrc} crossOrigin='anonymous' format="hex" colorCount={6}>
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
      )}
      </animated.div>
    </div>
  </>
 );
};
