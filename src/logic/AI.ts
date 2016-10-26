import Enemy from '../shape/Enemy';

export enum BehaveType {
    Normal,
    Shake,
    Crooked,
    Boss
}

export default class AI {
    public behaveType: number = 0;

    public behave(enemy: Enemy, timeNow: Date): void {
        let behaveArr = [
            this.getNormalBehave
        ];
        behaveArr[this.behaveType](enemy, timeNow);
    }

    private getNormalBehave(enemy: Enemy, timeNow: Date): void {
        let timeDiff = timeNow.getTime() - enemy.createTime.getTime();
        enemy.y = enemy.baseY + timeDiff * enemy.speed;
    }

    private getShakeBehave(enemy: Enemy, timeNow: Date): void {

    }
}
