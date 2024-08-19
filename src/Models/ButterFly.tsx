'use client';

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import {Group} from "three"

const ButterFly = ({...props}) => {
    const group = useRef<Group>();
    const { nodes, materials, animations } = useGLTF('/animated_butterfly.glb')
    const { actions } = useAnimations(animations, group)

    useEffect(()=>{
        const action = actions['Flying'];
        if(action){
            action.play();
        }
    },[actions])


    return (
      <group ref={group} {...props} >
        <group name="Sketchfab_Scene">
          <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
            <group name="root">
              <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
                <group name="Armature_55">
                  <group name="GLTF_created_0">
                    <primitive object={nodes.GLTF_created_0_rootJoint} />
                    <skinnedMesh
                      name="Object_7"
                      geometry={nodes.Object_7.geometry}
                      material={materials.Wings}
                      skeleton={nodes.Object_7.skeleton}
                    />
                    <skinnedMesh
                      name="Object_9"
                      geometry={nodes.Object_9.geometry}
                      material={materials.Wings}
                      skeleton={nodes.Object_9.skeleton}
                    />
                    <skinnedMesh
                      name="Object_11"
                      geometry={nodes.Object_11.geometry}
                      material={materials['Material.001']}
                      skeleton={nodes.Object_11.skeleton}
                    />
                    <group name="Plane_52" />
                    <group name="Plane001_53" />
                    <group name="Plane002_54" />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    )
  }

export default ButterFly
