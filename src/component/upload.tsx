import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Color , Palette } from "color-thief-react";
import { useSpring, animated } from 'react-spring';
import { Pie } from 'react-chartjs-2';
import { ArcElement, CategoryScale, Chart as ChartJS, PieController } from 'chart.js';
import '../scss/upload.scss';

const Loading = () => <div>Loading...</div>;
ChartJS.register(ArcElement, CategoryScale, PieController); // Chart.js v3에서부터 사용되는 요소들
// ArcEleement: 차트에서 호(arc)를 그리는데 사용되는 클래스, 파이 차트, 도넛 차트 등 섹션을 그리는데 사용
// CategoryScale: 차트의 축(scale)을 그리는데 사용되는 클래스, 카테고리 형태의 데이터를 표시하는데 사용
// PieController: 파이 차트를 제어하는데 사용되는 클래스, 파이 차트의 데이터를 관리하고, 차트를 그리는데 필요한 요소들 조정

export default function Upload() {
  const [imageSrc, setImageSrc]:any = useState(null);
  const [showColorInfo, setShowColorInfo] = useState(false);
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px").matches);
  
  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if(file) {
      reader.readAsDataURL(file);
    }

    reader.onload= () => {
      setImageSrc(reader.result);
      setShowColorInfo(false); // 이미지를 새로 업로드하면 색상 정보를 숨김.
    };
  }

  const handleClick = () => {
    if(imageSrc === null) {
      alert("이미지를 먼저 업로드해주세요.");
      return;
    }
    setShowColorInfo(!showColorInfo); // 'Click' 버튼을 누르면 색상 정보를 보여줌.
  }

  const slideAnimation = useSpring({
    from: { transform: isMobile ? 'translate3d(100%,0,0)' : 'translate3d(100%, 0, 0)' },
    to: { transform: `translate3d(${isMobile ? '0' : (showColorInfo ? '0%' : '100%')}, ${isMobile ? (showColorInfo ? '0%' : '100%') : '0'}, 0)` },
  });

  // 각 색상의 비율을 동일하게 표시하는 파이 차트를 생성하는 함수형 react 컴포넌트
  function ColorChart({ colors }) {
    
    // charRef라는 참조를 생성 , 차트의 인스턴스를 가리키는데 사용
    const chartRef = useRef<ChartJS | null>(null);

    // 컴포넌트가 언마운트되기 전에 실행되는 클린업 함수 정의
    // 차트의 인스턴스가 있다면 그 인스턴스를 파괴
    // 언마운트 시 메모리 누수 방지
    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      const handleResize = () => setIsMobile(mediaQuery.matches);

      handleResize();
      mediaQuery.addListener(handleResize);

      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
        mediaQuery.removeListener(handleResize);
      };
    }, []);

    const data ={ // 차트에 표시할 데이터를 정의
      labels: colors.map((color, index)=> `Color ${index +1}`), // 각 생상의 라벨을 설정
      datasets: [{ //차트에 표시할 데이터 세트를 설정
        data: colors.map(() => 1),
        backgroundColor: colors,
      }
     ]
    };
    return <Pie data={data} />; // 파이 차트 렌더링 (결과를 보여주기 위한 렌더링)
  }

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  }

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
                  <div>Predominant color <br/> 
                    <div id='predominant_color' style={{
                        backgroundColor: data,
                        borderRadius: '50%',
                        width: '80px',
                        height: '80px',
                      }}></div>
                      <button className='sound_btn' onClick={() => speak(`이미지의 대표 색상은 ${data}입니다.`)}>sound player</button>
                  </div>
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
                <div>Palette color</div>
                  {data && data.map((color, index)=>(
                    <div id='palette_list' key={index} style={{ backgroundColor: color, height: '70px', width: '70px', borderRadius: '50%' }}></div>
                  ))}
                   <div className='palette_chart'>
                    <ColorChart colors={data} /> {/* 색상 정보를 차트에 전달 */}
                   </div>
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
