
import React, { useRef, forwardRef,useEffect,useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
const Model = forwardRef(({imagePath,animationActions, isMaskotVisible,isMaskotAngryVisible, isMaskotReadVisible, isMaskotLastVisible,rot,chapterName,text,isChapterVisible1,positionBook,isChapterVisible,currentChapterIndex, ...props}, ref) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/model/Book_maskot_finish.glb');
  
  const { actions } = useAnimations(animations, group);

  if (ref) {
    ref.current = actions;
  }
 


  useEffect(() => {
    if (animationActions && Array.isArray(animationActions)) {
        // Останавливаем все анимации
        Object.values(actions).forEach(action => {
            if (action) {
                action.stop();
                action.reset();
            }
        });

        // Запускаем новые анимации
        animationActions.forEach(actionName => {
            const action = actions[actionName];
            if (action) {
                action.reset();
                action.clampWhenFinished = true;
                action.setLoop(THREE.LoopOnce);
                action.play();
            }
        });
    }
    
}, [animationActions, actions]);
const [texture, setTexture] = useState(null);
  
  useEffect(() => {
    if (!imagePath) return;
    
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';
    
    textureLoader.load(
      imagePath,
      (loadedTexture) => {
        loadedTexture.encoding = THREE.sRGBEncoding;
        loadedTexture.flipY = true; // Попробуйте true или false
        loadedTexture.needsUpdate = true;
        setTexture(loadedTexture);
      },
      undefined,
      (error) => console.error('Ошибка загрузки текстуры:', error)
    );
    return () => {
      if (texture) texture.dispose();
    };
  }, [imagePath]);

  return (
    <group ref={group} position={[0,0,positionBook]} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Plane001"
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={[2.054, 1.972, 1.362]}>
          <mesh
            name="Plane001_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane001_1.geometry}
            material={materials['Material.001']}
          />
          <mesh
            name="Plane001_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane001_2.geometry}
            material={materials['Material.003']}
          />
        </group>
        <mesh 
          position={[-1.2, 0, 0.03]} 
          rotation={[0, 0, 0]}
          scale={[1, 2.3, 1]}
          visible={isChapterVisible}
        >
          <planeGeometry args={[1.8, 1.2]} />
          {texture ? (
            <meshBasicMaterial 
              map={texture} 
              side={THREE.DoubleSide}
              transparent={true}
              opacity={1}
            />
          ) : (
            <meshBasicMaterial color="gray" /> // Временный материал пока текстура загружается
          )}
        </mesh>
        <Text
                    position={[-4,1.3, -0.2]} // Задайте позицию текста на модели
                    fontSize={0.3}          // Размер шрифта
                    color="White" 
                    maxWidth={1.2}
                              // Цвет текста
                    font="/fonts/Citrica/citricacyrillic.ttf"
                >
                    {chapterName}
                </Text>
                <Text
                    position={[-4.2,1.8, -0.2]} // Задайте позицию текста на модели
                    fontSize={0.3}          // Размер шрифта
                    color="White" 
                              // Цвет текста
                    font="/fonts/Citrica/citricacyrillic.ttf"
                >
                    {`Глава ${currentChapterIndex+1}`} 
                </Text>
        <mesh
          name="Plane"
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials['Material.005']}
          position={[-1.448, 0, 0.01]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.45, 1, 1.99]}
        />
        <mesh
          name="Plane002"
          castShadow
          receiveShadow
          geometry={nodes.Plane002.geometry}
          material={materials['Material.004']}
          position={[0.012, 0, 0.03]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.45, 1, 1.99]}
        />
        <mesh
          name="Plane003"
          castShadow
          receiveShadow
          geometry={nodes.Plane003.geometry}
          material={materials['Material.007']}
          position={[1.46, 0, 0.01]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.45, 1, 1.99]}
        />
        <mesh
          name="Plane004"
          castShadow
          receiveShadow
          geometry={nodes.Plane004.geometry}
          material={materials['Material.002']}
          position={[0.015, 0, 0.03]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.45, 1, 1.99]}
        />
         <Text
                    position={[1.3, 0, 0.265931]} // Задайте позицию текста на модели
                    fontSize={0.16}          // Размер шрифта
                    color="black" 
                    maxWidth={2}          // Цвет текста
                    font="/fonts/Citrica/citricacyrillic.ttf"
                    visible={isChapterVisible1}
                    anchorY={-1.6}
                >
                    {text} 
                </Text>
        <mesh
          name="Group_54_(2)"
          visible={isMaskotVisible}
          castShadow
          receiveShadow
          geometry={nodes['Group_54_(2)'].geometry}
          material={materials['Group 54 (2)']}
          position={[-2.498, -0.916, 0.266]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={2.261}
        />
        <mesh
          name="hand_left"
          visible={isMaskotVisible}
          castShadow
          receiveShadow
          geometry={nodes.hand_left.geometry}
          material={materials.hand_left}
          position={[-2.246, -1.818, 0.271]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.266}
        />
        <mesh
          name="hand_right"
          visible={isMaskotVisible}
          castShadow
          receiveShadow
          geometry={nodes.hand_right.geometry}
          material={materials.hand_right}
          position={[-2.501, -1.847, 0.271]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.266}
        />
        <mesh
          name="Group_54_(2)001"
          visible={isMaskotLastVisible}
          castShadow
          receiveShadow
          geometry={nodes['Group_54_(2)001'].geometry}
          material={materials['Group 54 (2)']}
          position={[-2.498, -0.9, 0.266]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[2.228, 2.261, 2.261]}
        />
        <mesh
          name="hand_left001"
          visible={isMaskotLastVisible}
          castShadow
          receiveShadow
          geometry={nodes.hand_left001.geometry}
          material={materials.hand_left}
          position={[-2.224, -1.833, 0.266]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.262, 0.266, 0.266]}
        />
        <mesh
          name="hand_right001"
          visible={isMaskotLastVisible}
          castShadow
          receiveShadow
          geometry={nodes.hand_right001.geometry}
          material={materials.hand_right}
          position={[-2.538, -1.862, 0.266]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.262, 0.266, 0.266]}
        />
        <mesh
          name="Group_59"
          visible={isMaskotReadVisible}
          castShadow
          receiveShadow
          geometry={nodes.Group_59.geometry}
          material={materials['Group 59']}
          position={[-2.498, -0.9, 0.266]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={2.228}
        />
        <mesh
          name="hair"
          visible={isMaskotReadVisible}
          castShadow
          receiveShadow
          geometry={nodes.hair.geometry}
          material={materials['Group 58']}
          position={[-2.498, -0.93, 0.286]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.196}
        />
        <mesh
          name="eye_right"
          visible={isMaskotReadVisible}
          castShadow
          receiveShadow
          geometry={nodes.eye_right.geometry}
          material={materials['Group 60']}
          position={[-2.615, -0.914, 0.289]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.226}
        />
        <mesh
          name="Group_61"
          visible={isMaskotReadVisible}
          castShadow
          receiveShadow
          geometry={nodes.Group_61.geometry}
          material={materials['Group 61']}
          position={[-2.163, -0.908, 0.289]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.226}
        />
        <mesh
          name="Vector_3"
          visible={isMaskotReadVisible}
          castShadow
          receiveShadow
          geometry={nodes.Vector_3.geometry}
          material={materials['Vector 3']}
          position={[-2.351, -1.199, 0.298]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.022}
        />
        <mesh
          name="Ellipse_242"
          visible={isMaskotReadVisible}
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_242.geometry}
          material={materials['Ellipse 242']}
          position={[-2.345, -1.101, 0.302]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.014}
        />
        <mesh
          name="Vector_8"
          visible={isMaskotReadVisible}
          castShadow
          receiveShadow
          geometry={nodes.Vector_8.geometry}
          material={materials['Vector 8']}
          position={[-2.497, -0.726, 0.437]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.046}
        />
        <mesh
          name="Vector_7"
          visible={isMaskotReadVisible}
          castShadow
          receiveShadow
          geometry={nodes.Vector_7.geometry}
          material={materials['Vector 7']}
          position={[-2.121, -0.715, 0.355]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.013}
        />
        <mesh
          name="Group_57"
          visible={isMaskotReadVisible}
          castShadow
          receiveShadow
          geometry={nodes.Group_57.geometry}
          material={materials['Group 57']}
          position={[-2.339, -1.635, 0.295]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.516}
        />
        <mesh
          name="Group_59001"
          visible={isMaskotAngryVisible}
          castShadow
          receiveShadow
          geometry={nodes.Group_59001.geometry}
          material={materials['Group 59.001']}
          position={[-2.498, -0.9, 0.266]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={2.228}
        />
        <mesh
          name="hair001"
          visible={isMaskotAngryVisible}
          castShadow
          receiveShadow
          geometry={nodes.hair001.geometry}
          material={materials['Group 58.001']}
          position={[-2.506, -0.93, 0.286]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.196}
        />
        <mesh
          name="eye_right001"
          visible={isMaskotAngryVisible}
          castShadow
          receiveShadow
          geometry={nodes.eye_right001.geometry}
          material={materials['Group 60.001']}
          position={[-2.607, -0.914, 0.289]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.226}
        />
        <mesh
          name="Group_61001"
          visible={isMaskotAngryVisible}
          castShadow
          receiveShadow
          geometry={nodes.Group_61001.geometry}
          material={materials['Group 61.001']}
          position={[-2.162, -0.908, 0.289]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.226}
        />
        <mesh
          name="Ellipse_242001"
          visible={isMaskotAngryVisible}
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_242001.geometry}
          material={materials['Ellipse 242.001']}
          position={[-2.344, -1.101, 0.302]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.014}
        />
        <mesh
          name="Vector_7001"
          visible={isMaskotAngryVisible}
          castShadow
          receiveShadow
          geometry={nodes.Vector_7001.geometry}
          material={materials['Vector 7.001']}
          position={[-2.526, -0.724, 0.355]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.013}
        />
        <mesh
          name="Group_57001"
          visible={isMaskotAngryVisible}
          castShadow
          receiveShadow
          geometry={nodes.Group_57001.geometry}
          material={materials['Group 57.001']}
          position={[-2.384, -1.635, 0.295]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.516}
        />
        <mesh
          name="Vector_3001"
          visible={rot}
          castShadow
          receiveShadow
          geometry={nodes.Vector_3001.geometry}
          material={materials['Vector 3.002']}
          position={[-2.356, -1.199, 0.298]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.022}
        />
        <mesh
          name="Vector_7002"
          visible={isMaskotAngryVisible}
          castShadow
          receiveShadow
          geometry={nodes.Vector_7002.geometry}
          material={materials['Vector 7.002']}
          position={[-2.12, -0.715, 0.355]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.013}
        />
        <mesh
          name="Vector_124"
          visible={isMaskotAngryVisible}
          castShadow
          receiveShadow
          geometry={nodes.Vector_124.geometry}
          material={materials['Vector 124']}
          position={[-2.337, -1.187, 0.36]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.037}
        />
      </group>
    </group>
  )
})

useGLTF.preload('/model/Book_maskot_finish.glb')
export default Model;


// import React, { useRef, forwardRef,useEffect,useState } from 'react'
// import { useGLTF, useAnimations } from '@react-three/drei'
// import { Text } from '@react-three/drei';
// import * as THREE from 'three';

// const Model = forwardRef(({animationActions, isMaskotVisible,isMaskotAngryVisible, isMaskotReadVisible, isMaskotLastVisible,rot,chapterName,text,isChapterVisible1, ...props}, ref) => {
//   const group = useRef();
//   const { nodes, materials, animations } = useGLTF('/model/Book_maskot2.glb');
//   const { actions } = useAnimations(animations, group);
//   const [font, setFont] = useState(null);
//   const [bookTexture, setBookTexture] = useState(null);
//   if (ref) {
//     ref.current = actions;
//   }

//   useEffect(() => {
//     if (animationActions && Array.isArray(animationActions)) {
//         // Останавливаем все анимации
//         Object.values(actions).forEach(action => {
//             if (action) {
//                 action.stop();
//                 action.reset();
//             }
//         });

//         // Запускаем новые анимации
//         animationActions.forEach(actionName => {
//             const action = actions[actionName];
//             if (action) {
//                 action.reset();
//                 action.clampWhenFinished = true;
//                 action.setLoop(THREE.LoopOnce);
//                 action.play();
//             }
//         });
//     }
    
// }, [animationActions, actions]);

//   // Экспортируем actions для использования в другом компоненте
  
//   return (
//     <group ref={group} position={[0,0,2]} {...props} dispose={null}>
//       <group name="Scene">
      
//         <group
//           name="Plane001"
//           rotation={[Math.PI / 2, Math.PI / 2, 0]}
//           scale={[2.054, 1.972, 1.362]}>
//           <mesh
//             name="Plane001_1"
//             castShadow
//             receiveShadow
//             geometry={nodes.Plane001_1.geometry}
//             material={materials['Material.001']}
//           />
//           <mesh
//             name="Plane001_2"
//             castShadow
//             receiveShadow
//             geometry={nodes.Plane001_2.geometry}
//             material={materials['Material.003']}
//           />
//         </group>
//         <Text
//                     position={[0,-2.3, -0.2]} // Задайте позицию текста на модели
//                     fontSize={0.3}          // Размер шрифта
//                     color="White" 
//                               // Цвет текста
//                     font="/fonts/Citrica/citricacyrillic.ttf"
//                 >
//                     {chapterName} 
//                 </Text>
//         <mesh
//           name="Plane"
//           castShadow
//           receiveShadow
//           geometry={nodes.Plane.geometry}
//           material={materials['Material.005']}
//           position={[-1.448, 0, 0.01]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={[1.45, 1, 1.99]}
//         /> 
        
//         <mesh
//           name="Plane002"
//           castShadow
//           receiveShadow
//           geometry={nodes.Plane002.geometry}
//           material={materials['Material.004']}
//           position={[0.012, 0, 0.03]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={[1.45, 1, 1.99]}
//         />
//         <mesh
//           name="Plane003"
//           castShadow
//           receiveShadow
//           geometry={nodes.Plane003.geometry}
//           material={materials['Material.007']}
//           position={[1.46, 0, 0.01]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={[1.45, 1, 1.99]}
//         />
        
//         <mesh
//           name="Plane004"
//           castShadow
//           receiveShadow
//           geometry={nodes.Plane004.geometry}
//           material={materials['Material.002']}
//           position={[0.015, 0, 0.03]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={[1.45, 1, 1.99]}
//         />
        
//         <Text
//                     position={[1.3, 0, 0.265931]} // Задайте позицию текста на модели
//                     fontSize={0.16}          // Размер шрифта
//                     color="black" 
//                     maxWidth={2}          // Цвет текста
//                     font="/fonts/Citrica/citricacyrillic.ttf"
//                     visible={isChapterVisible1}
//                     anchorY={-1.6}
//                 >
//                     {text} 
//                 </Text>
//         <mesh
//           name="Group_54_(2)"
//           visible={isMaskotVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes['Group_54_(2)'].geometry}
//           material={materials['Group 54 (2)']}
//           position={[-3.964, -0.912, 0.266]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={2.261}
//         />
//         <mesh
//           name="hand_left"
//           visible={isMaskotVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.hand_left.geometry}
//           material={materials.hand_left}
//           position={[-3.667, -1.847, 0.266]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.266}
//         />
//         <mesh
//           name="hand_right"
//           visible={isMaskotVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.hand_right.geometry}
//           material={materials.hand_right}
//           position={[-3.922, -1.877, 0.266]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.266}
//         />
//         <mesh
//           name="Group_54_(2)001"
//           visible={isMaskotLastVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes['Group_54_(2)001'].geometry}
//           material={materials['Group 54 (2)']}
//           position={[-3.953, -0.9, 0.266]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={[2.228, 2.261, 2.261]}
//         />
//         <mesh
//           name="hand_left001"
//           visible={isMaskotLastVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.hand_left001.geometry}
//           material={materials.hand_left}
//           position={[-3.656, -1.833, 0.266]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={[0.262, 0.266, 0.266]}
//         />
//         <mesh
//           name="hand_right001"
//           visible={isMaskotLastVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.hand_right001.geometry}
//           material={materials.hand_right}
//           position={[-3.91, -1.862, 0.266]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={[0.262, 0.266, 0.266]}
//         />
//         <mesh
//           name="Group_59"
//           visible={isMaskotReadVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.Group_59.geometry}
//           material={materials['Group 59']}
//           position={[-3.953, -0.9, 0.266]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={2.228}
//         />
//         <mesh
//           name="hair"
//           visible={isMaskotReadVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.hair.geometry}
//           material={materials['Group 58']}
//           position={[-3.953, -0.93, 0.286]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={1.196}
//         />
//         <mesh
//           name="eye_right"
//           visible={isMaskotReadVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.eye_right.geometry}
//           material={materials['Group 60']}
//           position={[-4.062, -0.914, 0.289]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.226}
//         />
//         <mesh
//           name="Group_61"
//           visible={isMaskotReadVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.Group_61.geometry}
//           material={materials['Group 61']}
//           position={[-3.61, -0.908, 0.289]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.226}
//         />
//         <mesh
//           name="Vector_3"
//           visible={isMaskotReadVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.Vector_3.geometry}
//           material={materials['Vector 3']}
//           position={[-3.798, -1.199, 0.298]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.022}
//         />
//         <mesh
//           name="Ellipse_242"
//           visible={isMaskotReadVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.Ellipse_242.geometry}
//           material={materials['Ellipse 242']}
//           position={[-3.792, -1.101, 0.302]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.014}
//         />
//         <mesh
//           name="Vector_8"
//           visible={isMaskotReadVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.Vector_8.geometry}
//           material={materials['Vector 8']}
//           position={[-3.944, -0.726, 0.437]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.046}
//         />
//         <mesh
//           name="Vector_7"
//           visible={isMaskotReadVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.Vector_7.geometry}
//           material={materials['Vector 7']}
//           position={[-3.568, -0.715, 0.355]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.013}
//         />
//         <mesh
//           name="Group_57"
//           visible={isMaskotReadVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.Group_57.geometry}
//           material={materials['Group 57']}
//           position={[-3.809, -1.635, 0.295]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.516}
//         />
//         <mesh
//           name="Group_59001"
//           visible={isMaskotAngryVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.Group_59001.geometry}
//           material={materials['Group 59.001']}
//           position={[-3.953, -0.9, 0.266]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={2.228}
//         />
//         <mesh
//           name="hair001"
//           visible={isMaskotAngryVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.hair001.geometry}
//           material={materials['Group 58.001']}
//           position={[-3.953, -0.93, 0.286]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={1.196}
//         />
//         <mesh
//           name="eye_right001"
//           visible={isMaskotAngryVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.eye_right001.geometry}
//           material={materials['Group 60.001']}
//           position={[-4.062, -0.914, 0.289]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.226}
//         />
//         <mesh
//           name="Group_61001"
//           visible={isMaskotAngryVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.Group_61001.geometry}
//           material={materials['Group 61.001']}
//           position={[-3.61, -0.908, 0.289]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.226}
//         />
//         <mesh
//           name="Ellipse_242001"
//           visible={isMaskotAngryVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.Ellipse_242001.geometry}
//           material={materials['Ellipse 242.001']}
//           position={[-3.792, -1.101, 0.302]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.014}
//         />
//         <mesh
//           name="Vector_7001"
//           visible={isMaskotAngryVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.Vector_7001.geometry}
//           material={materials['Vector 7.001']}
//           position={[-3.973, -0.724, 0.355]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.013}
//         />
//         <mesh
//           name="Group_57001"
//           visible={isMaskotAngryVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.Group_57001.geometry}
//           material={materials['Group 57.001']}
//           position={[-3.809, -1.635, 0.295]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.516}
//         />
//         <mesh
//           name="Vector_3001"
//           visible={rot}
//           castShadow
//           receiveShadow
//           geometry={nodes.Vector_3001.geometry}
//           material={materials['Vector 3.002']}
//           position={[-3.798, -1.199, 0.298]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.022}
//         />
//         <mesh
//           name="Vector_7002"
//           visible={isMaskotAngryVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.Vector_7002.geometry}
//           material={materials['Vector 7.002']}
//           position={[-3.568, -0.715, 0.355]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.013}
//         />
//         <mesh
//           name="Vector_124"
//           visible={isMaskotAngryVisible}
//           castShadow
//           receiveShadow
//           geometry={nodes.Vector_124.geometry}
//           material={materials['Vector 124']}
//           position={[-3.764, -1.187, 0.36]}
//           rotation={[Math.PI / 2, 0, 0]}
//           scale={0.037}
//         />
//       </group>
//     </group>
//   )
// });
// useGLTF.preload('/model/Book_maskot2.glb')
// export default Model;
