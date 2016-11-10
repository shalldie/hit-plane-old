declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

var source = JSON.parse(localStorage["hitplane-source"]);

export let imgPlane: any = source["imgPlane"];

export let imgBoom: any = source["imgBoom"];

export let imgBulletArr: any[] = source["imgBulletArr"];


export let imgHP: any = source["imgHP"]; // HP 图片

export let imgEnemy: any = source["imgEnemy"]; // 敌军飞机图片

export let imgHeart: any = source["imgHeart"]; // ❤️ 图片
