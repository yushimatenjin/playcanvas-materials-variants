"use client";
import { Color } from "playcanvas";
import { Entity, Container } from "@playcanvas/react";
import { Camera, Light, EnvAtlas } from "@playcanvas/react/components";
import { OrbitControls } from "@playcanvas/react/scripts";
import { useModel, useEnvAtlas } from "../utils/hooks";
import { useState, useEffect } from "react";
import { useApp } from "@playcanvas/react/hooks"

const styles = {
  selectorContainer: {
    position: 'absolute' as const,
    top: '20px',
    left: '20px',
    zIndex: 100,
  },
  select: {
    padding: '8px 12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    minWidth: '200px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#999',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    },
    '&:focus': {
      outline: 'none',
      borderColor: '#666',
    }
  }
};

const Scene = () => {
  const app = useApp();
  const { data: envMap, isPending: isEnvLoading } = useEnvAtlas(
    "./environment-map.png"
  );
  const { data: model, isPending: isModeLoading } = useModel("./ramen.gltf", {
    autoRelease: true,
  });
  const [variants, setVariants] = useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [modelEntity, setModelEntity] = useState<any>(null);

  useEffect(() => {
    if (model?.resource) {
      const materialVariants = model.resource.getMaterialVariants();
      setVariants(materialVariants);
      if (materialVariants.length > 0) {
        setSelectedVariant(materialVariants[0]);
      }
    }
  }, [model?.resource]);

  useEffect(() => {
      const entity = app.root?.findByName("ramen");
      if (entity && selectedVariant) {
        model?.resource.applyMaterialVariant(entity, selectedVariant);
      }
  }, [modelEntity, selectedVariant]);

  if (isEnvLoading || isModeLoading || !envMap || !model) return null;

  return (
    <>
      <EnvAtlas asset={envMap} />
      <Entity name="light" rotation={[45, 45, 0]}>
        {/* @ts-ignore */}
        <Light type="directional" color={Color.WHITE} />
      </Entity>
      <Entity name="camera" position={[0, 0.5, 2]}>
        <Camera clearColor="#ccccff" />
        <OrbitControls inertiaFactor={0.6} distanceMin={1.4} />
      </Entity>
      <div style={styles.selectorContainer}>
        <select 
          value={selectedVariant}
          onChange={(e) => setSelectedVariant(e.target.value)}
          style={styles.select}
        >
          {variants.map((variant) => (
            <option key={variant} value={variant}>
              {variant}
            </option>
          ))}
        </select>
      </div>
      <Entity name="model">
        <Container 
          name="ramen" 
          asset={model} 
        />
      </Entity>
    </>
  );
};

export default Scene;
