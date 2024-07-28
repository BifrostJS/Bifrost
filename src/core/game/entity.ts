import { TTransform } from "../../types/location";

export class Entity {
    private replicatedVariables : any[] = [];
    public Transform : TTransform = {
        location: {
            x: 0,
            y: 0,
            z: 0
        },
        rotation: {
            r: 0,
            p: 0,
            y: 0
        },
        scale: {
            x: 1,
            y: 1,
            z: 1
        }
    };

    constructor() {
        console.log("Entity created");
    }

    public move(x: number, y: number, z: number) {
        this.Transform.location.x = x;
        this.Transform.location.y = y;
        this.Transform.location.z = z;
    }

    public rotate(r: number, p: number, y: number) {
        this.Transform.rotation.r = r;
        this.Transform.rotation.p = p;
        this.Transform.rotation.y = y;
    }

    public scale(x: number, y: number, z: number) {
        this.Transform.scale.x = x;
        this.Transform.scale.y = y;
        this.Transform.scale.z = z;
    }

    public destroy() {
        console.log("Entity destroyed");
    }

    replicateVariable(variable: any) {
        this.replicatedVariables.push(variable);
    }

    emit(string: String) {
        console.log(string);
    }

    public getNetworkData() {
        return {
            Transform: this.Transform,
            replicatedVariables: this.replicatedVariables
        }
    }
}