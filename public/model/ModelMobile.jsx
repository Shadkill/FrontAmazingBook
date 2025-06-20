import React, { useRef,useEffect, useState } from 'react'
import { useGLTF, useAnimations, Text } from '@react-three/drei'
import * as THREE from 'three';
export function Model({ animationAction,imagePath,chapterName,text,isChapterVisible,isChapterVisible1,currentChapterIndex, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/model/untitled7.glb')
  const { actions } = useAnimations(animations, group);
  
  useEffect(() => {
    if (animationAction) {
      const action = actions[animationAction];

      // Остановите все анимации перед запуском новой
      Object.values(actions).forEach(a => a.stop());

      action.reset().play(); // Сброс и воспроизведение анимации
      action.clampWhenFinished = true; // Зажимание в конце анимации
      action.setLoop(THREE.LoopOnce, 1); // Установка типа зацикливания на 0 раз

      // Обработчик завершения анимации
      const handleFinish = () => {
        action.stop(); // Остановка анимации после завершения
  
      };

      action.onFinished = handleFinish;

      return () => {
        // Удаляем обработчик при размонтировании
        action.onFinished = null; 
      };
    }
  }, [animationAction, actions]);
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
    <group ref={group} position={[0,0,1.7]} {...props} dispose={null}>
      <group name="Scene">
        <group name="Stroke" />
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
                    position={[0.5,2.5, -0.2]} // Задайте позицию текста на модели
                    fontSize={0.3}          // Размер шрифта
                    color="White" 
                              // Цвет текста
                    font="/fonts/Citrica/citricacyrillic.ttf"
                >
                    {chapterName}
                </Text>
                <Text
                    position={[-0.8,2.5, -0.2]} // Задайте позицию текста на модели
                    fontSize={0.3}          // Размер шрифта
                    color="White" 
                              // Цвет текста
                    font="/fonts/Citrica/citricacyrillic.ttf"
                >
                    {`Глава ${currentChapterIndex+1}:`} 
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
      </group>
    </group>
  )
}

useGLTF.preload('/model/untitled7.glb')
