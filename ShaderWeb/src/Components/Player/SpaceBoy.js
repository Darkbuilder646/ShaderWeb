import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const lodingPlayer = () => {
    const loader = new GLTFLoader();

    loader.load( './SpaceBoy.glb', function ( gltf ) {
        return gltf;
    }, undefined, function ( error ) {
        console.error( error );
    }, function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	}, );
}

export default lodingPlayer;