import Enemy from '../shape/Enemy';

export enum BehaveType {
    Normal,
    Shake,
    Crooked,
    Boss
}

export default class AI {
    public behaveType: number = 0;

    public behave() {

    }
}