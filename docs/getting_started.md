# Getting Started With Gamehook

## Installation

The library and its dependencies can be installed with either yarn or NPM

Yarn:

```
yarn install gamehook
```

NPM:

```
npm install gamehook
```

## Usage

Import a `Scene` component and whatever objects you'd like to have in your scene. All Gamehook components need to be children of a `Scene` component.

```tsx
import { Box, Scene } from 'gamehook';

function MyApp(){
  return (
    <div>
      <p>Hello World</p>
      <Scene>
        <Box />
      <Scene>
    </div>
  )
}
```

### Objects

Gamehook provides several components that allow you to add objects to your scenes. The simplest of these are the family of objects known as "Meshes". This includes basic shapes like Boxes, Spheres, Cylinders or Planes.

The properties of mesh components can update their orientation, geometry, material composition, user interactions, or physics. We explore this more later on,
but the following gives an idea for how a few key objects are manipulated:

#### Position

```tsx
import { Scene, Box, Sphere } from "gamehook";

function MyApp() {
  return (
    <Scene>
      <Sphere position={{ x: 0, y: 2, z: 0 }} />
      <Box position={{ x: 4, y: 0, z: -5 }} />
      <Box position={{ x: -1, y: -1, z: 3 }} />
    </Scene>
  );
}
```
