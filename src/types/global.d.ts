//이미지 형식 별 타입 정의
declare module "*.png";
declare module "*.jpg";
declare module "*.webp";

declare module "*.css"{
    const content: {[className: string]: string};
    export = content; 
}