import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
import { useRef } from 'react';

const urlEndpoint = process.env.REACT_APP_IMAGE_KIT_ENDPOINT; 
const publicKey = process.env.REACT_APP_IMAGE_KIT_PUBLIC_KEY;


const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:3001/api/upload');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};



function Upload({setImg}) {

    const ikUploadRef = useRef(null);

    const onError = err => {
        console.log("Error", err);
      };
      
    const onSuccess = res => {
        console.log("Success", res);
        setImg((prev) => ({...prev , isLoading:false , dbData: res}));
      };

    const onUploadProgress = progress => {
        console.log("Progress", progress);
      };
      
    const onUploadStart = evt => {
        console.log("Start", evt);
        setImg((prev) => ({...prev , isLoading:true}));
      };

    return (
        <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
       >
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          useUniqueFileName={true}
          style={{ display: "none" }}
          ref={ikUploadRef}
        />
        {  // whne we click on this label we should trigger  the IKUpload component uisng teh ref ikUploadRef
            <label onClick={()=>ikUploadRef.current.click()}>
                <img src="/attachment.png" alt="" />
            </label>
        }
        </IKContext>
    );
  }
  
  export default Upload;
  