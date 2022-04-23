import React, { useEffect, useRef } from 'react'
import { mountScene, cleanupScene } from './Script';


const Scene = () => {

    const mountRef = useRef();

    useEffect(() => {
        mountScene(mountRef);
        
        return () => {
            cleanupScene();
        }
    });

    return (
        <div className="container" style={{ width: '100%', height: '100vh' }} ref={mountRef}>
        </div>
    )
}

export default Scene