# PlayCanvas Materials Variants

A monorepo project for demonstrating and managing material variants in PlayCanvas using modern web technologies.

## Project Structure

```
playcanvas-materials-variants/
├── apps/
│   └── web/          # Next.js web application
└── package.json      # Root package.json
```

## Prerequisites

- Node.js >= 18
- pnpm >= 8.15.6

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm dev
```

3. Build for production:
```bash
pnpm build
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build all packages and applications
- `pnpm lint` - Run linting
- `pnpm format` - Format code with Prettier

## Material Variants API

The project utilizes PlayCanvas's Material Variants API to manage different material configurations for 3D models. Here are the key methods:

https://api.playcanvas.com/classes/Engine.ContainerResource.html

### Getting Material Variants

```typescript
// Get available material variants
const variants = asset.resource.getMaterialVariants();
// Returns an array of variant names
```

### Applying Material Variants

There are two ways to apply material variants:

1. Apply to entire entity hierarchy:
```typescript
// Apply variant to an entity
asset.resource.applyMaterialVariant(entity, variantName);
// Reset to default if variantName is null
```

2. Apply to specific mesh instances:
```typescript
// Apply variant to specific mesh instances
const renders = entity.findComponents("render");
renders.forEach(render => {
    asset.resource.applyMaterialVariantInstances(render.meshInstances, variantName);
});
```

### Example Usage

```typescript
// Load a glb file and apply material variant
app.assets.loadFromUrl("model.glb", "container", (err, asset) => {
    // Create entity with render component
    const entity = asset.resource.instantiateRenderEntity({
        castShadows: true
    });
    app.root.addChild(entity);

    // Get and apply material variant
    const materialVariants = asset.resource.getMaterialVariants();
    asset.resource.applyMaterialVariant(entity, materialVariants[0]);
});
```
