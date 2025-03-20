import { UploadFile } from '../../generated/graphql';

const getImageUrl = (image: UploadFile, size?: 'small'|'medium'|'large') => {
    if(!image) {
        return '';
    }
    
    const imageSize = size && image.formats[size];
    if(imageSize) {
        const imageUrl = `${process.env.NEXT_PUBLIC_API}/${imageSize.url}`;
        return imageUrl.replace(/\/+/g, '/');
    }
    
    const imageUrl = `${process.env.NEXT_PUBLIC_API}/${image.url}`;
    return imageUrl.replace(/\/+/g, '/');
}

const UrlHelper = {
    getImageUrl: getImageUrl
}

export default UrlHelper;