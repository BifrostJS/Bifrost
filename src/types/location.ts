export type TLocation = {
    x: number;
    y: number;
    z: number;
}

export type TLocation2D = {
    x: number;
    y: number;
}

export type TScale = TLocation;

export type TRotation = {
    r: number;
    p: number;
    y: number;
}

export type TTransform = {
    location: TLocation;
    rotation: TRotation;
    scale: TScale;
}